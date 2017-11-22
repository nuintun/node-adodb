function fillRecords(recordset) {
  recordset.MoveFirst();

  var fields = recordset.Fields;
  var field = fields.Item(5);
  var value = field.Value;

  var stream = new ActiveXObject('ADODB.Stream');

  stream.Type = 1;

  stream.Open();

  stream.Position = 0;

  stream.Write(value);

  stream.Position = 0;
  stream.Type = 2;

  WScript.StdOut.Write(stream.ReadText());

  stream.Close;
}

// Write data
try {
  var connection = new ActiveXObject('ADODB.Connection');
  var recordset = new ActiveXObject('ADODB.Recordset');

  // Set CursorLocation
  connection.CursorLocation = 3;

  // Open
  connection.Open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');
  // Query
  recordset.Open('SELECT * FROM Users', connection, 0, 1);

  fillRecords(recordset);

  recordset.State && recordset.Close();
  connection.State && connection.Close();
} catch (error) {
  WScript.StdErr.WriteLine(error.description);
}
