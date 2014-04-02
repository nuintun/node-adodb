/**
 * Created by Newton on 2014/4/2.
 */
var util = require('util'),
    process = require('./process'),
    eventemitter = require('events').EventEmitter;

function Execute(connection, query){
    eventemitter.call(this);

    this.params = {
        connection: connection,
        query: query
    };

    this.exec();
}

util.inherits(Execute, eventemitter);

Execute.prototype.exec = function (){
    var that = this;

    process.exec(
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