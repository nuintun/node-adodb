node-adodb
===========
>A Node.js JavaScript Client implementing the ADODB protocol.

>[![NPM Version][npm-image]][npm-url]

###Install
```
$ npm install node-adodb
```

###Introduction:
```js
var ADODB = require('node-adodb'),
  connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// Global debug switch
ADODB.debug = true;
// Global encoding settings
ADODB.encoding = 'gbk';

// Without the query returned
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
  .on('done', function (data){
    console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
  })
  .on('fail', function (data){
    // TODO something
  });
  
// With the scalar return of the query
connection
  .executeScalar('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)', 'SELECT @@Identity AS id')
  .on('done', function (data){
    console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
  })
  .on('fail', function (data){
    // TODO something
  });

// With the return of the query
connection
  .query('SELECT * FROM Users')
  .on('done', function (data){
    console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
  })
  .on('fail', function (data){
    // TODO something
  });
```

###API:
`ADODB.debug`
>The global debugging switch.

`ADODB.encoding`
>The global encoding settings.

`ADODB.query`
>Execute a SQL statement that returns a value.

`ADODB.execute`
>Execute a SQL statement that do not returns a value.

`ADODB.executeScalar`
>Execute a SQL statement that returns a scalar value.

`ADODB.open(connection[, encoding])`
>Encoding settings for optional parameters, can be used for `ADODB.encoding` global settings.

###Extension:
>The plug-in theoretical support under the platform of Windows all support the ADODB connection database, only need to change the database connection string operation can be realized!

###Notes:
>The plug-in need system support for Microsoft.Jet.OLEDB.4.0, Windows XP SP2 above support system default, other need to upgrade their specific operation process, please refer to:
[How to obtain the Microsoft Jet 4 database engine of the new Service Pack](http://support2.microsoft.com/kb/239114/en-us)

[npm-image]: http://img.shields.io/npm/v/node-adodb.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/node-adodb
