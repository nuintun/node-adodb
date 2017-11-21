'use strict';

// External lib
var ADODB = require('./');
var fs = require('fs');
var jpeg = require('jpeg-js');

// Variable declaration
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

process.env.DEBUG = 'ADODB';

// Query
connection
  .query('SELECT * FROM Users')
  .then(data => {
    // console.log(JSON.stringify(data, null, 2));
    // var jpg = jpeg.decode(Buffer.from(data[0].UserAvatar, 'binary'));

    console.log(data[0].UserAvatar);

    fs.writeFileSync('./avatar.jpg', Buffer.from(data[0].UserAvatar));
  })
  .catch(error => {
    console.log(error);
  });
