var connection = new ActiveXObject('ADODB.Connection');
var recordset = new ActiveXObject('ADODB.Recordset');

// Set CursorLocation
connection.CursorLocation = 3;

// Open
connection.Open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');
// Query
recordset.Open('SELECT * FROM Users', connection, 0, 1);

function fillRecords(recordset, required) {
  var fields = recordset.Fields;

  // Not empty
  if (!recordset.BOF || !recordset.EOF) {
    var i;
    var field, value;
    var fieldsCount = fields.Count;

    recordset.MoveFirst();

    for (i = 0; i < fieldsCount; i++) {
      field = fields.Item(i);
      value = field.Value;

      // ADO has given us a UTC date but JScript assumes it's a local timezone date
      // Thanks https://github.com/Antony74
      // if (typeof value === 'date') {
      //   value = new Date(value);
      // }
      if (typeof value === 'unknown') {
        var stream = new ActiveXObject('ADODB.Stream');

        stream.Type = 1;

        stream.Open();

        stream.Position = 0;

        stream.Write(value);

        stream.Position = 0;
        stream.Type = 2;

        WScript.StdOut.WriteLine(stream.ReadText());

        stream.Close;
      }
    }
  }
}

// Write data
fillRecords(recordset);
