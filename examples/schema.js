'use strict';

// External lib
const ADODB = require('../');

// Variable declaration
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

process.env.DEBUG = 'ADODB';

connection
  .query('SELECT * FROM Users', true)
  .then((data, schema) => {
    console.log(JSON.stringify(schema, null, 2));
  })
  .catch((message) => {
    console.log(message);
  });
