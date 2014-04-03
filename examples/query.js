/**
 * Created by Newton on 2014/4/2.
 */
var NodeAccess = require('../lib/node-access'),
    connection = NodeAccess.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-access.mdb;');
    
NodeAccess.debug = true;

connection
    .query('SELECT * FROM Users')
    .on('done', function (data){
        console.log('Result:'.bold, JSON.stringify(data, null, '  ').bold);
    });
