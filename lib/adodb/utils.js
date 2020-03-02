/**
 * @module utils
 * @license MIT
 * @version 2017/11/09
 */

import './json';

/**
 * @function free
 * @description Free connection
 * @param {Object} connection
 */
export function free(connection) {
  connection.State && connection.Close();
}

/**
 * @function stdout
 * @param {any} data
 */
export function stdout(data) {
  WScript.StdOut.Write(JSON.stringify(data));
}

/**
 * @function stderr
 * @param {any} data
 */
function stderr(data) {
  WScript.StdErr.Write(JSON.stringify(data));
}

/**
 * @function stdoutError
 * @param {Error} error
 */
export function stdoutError(error) {
  var code = error.number;
  var message = error.description;

  if (!message) {
    message = 'Unspecified error, SQL may contain reserved words and symbols, surround it with brackets []';
  }

  // Write out error
  stderr({ code: code, message: message });
}

/**
 * @function isDate
 * @param {number} type
 * @returns {boolean}
 * @see https://docs.microsoft.com/en-us/sql/ado/reference/ado-api/datatypeenum
 */
function isDate(type) {
  return type === 7 || type === 64 || type === 133 || type === 134 || type === 135;
}

/**
 * @function isBinary
 * @param {number} type
 * @returns {boolean}
 * @see https://docs.microsoft.com/en-us/sql/ado/reference/ado-api/datatypeenum
 */
function isBinary(type) {
  return type === 128 || type === 204 || type === 205;
}

/**
 * @function readBinary
 * @param {Binary} binary
 * @returns {string}
 */
function readBinary(binary) {
  var stream = new ActiveXObject('ADODB.Stream');

  stream.Type = 1;

  stream.Open();

  stream.Position = 0;

  stream.Write(binary);

  stream.Position = 0;
  stream.Type = 2;

  var text = stream.ReadText();

  free(stream);

  return text;
}

/**
 * @function fillRecords
 * @param {Recordset} recordset
 * @returns {Array}
 */
export function fillRecords(recordset) {
  var records = [];
  var fields = recordset.Fields;

  // Not empty
  if (!recordset.BOF || !recordset.EOF) {
    var i, record;
    var field, type, value;
    var count = fields.Count;

    recordset.MoveFirst();

    while (!recordset.EOF) {
      record = {};

      for (i = 0; i < count; i++) {
        field = fields.Item(i);
        type = field.Type;
        value = field.Value;

        // ADO has given us a UTC date but JScript assumes it's a local timezone date
        // Thanks https://github.com/Antony74
        if (isDate(type)) {
          value = new Date(value);
        } else if (isBinary(type)) {
          value = readBinary(value);
        }

        record[field.Name] = value;
      }

      records.push(record);
      recordset.MoveNext();
    }
  }

  // Return records
  return records;
}
