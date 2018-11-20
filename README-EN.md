# node-adodb

> A node.js javascript client implementing the ADODB protocol on windows.
>
> [![NPM Version][npm-image]][npm-url]
> [![Download Status][download-image]][npm-url]
> [![Windows Status][appveyor-image]][appveyor-url]
> [![Test Coverage][coveralls-image]][coveralls-url]
> ![Node Version][node-image]
> [![Dependencies][david-image]][david-url]

### Install

[![NPM](https://nodei.co/npm/node-adodb.png)](https://nodei.co/npm/node-adodb/)

### Introduction:

##### ES6

```js
'use strict';

const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// Execute
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });

// Execute with scalar
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)', 'SELECT @@Identity AS id')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });

// Query
connection
  .query('SELECT * FROM Users')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });

// Schema
connection
  .schema(20)
  .then(schema => {
    console.log(JSON.stringify(schema, null, 2));
  })
  .catch(error => {
    console.error(error);
  });
```

##### ES7 async/await

```js
'use strict';

const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

async function query() {
  try {
    const users = await connection.query('SELECT * FROM Users');

    console.log(JSON.stringify(users, null, 2));
  } catch (error) {
    console.error(error);
  }
}

query();
```

### API:

`ADODB.open(connection[, x64]): ADODB`

> Initialization database link parameters.

`ADODB.query(sql): Promise`

> Execute a SQL statement that returns a value.

`ADODB.execute(sql[, scalar]): Promise`

> Execute a SQL statement with no return value or with updated statistics.

`ADODB.schema(type[, criteria][, id]): Promise`

> Query database schema information. see: [OpenSchema](https://docs.microsoft.com/en-us/sql/ado/reference/ado-api/openschema-method)

### Debug:

> Set env `DEBUG=ADODB`, see: [debug](https://github.com/visionmedia/debug)

### Extension:

> This library theory supports all databases on the Windows platform that support ADODB connections, and only need to change the database connection string to achieve the operation!

> Common access connection strings: 
>  - Access 2000-2003 (\*.mdb): `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;`
>  - Access > 2007 (\*.accdb): `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=adodb.accdb;Persist Security Info=False;` or  `Provider=Microsoft.ACE.OLEDB.15.0;Data Source=adodb.accdb;Persist Security Info=False;`

### Notes:

> The library need system support `Microsoft.Jet.OLEDB.4.0` or `Microsoft.ACE.OLEDB.12.0`, `Windows XP SP2` above support `Microsoft.Jet.OLEDB.4.0` by default, Others need to install support!
>
> Recommended use `Microsoft.ACE.OLEDB.12.0`, download: [Microsoft.ACE.OLEDB.12.0](https://www.microsoft.com/en-us/download/details.aspx?id=13255)

### Electron

> If you want to use this module in an electron app running from an asar package you'll need to make some changes.

> 1. Move `adodb.js` outside the asar package (in this example I use electron-builder, the `extraResources` option can move the file outside the asar package)
```json
"extraResources": [
  {
    "from": "./node_modules/node-adodb/lib/adodb.js",
    "to": "adodb.js"
  }
]
```

> 2. Tell the module where to find `adodb.js` while running from an asar package (I added this in electron's `main.js` file)
```javascript
// Are we running from inside an asar package ?
if(process.mainModule.filename.indexOf('app.asar') !== -1) {
  // In that case we need to set the correct path to adodb.js
  ADODB.PATH = './resources/adodb.js';
}
```

[npm-image]: https://img.shields.io/npm/v/node-adodb.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/node-adodb
[download-image]: https://img.shields.io/npm/dm/node-adodb.svg?style=flat-square
[appveyor-image]: https://img.shields.io/appveyor/ci/nuintun/node-adodb/master.svg?style=flat-square&label=windows
[appveyor-url]: https://ci.appveyor.com/project/nuintun/node-adodb
[coveralls-image]: http://img.shields.io/coveralls/nuintun/node-adodb/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/nuintun/node-adodb?branch=master
[david-image]: https://img.shields.io/david/nuintun/node-adodb/master.svg?style=flat-square
[david-url]: https://david-dm.org/nuintun/node-adodb
[node-image]: https://img.shields.io/node/v/node-adodb.svg?style=flat-square
