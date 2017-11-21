var connection = new ActiveXObject('ADODB.Connection');
var recordset = new ActiveXObject('ADODB.Recordset');

// Set CursorLocation
connection.CursorLocation = 3;

// Open
connection.Open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');
// Query
recordset.Open('SELECT * FROM Users', connection, 0, 1);

var DataTypeEnum = {
  0x2000: 'AdArray',
  20: 'adBigInt',
  128: 'adBinary',
  11: 'adBoolean',
  8: 'adBSTR',
  136: 'adChapter',
  129: 'adChar',
  6: 'adCurrency',
  7: 'adDate',
  133: 'adDBDate',
  134: 'adDBTime',
  135: 'adDBTimeStamp',
  14: 'adDecimal',
  5: 'adDouble',
  0: 'adEmpty',
  10: 'adError',
  64: 'adFileTime',
  72: 'adGUID',
  9: 'adIDispatch',
  3: 'adInteger',
  13: 'adIUnknown',
  205: 'adLongVarBinary',
  201: 'adLongVarChar',
  203: 'adLongVarWChar',
  131: 'adNumeric',
  138: 'adPropVariant',
  4: 'adSingle',
  2: 'adSmallInt',
  16: 'adTinyInt',
  21: 'adUnsignedBigInt',
  19: 'adUnsignedInt',
  18: 'adUnsignedSmallInt',
  17: 'adUnsignedTinyInt',
  132: 'adUserDefined',
  204: 'adVarBinary',
  200: 'adVarChar',
  12: 'adVariant',
  139: 'adVarNumeric',
  202: 'adVarWChar',
  130: 'adWChar'
};

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

        // stream.CharSet = 'UTF-8';
        stream.Type = 1;

        stream.Open();

        stream.Position = 0;

        stream.Write(value);

        stream.Position = 0;
        stream.Type = 2;

        WScript.StdOut.WriteLine(stream.ReadText(-1));

        stream.Close;
      }
    }
  }
}

// Write data
fillRecords(recordset);
