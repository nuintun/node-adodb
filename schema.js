'use strict';

const connection = new ActiveXObject('ADODB.Connection');

// Open
connection.Open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

const recordset = connection.OpenSchema(4);
const fields = recordset.Fields;
const fieldsCount = fields.Count;

// not empty
if (!recordset.BOF || !recordset.EOF) {
  recordset.MoveFirst();

  while (!recordset.EOF) {
    for (let i = 0; i < fieldsCount; i++) {
      let field = fields.Item(i);
      let value = field.Value;

      // ADO has given us a UTC date but JScript assumes it's a local timezone date
      // thanks https://github.com/Antony74
      if (typeof(value) === 'date') {
        value = String(value);
      }

      value !== null && stdout(field.Name + ' -- ' + value);
    }

    stdout('-----------------------------');

    recordset.MoveNext();
  }
}

function stdout(data) {
  WScript.StdOut.Write(data + '\n');
}
