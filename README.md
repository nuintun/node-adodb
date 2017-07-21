# node-adodb

>一个用 Node.js 实现的 windows 上的 ADODB 协议。
>
>[![NPM Version][npm-image]][npm-url]
>[![Download Status][download-image]][npm-url]
>[![Windows Status][appveyor-image]][appveyor-url]
>[![Test Coverage][coveralls-image]][coveralls-url]
>[![Dependencies][david-image]][david-url]

### 安装
```
$ npm install node-adodb
```

### 使用示例:
```js
var ADODB = require('node-adodb');
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// 全局调试开关，默认关闭
process.env.DEBUG = 'ADODB';

// 不带返回的执行
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
  .on('done', function(data) {
    console.log(JSON.stringify(data, null, 2));
  })
  .on('fail', function(error) {
    // TODO 逻辑处理
  });

// 带返回标识的执行
connection
  .execute(
    'INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)',
    'SELECT @@Identity AS id'
  )
  .on('done', function(data) {
    console.log(JSON.stringify(data, null, 2));
  })
  .on('fail', function(error) {
    // TODO 逻辑处理
  });

// 带返回的查询
connection
  .query('SELECT * FROM Users')
  .on('done', function(data) {
    console.log(JSON.stringify(data, null, 2));
  })
  .on('fail', function(error) {
    // TODO 逻辑处理
  });

// 带字段描述的查询
connection
  .query('SELECT * FROM Users', true)
  .on('done', function(data, schema) {
    console.log(JSON.stringify(schema, null, 2));
  })
  .on('fail', function(error) {
    // TODO 逻辑处理
  });
```

### 接口文档:
`ADODB.open(connection)`
>初始化数据库链接参数。

`ADODB.query(sql, [schema])`
>执行有返回值的SQL语句。如果第二个参数设置成 ```true```，返回值中将包含当前字段的描述（字段大小，类型等等）。

`ADODB.execute(sql, [scalar])`
>执行无返回值或者带更新统计的的SQL语句。

### 扩展:
>该类库理论支持 Windows 平台下所有支持 ADODB 连接的数据库，只需要更改数据库连接字符串即可实现操作！

### 注意:
>该类库需要系统支持 Microsoft.Jet.OLEDB.4.0，对于 Windows XP SP2 以上系统默认支持，其它需要自己升级，具体操作过程请参考：
[如何获取 Microsoft Jet 4.0 数据库引擎的最新 Service Pack](http://support.microsoft.com/default.aspx?scid=kb;zh-CN;239114)

[npm-image]: https://img.shields.io/npm/v/node-adodb.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/node-adodb
[download-image]: https://img.shields.io/npm/dm/node-adodb.svg?style=flat-square
[appveyor-image]: https://img.shields.io/appveyor/ci/nuintun/node-adodb.svg?style=flat-square&label=windows
[appveyor-url]: https://ci.appveyor.com/project/nuintun/node-adodb
[coveralls-image]: http://img.shields.io/coveralls/nuintun/node-adodb/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/nuintun/node-adodb?branch=master
[david-image]: https://img.shields.io/david/nuintun/node-adodb.svg?style=flat-square
[david-url]: https://david-dm.org/nuintun/node-adodb
