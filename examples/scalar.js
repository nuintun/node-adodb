'use strict';

// External lib
const ADODB = require('../');

// Variable declaration
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

process.env.DEBUG = 'ADODB';

connection
  .execute('INSERT INTO Users(UserName, UserSex, UserBirthday, UserMarried) VALUES ("Bill", "Male", "1991/3/9", 0)', 'SELECT @@Identity AS id')
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((message) => {
    console.log(message);
  });;
