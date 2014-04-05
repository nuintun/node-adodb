/**
 * Created by Newton on 2014/4/2.
 */
var ADODB = require('../lib/client'),
    connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');
    
ADODB.debug = true;

connection
    .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
    .on('done', function (data){
        console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
    });
