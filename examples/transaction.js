'use strict';

// External lib
const ADODB = require('../');

// Variable declaration
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

//Prepare queries
let querys=[];
querys.push(`INSERT INTO Users(UserId, UserName, UserSex, UserBirthday, UserMarried) VALUES (10, "Tom", "Male", "1981/5/10", 0);`);
querys.push(`INSERT INTO Users(UserId, UserName, UserSex, UserBirthday, UserMarried) VALUES (11, "Brenda", "Female", "2001/1/11", 0);`);
querys.push(`INSERT INTO Users(UserId, UserName, UserSex, UserBirthday, UserMarried) VALUES (10, "Bill", "Male", "1991/3/9", 0);`);

// Execute
connection
  .transaction(querys)
  .then(data => {
    console.log("Queries executed correctly")
  })
  .catch(error => {
    console.log("No query has been run because an error was encountered");
    console.log(error);
  });
