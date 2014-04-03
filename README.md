Node-Access
===========
>A Node.js JavaScript Client implementing the Access Database protocol .

###Documents:
```js
var NodeAccess = require('node-access'), //注意引用路径
    connection = NodeAccess.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-access.mdb;');
    
NodeAccess.debug = true; // 全局调试开关，默认关闭

// 不带返回的查询
connection
    .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("张三", "男", 33)')
    .on('done', function (data){
        console.log('Result:'.bold, JSON.stringify(data, null, '  ').bold);
    })
    .on('fail', function (data){
        console.log('Error:'.red.bold, data.bold);
    });

// 带返回的查询
connection
    .query('SELECT * FROM Users')
    .on('done', function (data){
        console.log('Result:'.bold, JSON.stringify(data, null, '  ').bold);
    })
    .on('fail', function (data){
        console.log('Error:'.red.bold, data.bold);
    });
```

###Extension:
>Node-Access理论支持Windows平台下所有支持ADODB连接的数据库，只需要更改数据库连接字符串即可实现操作！

###Notes:
>Node-Access需要系统支持Microsoft.Jet.OLEDB.4.0，对于Windows XP SP2以上系统默认支持，其它需要自己升级，具体操作过程请参考：
[如何获取 Microsoft Jet 4.0 数据库引擎的最新 Service Pack](http://support.microsoft.com/default.aspx?scid=kb;zh-CN;239114)
