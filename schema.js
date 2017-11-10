'use strict';

// External lib
const ADODB = require('./');

// Variable declaration
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

process.env.DEBUG = 'ADODB';

// Schema
connection
  .schema(4, [null, null, 'Users'])
  .then((schema) => {
    console.log(JSON.stringify(schema, null, 2));
  })
  .catch((error) => {
    console.log(error);
  });
