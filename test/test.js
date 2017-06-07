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

if (fs.existsSync(cscript) && fs.existsSync(source)) {
  console.log('Use:', cscript);
  console.log('Database:', source);

  // variable declaration
  var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + source + ';');

  describe('ADODB', function() {
    it('events bind', function(next) {
      var time = 5;
      var query = connection.query('SELECT * FROM Users');

      // noop function
      function fn() {
        if (!time--) {
          next();
        }
      }

      // coveralls cover
      query
        .on('done', fn)
        .off('done', fn)
        .off('done')
        .off()
        .once('done', fn);

      query.on('custom', fn);
      query.emit('custom');
      query.emit('custom', 1);
      query.emit('custom', 1, 2);
      query.emit('custom', 1, 2, 3);
      query.emit('custom', 1, 2, 3, 4);
    });

    it('resolve type', function(next) {
      expect(ADODB.resolveType(202)).to.eql('adVarWChar');

      next();
    });

    it('resolve attribute', function(next) {
      expect(ADODB.resolveAttr(106)).to.eql({
        adFldMayDefer: true,
        adFldUnknownUpdatable: true,
        adFldIsNullable: true,
        adFldMayBeNull: true
      });

      next();
    });

    describe('query', function() {
      it('no field description', function(next) {
        connection
          .query('SELECT * FROM Users')
          .on('done', function(data, message) {
            expect(data.length).to.eql(3);
            expect(data[0].UserName).to.eql('Nuintun');
            expect(message).to.eql('SELECT * FROM Users success');

            next();
          }).on('fail', function(error) {
            next(error);
          });
      });

      it('with field description', function(next) {
        connection
          .query('SELECT * FROM Users', true)
          .on('done', function(data, message) {
            expect(data.length).to.eql(3);
            expect(data[0].UserName.Type).to.eql(202);
            expect(data[0].UserName.Value).to.eql('Nuintun');
            expect(message).to.eql('SELECT * FROM Users success');

            next();
          }).on('fail', function(error) {
            next(error);
          });
      });
    });

    describe('execute', function() {
      it('no scalar', function(next) {
        connection
          .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Nuintun", "Male", 25)')
          .on('done', function(data, message) {
            expect(data).to.eql([]);
            expect(message).to.eql('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Nuintun", "Male", 25) success');

            next();
          }).on('fail', function(error) {
            next(error);
          });
      });

      it('with scalar', function(next) {
        connection
          .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Alice", "Female", 25)', 'SELECT @@Identity AS id')
          .on('done', function(data, message) {
            expect(data).to.eql([{ id: 5 }]);
            expect(message).to.eql('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Alice", "Female", 25) / SELECT @@Identity AS id success');

            next();
          }).on('fail', function(error) {
            next(error);
          });
      });
    });
  });
} else {
  console.log('This OS not support node-adodb.');
}
