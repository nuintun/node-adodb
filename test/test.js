/**
 * @module test
 * @license MIT
 * @version 2017/11/09
 */

'use strict';

const fs = require('fs');
const path = require('path');
const arch = require('arch');
const ADODB = require('../index');
const expect = require('chai').expect;
const holding = require('holding').assert;

const source = path.resolve('test/node-adodb.mdb');
const mdb = fs.readFileSync(require.resolve('../examples/node-adodb.mdb'));

fs.writeFileSync(source, mdb);

// Variable declaration
const x64 = arch() === 'x64';
const sysroot = process.env['systemroot'] || process.env['windir'];
const cscript = path.join(sysroot, x64 ? 'SysWOW64' : 'System32', 'cscript.exe');

if (fs.existsSync(cscript) && fs.existsSync(source)) {
  console.log('Use:', cscript);
  console.log('Database:', source);

  // Variable declaration
  const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=' + source + ';');

  describe('ADODB', () => {
    it('query', next => {
      connection
        .query('SELECT * FROM Users')
        .then(data => {
          expect(data.length).to.equal(3);
          expect(data[0].UserName).to.equal('Nuintun');
          expect(data[0]).to.have.ownProperty('UserBirthday');
          expect(data[2].UserName).to.equal('张三');
          next();
        })
        .catch(next);
    });

    it('transaction', next => {
      connection
        .transaction([`INSERT INTO Users(UserId, UserName, UserSex, UserBirthday, UserMarried) VALUES (10, "Tom", "Male", "1981/5/10", 0);`,
          `INSERT INTO Users(UserId, UserName, UserSex, UserBirthday, UserMarried) VALUES (11, "Brenda", "Female", "2001/1/11", 0);`,
          `INSERT INTO Users(UserId, UserName, UserSex, UserBirthday, UserMarried) VALUES (10, "Bill", "Male", "1991/3/9", 0);`])
        .then(data => {
          expect.fail();
          // next();
        })
        .catch(ex => {
          connection
          .query('SELECT * FROM Users')
          .then(data => {
            expect(data.length).to.equal(3);
            next();
          })
          .catch(next);
        });
    });

    it('schema', next => {
      const cb = holding(2, next);

      connection
        .schema(20)
        .then(data => {
          expect(data).to.be.an('array');

          if (data.length) {
            expect(data[0]).to.include.all.keys(['TABLE_NAME', 'TABLE_TYPE']);
          }

          cb();
        })
        .catch(cb);

      connection
        .schema(4, [null, null, 'Users'])
        .then(data => {
          expect(data).to.be.an('array');

          if (data.length) {
            expect(data[0]).to.include.all.keys(['COLUMN_NAME', 'DATA_TYPE']);
          }

          cb();
        })
        .catch(cb);

      connection
        .schema(-1, [null, null, 'Users'], 'TABLE')
        .then(data => {
          expect(data).to.be.an('array');
          cb();
        })
        .catch(() => cb());
    });

    it('Invaid sql syntax', next => {
      connection.query('SELECT * FROM Users-non-exist').catch(error => {
        expect(error).to.be.exist;
        next();
      });
    });

    describe('execute', () => {
      it('no scalar', next => {
        connection
          .execute('INSERT INTO Users(UserName, UserSex, UserBirthday, UserMarried) VALUES ("Bill", "Male", "1991/3/9", 0)')
          .then(data => {
            expect(data.length).to.equal(0);
            next();
          })
          .catch(next);
      });

      it('with scalar', next => {
        connection
          .execute(
            'INSERT INTO Users(UserName, UserSex, UserBirthday, UserMarried) VALUES ("Alice", "Female", "1986/3/9", 0)',
            'SELECT @@Identity AS id'
          )
          .then(function(data) {
            expect(data.length).to.equal(1);
            expect(data[0].id).to.equal(13);
            next();
          })
          .catch(next);
      });
    });
  });
} else {
  console.log('This OS not support node-adodb.');
}
