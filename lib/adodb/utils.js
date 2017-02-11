import { JSON } from './json';

/**
 * stdout
 *
 * @param data
 */
export function stdout(data) {
  try {
    WScript.StdOut.Write(encodeURI(JSON.stringify(data)));
  } catch (e) {
    WScript.StdOut.Write(encodeURI(JSON.stringify({
      valid: false,
      message: e.message
    })));
  }
}

/**
 * fill records array
 *
 * @param recordset
 * @returns {Array}
 */
export function fillRecords(recordset) {
  var item;
  var field;
  var records = [];
  var count = recordset.Fields.Count;

  // not empty
  if (!recordset.BOF || !recordset.EOF) {
    recordset.MoveFirst();

    while (!recordset.EOF) {
      item = {};

      for (var i = 0; i < count; i++) {
        field = recordset.Fields.Item(i);
        item[field.name] = field.value;
      }

      records.push(item);
      recordset.MoveNext();
    }
  }

  // return records
  return records;
}
