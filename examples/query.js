/**
 * Created by Newton on 2014/4/2.
 */

'use strict';

// External lib
var ADODB = require('../'),
  colors = require('colors/safe');

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

ADODB.debug = true;

connection
  .query('SELECT * FROM Users')
  .on('done', function (data){
    console.log(colors.green.bold('Result:'), colors.bold(JSON.stringify(data, null, '  ')));
  });
