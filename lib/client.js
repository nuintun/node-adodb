/**
 * Created by nuintun on 2014/4/2.
 */

'use strict';

var config = require('./config'),
  Execute = require('./execute'),
  Query = require('./query');

function Client(connection, encoding){
  this.connection = connection;
  this.encoding = encoding;

  if (!(this instanceof Client)) {
    return new Client(connection, encoding);
  }
}

Client.prototype = {
  execute: function (sql){
    return new Execute(this.connection, sql, this.encoding);
  },
  query: function (sql){
    return new Query(this.connection, sql, this.encoding);
  }
};

// Main
config.open = Client.bind(Client);

// Exports
module.exports = config;
