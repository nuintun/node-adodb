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
 * fill records array
 *
 * @param {Recordset} recordset
 * @param {Boolean} desc
 * @returns {Array}
 */
export function fillRecords(recordset, desc) {
  var records = [];
  var descMode = !!desc;
  var fields = recordset.Fields;
  var fieldsCount = fields.Count;

  // not empty
  if (!recordset.BOF || !recordset.EOF) {
    var i, j;
    var value;
    var prop, properties;
    var props, propsCount;
    var name, field, record;

    recordset.MoveFirst();

    while (!recordset.EOF) {
      record = {};

      for (i = 0; i < fieldsCount; i++) {
        field = fields.Item(i);
        name = field.Name;
        value = field.Value;

        // ADO has given us a UTC date but JScript assumes it's a local timezone date
        // thanks https://github.com/Antony74
        if (typeof(value) === 'date') {
          value = new Date(value);
        }

        if (descMode) {
          properties = {};
          props = field.Properties;
          propsCount = props.Count;

          for (j = 0; j < propsCount; j++) {
            prop = props.Item(j);
            properties[prop.Name] = {
              Type: prop.Type,
              Value: prop.Value
            }
          }

          record[name] = {
            ActualSize: field.ActualSize,
            Attributes: field.Attributes,
            DefinedSize: field.DefinedSize,
            NumericScale: field.NumericScale,
            Precision: field.Precision,
            Type: field.Type,
            Properties: properties,
            Value: value
          };
        } else {
          record[name] = value;
        }
      }

      records.push(record);
      recordset.MoveNext();
    }
  }

  // return records
  return records;
}
