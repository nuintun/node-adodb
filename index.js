'use strict';

var utils = require('./lib/utils');
var proxy = require('./lib/proxy');

function ADODB(connection) {
  if (!(this instanceof ADODB)) {
    return new ADODB(connection);
  }

  this.connection = connection;
}

ADODB.prototype = {
  execute: function(sql, scalar) {
    var params = {
      connection: this.connection,
      sql: sql
    };

    var command = 'execute';

    if (utils.isString(scalar)) {
      command = 'scalar';
      params.scalar = scalar;
    }

    return proxy.exec(command, params);
  },
  query: function(sql) {
    return proxy.exec('query', {
      connection: this.connection,
      sql: sql
    });
  }
}

module.exports = {
  open: ADODB.bind(ADODB)
};
