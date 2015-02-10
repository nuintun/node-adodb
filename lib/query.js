/**
 * Created by nuintun on 2014/4/2.
 */

'use strict';

var util = require('util'),
  proxy = require('./proxy'),
  eventemitter = require('events').EventEmitter;

function Query(connection, query, encoding){
  eventemitter.call(this);

  this.encoding = encoding;
  this.params = {
    connection: connection,
    query: query
  };

  this.exec();
}

util.inherits(Query, eventemitter);

Query.prototype.exec = function (){
  var that = this;

  proxy.exec(
    'query',
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

module.exports = Query;