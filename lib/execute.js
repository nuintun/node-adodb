/**
 * Created by nuintun on 2014/4/2.
 */

'use strict';

var util = require('util'),
  proxy = require('./proxy'),
  eventemitter = require('events').EventEmitter;

function Execute(connection, query, encoding){
  eventemitter.call(this);

  this.encoding = encoding;
  this.params = {
    connection: connection,
    query: query
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
    },
    this.encoding
  );
};

module.exports = Execute;