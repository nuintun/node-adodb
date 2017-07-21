# node-adodb

>A node.js javascript client implementing the ADODB protocol on windows.
>
>[![NPM Version][npm-image]][npm-url]
>[![Download Status][download-image]][npm-url]
>[![Windows Status][appveyor-image]][appveyor-url]
>[![Test Coverage][coveralls-image]][coveralls-url]
>[![Dependencies][david-image]][david-url]

### Install
```
$ npm install node-adodb
```

### Introduction:
```js
var ADODB = require('node-adodb');
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// Global debug switch
process.env.DEBUG = 'ADODB';

// Without returned execute
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
  .on('done', function(data) {
    console.log(JSON.stringify(data, null, 2));
  })
  .on('fail', function(error) {
    // TODO something
  });

// With scalar returned of execute
connection
  .execute(
    'INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)',
    'SELECT @@Identity AS id'
  )
  .on('done', function(data) {
    console.log(JSON.stringify(data, null, 2));
  })
  .on('fail', function(error) {
    // TODO something
  });

// With returned of query
connection
  .query('SELECT * FROM Users')
  .on('done', function(data) {
    console.log(JSON.stringify(data, null, 2));
  })
  .on('fail', function(error) {
    // TODO something
  });

// With returned contains schema of query
connection
  .query('SELECT * FROM Users', true)
  .on('done', function(data, schema) {
    console.log(JSON.stringify(schema, null, 2));
  })
  .on('fail', function(error) {
    // TODO something
  });
```

### API:
`ADODB.open(connection)`
>Initialization database link parameters.

`ADODB.query(sql, [schema])`
>Execute a SQL statement that returns a value or with field schema.

`ADODB.execute(sql, [scalar])`
>Execute a SQL statement with no return value or with updated statistics.

### Extension:
>This library theory supports all databases on the Windows platform that support ADODB connections, and only need to change the database connection string to achieve the operation!

### Notes:
>The library need system support for Microsoft.Jet.OLEDB.4.0, Windows XP SP2 above support system default, other need to upgrade their specific operation process, please refer to:
[How to obtain the Microsoft Jet 4 database engine of the new Service Pack](http://support2.microsoft.com/kb/239114/en-us)

[npm-image]: https://img.shields.io/npm/v/node-adodb.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/node-adodb
[download-image]: https://img.shields.io/npm/dm/node-adodb.svg?style=flat-square
[appveyor-image]: https://img.shields.io/appveyor/ci/nuintun/node-adodb.svg?style=flat-square&label=windows
[appveyor-url]: https://ci.appveyor.com/project/nuintun/node-adodb
[coveralls-image]: http://img.shields.io/coveralls/nuintun/node-adodb/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/nuintun/node-adodb?branch=master
[david-image]: https://img.shields.io/david/nuintun/node-adodb.svg?style=flat-square
[david-url]: https://david-dm.org/nuintun/node-adodb
