'use strict';

// External lib
var ADODB = require('../');
var colors = require('colors/safe');

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

process.env.DEBUG = 'ADODB';

connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
  .on('done', function(data) {
    console.log(colors.green.bold('Result:'), colors.bold(JSON.stringify(data, null, '  ')));
  });
