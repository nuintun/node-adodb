/// <reference path="../index.d.ts" />

declare var process: any;

// External lib
import ADODB = require('node-adodb');

process.env.DEBUG = 'ADODB';

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// execute
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)', 'SELECT @@Identity AS id')
  .on('done', function (data) {
    console.log(JSON.stringify(data, null, 2));
  });
