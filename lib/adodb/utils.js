import { JSON } from './json';

/**
 * stdout
 *
 * @param {any} data
 */
export function stdout(data) {
  WScript.StdOut.Write(encodeURI(JSON.stringify(data)));
}

/**
 * fill records
 *
 * @param {Recordset} recordset
 * @returns {Array}
 */
export function fillRecords(recordset) {
  var records = [];
  var fields = recordset.Fields;
  var fieldsCount = fields.Count;

  // not empty
  if (!recordset.BOF || !recordset.EOF) {
    var i;
    var record;
    var field, value;

    recordset.MoveFirst();

    while (!recordset.EOF) {
      record = {};

      for (i = 0; i < fieldsCount; i++) {
        field = fields.Item(i);
        value = field.Value;

        // ADO has given us a UTC date but JScript assumes it's a local timezone date
        // thanks https://github.com/Antony74
        if (typeof(value) === 'date') {
          value = new Date(value);
        }

        record[field.Name] = value;
      }

      records.push(record);
      recordset.MoveNext();
    }
  }

  // return records
  return records;
}

/**
 * resolve properties
 *
 * @param {Field} field
 * @returns {Object}
 */
function resolveProps(field) {
  var properties = {};
  var props = field.Properties;
  var propsCount = props.Count;

  for (var i = 0; i < propsCount; i++) {
    prop = props.Item(i);
    properties[prop.Name] = {
      Type: prop.Type,
      Value: prop.Value
    }
  }

  return properties;
}

/**
 * fill schema
 *
 * @param {Recordset} recordset
 * @returns {Object}
 */
export function fillSchema(recordset) {
  var schema = {};

  if (!recordset.BOF || !recordset.EOF) {
    var field;
    var fields = recordset.Fields;
    var fieldsCount = fields.Count;

    for (var i = 0; i < fieldsCount; i++) {
      field = fields.Item(i);

      schema[field.Name] = {
        Attributes: field.Attributes,
        DefinedSize: field.DefinedSize,
        NumericScale: field.NumericScale,
        Precision: field.Precision,
        Type: field.Type,
        Properties: resolveProps(field)
      };
    }
  }

  return schema;
}
