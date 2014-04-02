/**
 * Created by Newton on 2014/4/2.
 */
var NodeAccess = require('../lib/node-access');

var example = NodeAccess.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-access.mdb');
NodeAccess.debug = false;
example.query('SELECT * FROM Users').on('done', function (data){
    console.log('Resule:'.bold, JSON.stringify(data, null, '  ').bold);
});