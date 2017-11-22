'use strict';

// External lib
const ADODB = require('./');

// Variable declaration
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// Query
connection
  .query('SELECT * FROM Users')
  .then(data => {
    console.log(data[0].UserAvatar);
  })
  .catch(error => {
    console.log(error.message);
  });
