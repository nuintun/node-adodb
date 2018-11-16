# node-adodb

> 一个用 Node.js 实现的 windows 上的 ADODB 协议。
>
> [![NPM Version][npm-image]][npm-url]
> [![Download Status][download-image]][npm-url]
> [![Windows Status][appveyor-image]][appveyor-url]
> [![Test Coverage][coveralls-image]][coveralls-url]
> ![Node Version][node-image]
> [![Dependencies][david-image]][david-url]

### 安装

[![NPM](https://nodei.co/npm/node-adodb.png)](https://nodei.co/npm/node-adodb/)

### 使用示例:

##### ES6

```js
'use strict';

const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// 不带返回的执行
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });

// 带返回标识的执行
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)', 'SELECT @@Identity AS id')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });

// 带返回的查询
connection
  .query('SELECT * FROM Users')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });

// 带字段描述的查询
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

### 接口文档:

`ADODB.open(connection[, x64]): ADODB`

> 初始化数据库链接参数。

`ADODB.query(sql): Promise`

> 执行有返回值的 SQL 语句。

`ADODB.execute(sql[, scalar]): Promise`

> 执行无返回值或者带更新统计的的 SQL 语句。

`ADODB.schema(type[, criteria][, id]): Promise`

> 查询数据库架构信息。参考： [OpenSchema](https://docs.microsoft.com/zh-cn/sql/ado/reference/ado-api/openschema-method)

### 调试：

> 设置环境变量 `DEBUG=ADODB`。参考： [debug](https://github.com/visionmedia/debug)

### 扩展:

> 该类库理论支持 Windows 平台下所有支持 ADODB 连接的数据库，只需要更改数据库连接字符串即可实现操作！

> 数据库连接字符串： 
>  - Access 2000-2003 (\*.mdb): `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;`
>  - Access > 2007 (\*.accdb): `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=adodb.accdb;Persist Security Info=False;` 或者  `Provider=Microsoft.ACE.OLEDB.15.0;Data Source=adodb.accdb;Persist Security Info=False;`


### 注意:

> 该类库需要系统支持 `Microsoft.Jet.OLEDB.4.0` 或者 `Microsoft.ACE.OLEDB.12.0`，对于 `Windows XP SP2` 以上系统默认支持 `Microsoft.Jet.OLEDB.4.0`，其它需要自己安装支持！
>
> 推荐使用 `Microsoft.ACE.OLEDB.12.0`，获取地址： [Microsoft.ACE.OLEDB.12.0](https://www.microsoft.com/zh-CN/download/details.aspx?id=13255)

### Electron

> 如果你想在 `ASAR` 包中运行这个模块，你需要做一些修改。

> 1. 从 `asar` 包中排除 `adodb.js`（使用 `electron-builder`， 可以配置 `extraResources` 将制定文件排除在外）
```json
"extraResources": [
  {
    "from": "./node_modules/node-adodb/lib/adodb.js",
    "to": "adodb.js"
  }
]
```

> 2. 告诉 `asar` 从哪里运行 `adodb.js` （可以将配置写在 `Electron` 的 `main.js` 文件中）
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
