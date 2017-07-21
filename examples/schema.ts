/// <reference path="../index.d.ts" />

declare var process: any;

// External lib
import ADODB = require('node-adodb');

process.env.DEBUG = 'ADODB';

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// query
connection
  .query('SELECT * FROM Users', true)
  .on('done', function (data, schema) {
    console.log(JSON.stringify(schema, null, 2));
  })
  .on('fail', function (message) {
    console.log(message);
  });
