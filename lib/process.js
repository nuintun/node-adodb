/**
 * Created by Newton on 2014/4/2.
 */
var util = require('util'),
    path = require('path'),
    exec = require('child_process').exec,
    config = require('./config'),
    adodb = path.join(__dirname, 'adodb.js'),
    cscript = path.join('%windir%', process.arch === 'x64' ? 'SysWOW64' : 'System32', 'cscript.exe');

require('./colors');

// noop function
function noop(){}

// is function
function isFunction(func){
    return Object.prototype.toString.call(func) === '[object Function]';
}

// exports exec method
exports.exec = function (method, params, done, fail){
    var commond, stdio;

    done = isFunction(done) ? done : noop;
    fail = isFunction(fail) ? fail : noop;

    config.debug && console.log('Exec:'.green.bold, method.cyan.bold);
    config.debug && console.log('Params:'.green.bold, JSON.stringify(params, null, '  ').cyan.bold);

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
            stdio.stderr.emit('data', e.message);
            return;
        }

        data.valid ? done(data) : stdio.stderr.emit('data', data.message);
    });

    // stderr
    stdio.stderr.on('data', function (data){
        data = {
            valid: false,
            message: data
        };
        config.debug && console.log('Error:'.red.bold, JSON.stringify(data, null, ' ').cyan.bold);
        fail(data);
    });

    // exec error
    stdio.on('error', function (error){
        console.log('Exec Error:'.red.bold, JSON.stringify(error, null, '  ').cyan.bold);
    });
};
