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

var env = {};

Object.keys(process.env).forEach(function(key) {
  if (key !== 'COVERALLS_REPO_TOKEN') {
    env[key] = process.env[key];
  }
});

console.log(JSON.stringify(env, null, 2));
console.log();

if (fs.existsSync(cscript)) {
  console.log('Use', cscript);

  describe('ADODB', function() {
    // variable declaration
    var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + source + ';');

    it('execute', function(next) {
      connection
        .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Nuintun", "Male", 25)')
        .on('done', function(data, message) {
          expect(data).to.eql([]);
          expect(message).to.eql('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Nuintun", "Male", 25) success');

          next();
        }).on('fail', function(error) {
          console.log(error);

          next();
        });
    });

    it('scalar', function(next) {
      connection
        .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Alice", "Female", 25)', 'SELECT @@Identity AS id')
        .on('done', function(data, message) {
          expect(data).to.eql([{ id: 5 }]);
          expect(message).to.eql('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Alice", "Female", 25) / SELECT @@Identity AS id success');

          next();
        }).on('fail', function(error) {
          console.log(error);

          next();
        });
    });

    it('query', function(next) {
      connection
        .query('SELECT * FROM Users')
        .on('done', function(data, message) {
          expect(data).to.eql(
            [
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
          );
          expect(message).to.eql('SELECT * FROM Users success');

          next();
        }).on('fail', function(error) {
          console.log(error);

          next();
        });
    });
  });
} else {
  console.log('This OS not support node-adodb.');
}
