node-adodb
===========
>A Node.js JavaScript Client implementing the ADODB protocol .

###Install
```
$ npm install node-adodb
```

###Introduction:
```js
var ADODB = require('node-adodb'),
    connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// 全局调试开关，默认关闭
ADODB.debug = true;

// 不带返回的查询
connection
    .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
    .on('done', function (data){
        console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
    })
    .on('fail', function (data){
        // TODO something
    });

// 带返回的查询
connection
    .query('SELECT * FROM Users')
    .on('done', function (data){
        console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
    })
    .on('fail', function (data){
        // TODO something
    });
```

###Extension:
>node-adodb 理论支持 Windows 平台下所有支持 ADODB 连接的数据库，只需要更改数据库连接字符串即可实现操作！

###Notes:
>node-adodb 需要系统支持 Microsoft.Jet.OLEDB.4.0，对于 Windows XP SP2 以上系统默认支持，其它需要自己升级，具体操作过程请参考：
[如何获取 Microsoft Jet 4.0 数据库引擎的最新 Service Pack](http://support.microsoft.com/default.aspx?scid=kb;zh-CN;239114)
