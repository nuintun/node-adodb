/**
 * Created by nuintun on 2014/4/2.
 */

'use strict';

// External lib
var fs = require('fs'),
  path = require('path'),
  config = require('./config'),
  colors = require('colors/safe'),
  spawn = require('child_process').spawn;

// Variable declaration
var toString = Object.prototype.toString,
  adodb = path.join(__dirname, 'adodb.js'),
  sysroot = process.env['systemroot'] || process.env['windir'],
  x64 = fs.existsSync(path.join(sysroot, 'SysWOW64')),
  cscript = path.join(sysroot, x64 ? 'SysWOW64' : 'System32', 'cscript.exe');

// Noop function
function noop(){}

// Is function
function isFunction(fn){
  return toString.call(fn) === '[object Function]';
}

// Is string
function isString(string){
  return toString.call(string) === '[object String]';
}

// Is object
function isObject(object){
  return toString.call(object) === '[object Object]';
}

// strip utf-8 BOM
function stripBOM(buffer){
  //EF BB BF 239 187 191
  if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
    buffer = buffer.slice(3);
  }

  return buffer;
}

// Exports exec method
exports.exec = function (method, params, done, fail){
  var stdio;

  // Format callback function
  done = isFunction(done) ? done : noop;
  fail = isFunction(fail) ? fail : noop;

  // Debug message
  if (config.debug) {
    console.log(colors.green.bold('Exec:'), colors.cyan.bold(method));
    console.log(colors.green.bold('Params:'), colors.cyan.bold(JSON.stringify(params, null, '  ')));
  }

  // Params encode to base64
  params = (new Buffer(JSON.stringify(params))).toString('base64');
  // Exec commond
  stdio = spawn(cscript, [adodb, '//E:JScript', '//Nologo', method, params]);

  // Stdout
  stdio.stdout.on('data', function (data){
    // Is buffer
    if (Buffer.isBuffer(data)) {
      data = new Buffer(data.toString(), 'base64');
      data = stripBOM(data).toString();
    }

    // Data must be string
    if (isString(data)) {
      try {
        // Parse json
        data = JSON.parse(data);

        // Is valid
        if (data.valid) {
          done(data);
        } else {
          stdio.stderr.emit('data', data);
        }
      } catch (e) {
        return stdio.stderr.emit('data', {
          valid: false,
          message: e.message
        });
      }
    } else {
      return stdio.stderr.emit('data', {
        valid: false,
        message: 'Unknown error'
      });
    }
  });

  // Stderr
  stdio.stderr.on('data', function (data){
    if (!isObject(data)) {
      data = {
        valid: false,
        message: (data || 'Unknown error').toString()
      }
    }

    // Debug message
    if (config.debug) {
      console.log(colors.yellow.bold('Error:'), colors.red.bold(JSON.stringify(data, null, 2)));
    }

    fail(data);
  });

  // Exec error
  stdio.on('error', function (error){
    console.log(colors.yellow.bold('Exec Error:'), colors.red.bold(JSON.stringify(error, null, 2)));
  });
};
