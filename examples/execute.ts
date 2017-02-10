/// <reference path="../index.d.ts" />

declare var process: any;

// External lib
import ADODB = require('node-adodb');

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

process.env.DEBUG = 'ADODB';

// execute
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
  .on('done', function (data) {
    console.log(JSON.stringify(data, null, 2));
  });
