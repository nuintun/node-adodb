'use strict';

// External lib
var ADODB = require('../');

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

process.env.DEBUG = 'ADODB';

connection
  .query('SELECT * FROM Users')
  .on('done', function(data) {
    console.log('result:', JSON.stringify(data, null, 2));
  })
  .on('fail', function(message) {
    console.log(message);
  });
