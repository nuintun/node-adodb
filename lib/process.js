/**
 * Created by Newton on 2014/4/2.
 */
var util = require('util'),
    path = require('path'),
    exec = require('child_process').exec,
    config = require('./config'),
    adodb = path.join(__dirname, 'adodb.js');

require('./colors');

function noop(){}

function isFunction(fun){
    return Object.prototype.toString.call(fun) === '[object Function]';
}

exports.exec = function (method, params, done, fail){
    var commond, stdio;

    done = isFunction(done) ? done : noop;
    fail = isFunction(fail) ? fail : noop;

    config.debug && console.log('Exec:'.green.bold, method.cyan.bold);
    config.debug && console.log('Params:'.green.bold, JSON.stringify(params, null, '  ').cyan.bold);

    params = (new Buffer(JSON.stringify(params))).toString('base64');
    commond = util.format(
        'CScript %s //e:JScript //h:CScript //Nologo %s %s',
        adodb,
        method,
        params
    );
    stdio = exec(commond);
    stdio.stdout.on('data', function (data){
        try {
            data = JSON.parse(data);
        } catch (e) {
            fail(data);
            return;
        }

        done(data);
    });
    stdio.stderr.on('data', fail);
    stdio.on('error', function (error){
        console.log('Exec Error:'.red.bold, error.bold);
    });
};
