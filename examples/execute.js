'use strict';

// External lib
var ADODB = require('../');

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

process.env.DEBUG = 'ADODB';

connection
  .execute('INSERT INTO Users(UserName, UserSex, UserBirthday, UserMarried) VALUES ("Bill", "Male", "1991/3/9", 0)')
  .on('done', function(data) {
    console.log('result:', JSON.stringify(data, null, 2));
  })
  .on('fail', function(message) {
    console.log(message);
  });;
