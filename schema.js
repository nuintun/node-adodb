'use strict';

// External lib
const ADODB = require('./');

// Variable declaration
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

process.env.DEBUG = 'ADODB';

async function query() {
  try {
    const result = await connection.schema(4);

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.log(error);
  }
}

query();
