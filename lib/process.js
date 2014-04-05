/**
 * Created by Newton on 2014/4/2.
 */
var fs = require('fs'),
    path = require('path'),
    colors = require('colors'),
    config = require('./config'),
    iconv = require('iconv-lite'),
    spawn = require('child_process').spawn,
    adodb = path.join(__dirname, 'adodb.js'),
    sysroot = process.env['systemroot'] || process.env['windir'],
    x64 = fs.existsSync(path.join(sysroot, 'SysWOW64')),
    cscript = path.join(sysroot, x64 ? 'SysWOW64' : 'System32', 'cscript.exe');

// noop function
function noop(){}

// is function
function isFunction(func){
    return Object.prototype.toString.call(func) === '[object Function]';
}

// exports exec method
exports.exec = function (method, params, done, fail){
    var stdio;

    done = isFunction(done) ? done : noop;
    fail = isFunction(fail) ? fail : noop;

    config.debug && console.log('Exec:'.green.bold, method.cyan.bold);
    config.debug && console.log('Params:'.green.bold, JSON.stringify(params, null, '  ').cyan.bold);

    // params encode to base64
    params = (new Buffer(JSON.stringify(params))).toString('base64');
    // exec commond
    stdio = spawn(cscript, [adodb, '//E:JScript', '//Nologo', method, params]);

    // stdout
    stdio.stdout.on('data', function (data){
        data = iconv.decode(data, 'gbk');

        try {
            data = JSON.parse(data);
        } catch (e) {
            stdio.stderr.emit('data', data);
            return;
        }

        data.valid ? done(data) : stdio.stderr.emit('data', data.message);
    });

    // stderr
    stdio.stderr.on('data', function (data){
        data = {
            valid: false,
            message: (data instanceof Buffer ? iconv.decode(data, 'gbk') : data).replace(/\r\n/img, '')
        };

        config.debug && console.log('Error:'.red.bold, JSON.stringify(data, null, ' ').cyan.bold);
        fail(data);
    });

    // exec error
    stdio.on('error', function (error){
        console.log('Exec Error:'.red.bold, JSON.stringify(error, null, '  ').cyan.bold);
    });
};
