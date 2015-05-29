/**
 * Created by nuintun on 2014/4/2.
 */

'use strict';

// External lib
var util = require('util'),
  proxy = require('./proxy'),
  eventemitter = require('events').EventEmitter;

function Execute(connection, sql){
  eventemitter.call(this);

  this.params = {
    connection: connection,
    sql: sql
  };

  this.exec();
}

util.inherits(Execute, eventemitter);

Execute.prototype.exec = function (){
  var that = this;

  proxy.exec(
    'execute',
    that.params,
    function (data){
      that.emit('done', data);
    },
    function (error){
      that.emit('fail', error);
    }
  );
};

module.exports = Execute;