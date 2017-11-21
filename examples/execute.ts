/// <reference path="../index.d.ts" />

declare const process: any;

// External lib
import ADODB = require('node-adodb');

// Variable declaration
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// Execute
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserBirthday, UserMarried) VALUES ("Bill", "Male", "1991/3/9", 0)')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.log(error);
  });
