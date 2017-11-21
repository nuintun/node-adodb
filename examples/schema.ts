/// <reference path="../index.d.ts" />

declare const process: any;

// External lib
import ADODB = require('node-adodb');

// Variable declaration
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// Schema
connection
  .schema(20)
  .then(schema => {
    console.log(JSON.stringify(schema, null, 2));
  })
  .catch(error => {
    console.log(error);
  });
