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
          .on('done', function(data) {
            expect(data.length).to.eql(3);
            expect(data[0].UserName).to.eql('Nuintun');
            expect(data[0]).to.have.key('UserBirthday');
            expect(data[2].UserName).to.eql('张三');

            next();
          }).on('fail', function(error) {
            next(error);
          });
      });

      it('with field schema', function(next) {
        connection
          .query('SELECT * FROM Users', true)
          .on('done', function(data, schema) {
            expect(data.length).to.eql(3);
            expect(data[0].UserName).to.eql('Nuintun');
            expect(schema.UserName.Type).to.eql(202);
            expect(schema.UserBirthday.Type).to.eql(7);

            next();
          }).on('fail', function(error) {
            next(error);
          });
      });
    });

    describe('execute', function() {
      it('no scalar', function(next) {
        connection
          .execute('INSERT INTO Users(UserName, UserSex, UserBirthday, UserMarried) VALUES ("Bill", "Male", "1991/3/9", 0)')
          .on('done', function(data) {
            expect(data.length).to.eql(0);

            next();
          }).on('fail', function(error) {
            next(error);
          });
      });

      it('with scalar', function(next) {
        connection
          .execute('INSERT INTO Users(UserName, UserSex, UserBirthday, UserMarried) VALUES ("Alice", "Female", "1986/3/9", 0)', 'SELECT @@Identity AS id')
          .on('done', function(data) {
            expect(data.length).to.eql(1);
            expect(data[0].id).to.eql(5);

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
