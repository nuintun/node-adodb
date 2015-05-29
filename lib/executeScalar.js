/**
 * Created by nuintun on 2014/4/20.
 */

'use strict';

// External lib
var util = require('util'),
  proxy = require('./proxy'),
  eventemitter = require('events').EventEmitter;

function ExecuteScalar(connection, sql, scalar){
  eventemitter.call(this);

  this.params = {
    connection: connection,
    sql: sql,
    scalar: scalar
  };

  this.exec();
}

util.inherits(ExecuteScalar, eventemitter);

ExecuteScalar.prototype.exec = function (){
  var that = this;

  proxy.exec(
    'executeScalar',
    that.params,
    function (data){
      that.emit('done', data);
    },
    function (error){
      that.emit('fail', error);
    }
  );
};

module.exports = ExecuteScalar;