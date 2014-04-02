/**
 * Created by Newton on 2014/4/2.
 */
var util = require('util'),
    process = require('./process'),
    eventemitter = require('events').EventEmitter;

function Query(connection, query){
    eventemitter.call(this);

    this.params = {
        connection: connection,
        query: query
    };

    this.exec();
}

util.inherits(Query, eventemitter);

Query.prototype.exec = function (){
    var that = this;

    process.exec(
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