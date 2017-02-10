var fs = require('fs');
var path = require('path');
var arch = require('arch');
var ADODB = require('../index');
var expect = require('expect.js');

var source = path.join(__dirname, 'node-adodb.mdb');
var mdb = fs.readFileSync(path.join(__dirname, '../examples/node-adodb.mdb'));

fs.writeFileSync(source, mdb);

// variable declaration
var x64 = arch() === 'x64';
var sysroot = process.env['systemroot'] || process.env['windir'];
var cscript = path.join(sysroot, x64 ? 'SysWOW64' : 'System32', 'cscript.exe');

if (fs.existsSync(cscript)) {
  console.log('Use', cscript);

  describe('ADODB', function() {
    // variable declaration
    var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + source + ';');

    it('execute', function(next) {
      connection
        .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Nuintun", "Male", 25)')
        .on('done', function(data) {
          expect(data).to.eql({
            valid: true,
            message: 'INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Nuintun", "Male", 25) success'
          });

          next();
        }).on('fail', function(error) {
          expect(error).to.have.key('valid');

          next();
        });
    });

    it('scalar', function(next) {
      connection
        .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Alice", "Female", 25)', 'SELECT @@Identity AS id')
        .on('done', function(data) {
          expect(data).to.eql({
            valid: true,
            message: 'INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Alice", "Female", 25) / SELECT @@Identity AS id success',
            records: [{ id: 5 }]
          });

          next();
        }).on('fail', function(error) {
          expect(error).to.have.key('valid');

          next();
        });
    });

    it('query', function(next) {
      connection
        .query('SELECT * FROM Users')
        .on('done', function(data) {
          expect(data).to.eql({
            valid: true,
            message: 'SELECT * FROM Users success',
            records: [
              {
                UserId: 1,
                UserName: "Nuintun",
                UserSex: "Male",
                UserAge: 25
              },
              {
                UserId: 2,
                UserName: "Angela",
                UserSex: "Female",
                UserAge: 23
              },
              {
                UserId: 3,
                UserName: "Newton",
                UserSex: "Male",
                UserAge: 25
              },
              {
                UserId: 4,
                UserName: "Nuintun",
                UserSex: "Male",
                UserAge: 25
              },
              {
                UserId: 5,
                UserName: "Alice",
                UserSex: "Female",
                UserAge: 25
              }
            ]
          });

          next();
        }).on('fail', function(error) {
          expect(error).to.have.key('valid');

          next();
        });
    });
  });
} else {
  console.log('This OS not support node-adodb.');
}
