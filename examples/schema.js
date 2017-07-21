'use strict';

// External lib
var ADODB = require('../');

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

process.env.DEBUG = 'ADODB';

connection
  .query('SELECT * FROM Users', true)
  .on('done', function(data, schema) {
    console.log(JSON.stringify(schema, null, 2));
  })
  .on('fail', function(message) {
    console.log(message);
  });
