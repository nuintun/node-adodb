/**
 * Created by Newton on 2014/4/2.
 */
var config = require('./config'),
    Execute = require('./execute'),
    Query = require('./query');

function Client(connection){
    this.connection = connection;
    if (!(this instanceof Client)) {
        return new Client(connection);
    }
}

Client.prototype = {
    execute: function (sql){
        return new Execute(this.connection, sql);
    },
    query: function (sql){
        return new Query(this.connection, sql);
    }
};

config.open = Client;

module.exports = config;
