var ADODB = require('../index'),
  expect = require('expect.js');

describe('ADODB', function (){
  // Variable declaration
  var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

  it('execute', function (next){
    connection
      .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Nuintun", "Male", 25)')
      .on('done', function (data){
        expect(data).to.eql({
          valid: true,
          message: 'Execute SQL: INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Nuintun", "Male", 25) success !'
        });

        next();
      });
  });

  it('executeScalar', function (next){
    connection
      .executeScalar('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Alice", "Female", 25)', 'SELECT @@Identity AS id')
      .on('done', function (data){
        expect(data).to.eql({
          valid: true,
          message: 'Execute Scalar SQL: INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Alice", "Female", 25) / SELECT @@Identity AS id success !',
          records: [{ id: 5 }]
        });

        next();
      });
  });

  it('query', function (next){
    connection
      .query('SELECT * FROM Users')
      .on('done', function (data){
        expect(data).to.eql({
          valid: true,
          message: 'Execute SQL: SELECT * FROM Users success !',
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
      });
  });
});
