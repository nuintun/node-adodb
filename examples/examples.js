/**
 * Created by Newton on 2014/4/2.
 */
var NodeAccess = require('../lib/node-access'),
    example = NodeAccess.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-access.mdb');
    
NodeAccess.debug = true;
example
    .query('SELECT * FROM Users')
    .on('done', function (data){
        console.log('Result:'.bold, JSON.stringify(data, null, '  ').bold);
    })
    .on('fail', function (data){
        console.log('Error:'.red.bold, data.bold);
    });
