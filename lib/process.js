/**
 * Created by Newton on 2014/4/2.
 */
var util = require('util'),
    path = require('path'),
    exec = require('child_process').exec,
    config = require('./config'),
    adodb = path.join(__dirname, 'adodb.js');

require('./colors');

// noop function
function noop(){}

// is function
function isFunction(func){
    return Object.prototype.toString.call(func) === '[object Function]';
}

// exports exec method
exports.exec = function (method, params, done, fail){
    var cscript, commond, stdio;

    done = isFunction(done) ? done : noop;
    fail = isFunction(fail) ? fail : noop;

    config.debug && console.log('Exec:'.green.bold, method.cyan.bold);
    config.debug && console.log('Params:'.green.bold, JSON.stringify(params, null, '  ').cyan.bold);

    cscript = path.join('%windir%', process.arch === 'x64' && !config.x64 ? 'SysWOW64' : 'System32', 'cscript.exe');
    params = (new Buffer(JSON.stringify(params))).toString('base64');
    commond = util.format(
        '%s %s //E:JScript //Nologo %s %s',
        cscript,
        adodb,
        method,
        params
    );

    // exec commond
    stdio = exec(commond);

    // stdout
    stdio.stdout.on('data', function (data){
        try {
            data = JSON.parse(data);
        } catch (e) {
            fail(data);
            return;
        }

        data.valid ? done(data) : fail(data);
    });

    // stderr
    stdio.stderr.on('data', fail);

    // error
    stdio.on('error', function (error){
        console.log('Exec Error:'.red.bold, error.bold);
    });
};
