# node-adodb

>A node.js javascript client implementing the ADODB protocol on windows.
>
>[![NPM Version][npm-image]][npm-url]
>[![Download Status][download-image]][npm-url]
>[![Windows Status][appveyor-image]][appveyor-url]
>[![Test Coverage][coveralls-image]][coveralls-url]
>[![Dependencies][david-image]][david-url]

### Install
[![NPM](https://nodei.co/npm/node-adodb.png)](https://nodei.co/npm/node-adodb/)

### Introduction:
```js
'use strict';

const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// 全局调试开关，默认关闭
process.env.DEBUG = 'ADODB';

// 不带返回的执行
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    // TODO 逻辑处理
  });

// 带返回标识的执行
connection
  .execute(
    'INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)',
    'SELECT @@Identity AS id'
  )
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    // TODO 逻辑处理
  });

// 带返回的查询
connection
  .query('SELECT * FROM Users')
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    // TODO 逻辑处理
  });

// 带字段描述的查询
connection
  .schema(20)
  .then((schema) => {
    console.log(JSON.stringify(schema, null, 2));
  })
  .catch((error) => {
    // TODO 逻辑处理
  });
```

### API:
`ADODB.open(connection): ADODB`
>Initialization database link parameters.

`ADODB.query(sql): Promise`
>Execute a SQL statement that returns a value.

`ADODB.execute(sql, [scalar]): Promise`
>Execute a SQL statement with no return value or with updated statistics.

`ADODB.schema(type[, criteria][, id]): Promise`
>Query database schema information. see: [OpenSchema](https://docs.microsoft.com/en-us/sql/ado/reference/ado-api/openschema-method)

### Extension:
>This library theory supports all databases on the Windows platform that support ADODB connections, and only need to change the database connection string to achieve the operation!

### Notes:
>The library need system support for Microsoft.Jet.OLEDB.4.0, Windows XP SP2 above support system default, other need to upgrade their specific operation process, please refer to:
[How to obtain the Microsoft Jet 4 database engine of the new Service Pack](http://support2.microsoft.com/kb/239114/en-us)

[npm-image]: https://img.shields.io/npm/v/node-adodb.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/node-adodb
[download-image]: https://img.shields.io/npm/dm/node-adodb.svg?style=flat-square
[appveyor-image]: https://img.shields.io/appveyor/ci/nuintun/node-adodb/master.svg?style=flat-square&label=windows
[appveyor-url]: https://ci.appveyor.com/project/nuintun/node-adodb
[coveralls-image]: http://img.shields.io/coveralls/nuintun/node-adodb/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/nuintun/node-adodb?branch=master
[david-image]: https://img.shields.io/david/nuintun/node-adodb.svg?style=flat-square
[david-url]: https://david-dm.org/nuintun/node-adodb
