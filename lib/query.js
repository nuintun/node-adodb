/**
 * Created by nuintun on 2014/4/2.
 */

'use strict';

// External lib
var util = require('util'),
  proxy = require('./proxy'),
  eventemitter = require('events').EventEmitter;

function Query(connection, sql){
  eventemitter.call(this);

  this.params = {
    connection: connection,
    sql: sql
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
    }
  );
};

module.exports = Query;