'use strict';

// External lib
var ADODB = require('./');
var fs = require('fs');

// Variable declaration
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

process.env.DEBUG = 'ADODB';

// Query
connection
  .query('SELECT top 1 * FROM Users')
  .then(data => {
    console.log(data[0].UserAvatar);
  })
  .catch(error => {
    console.log(error);
  });
