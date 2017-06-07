'use strict';

var utils = require('./lib/utils');
var proxy = require('./lib/proxy');
var fields = require('./lib/fields');

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

    if (utils.isString(scalar)) {
      params.scalar = scalar;
    }

    return proxy.exec('execute', params);
  },
  query: function(sql, desc) {
    return proxy.exec('query', {
      connection: this.connection,
      desc: !!desc,
      sql: sql
    });
  }
}

module.exports = {
  open: ADODB.bind(ADODB),
  resolveType: fields.resolveType,
  resolveAttr: fields.resolveAttr
};
