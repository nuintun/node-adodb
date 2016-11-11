/// <reference path="../index.d.ts" />

// External lib
import ADODB = require('node-adodb');

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

ADODB.debug = true;

// execute
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
  .on('done', function (data){
    console.log(JSON.stringify(data, null, '  '));
  });