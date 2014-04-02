Node-Access
===========
>A Node.js JavaScript Client implementing the Access Database protocol .

###Documents:
```js
var NodeAccess = require('node-access'), //注意引用路径
    connection = NodeAccess.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-access.mdb');
    
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
