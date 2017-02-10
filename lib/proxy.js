'use strict';

// import lib
var fs = require('fs');
var arch = require('arch');
var path = require('path');
var utils = require('./utils');
var colors = require('colors/safe');
var spawn = require('child_process').spawn;
var EventEmitter = require('events').EventEmitter;

// variable declaration
var x64 = arch() === 'x64';
var adodb = path.join(__dirname, 'adodb.js');
var sysroot = process.env['systemroot'] || process.env['windir'];
var cscript = path.join(sysroot, x64 ? 'SysWOW64' : 'System32', 'cscript.exe');

// exports exec command
exports.exec = function(command, params) {
  var stdio;
  var emitter = new EventEmitter();

  // debug message
  utils.debug(colors.green.bold('CMD:'), colors.magenta.bold(command.toUpperCase()));
  utils.debug(colors.green.bold('SQL:'), colors.magenta.bold(params.sql));
  params.scalar && utils.debug(colors.green.bold('Scalar:'), colors.magenta.bold(params.scalar));

  // params encode to base64
  params = (new Buffer(JSON.stringify(params))).toString('base64');
  // exec commond
  stdio = spawn(cscript, [adodb, '//E:JScript', '//Nologo', command, params]);

  // stdout
  stdio.stdout.on('data', function(data) {
    // is buffer
    if (Buffer.isBuffer(data)) {
      data = new Buffer(data.toString(), 'base64');
      data = String(utils.stripBOM(data));
    }

    // data must be string
    if (utils.isString(data)) {
      try {
        // parse json
        data = JSON.parse(data);

        // is valid
        if (data.valid) {
          return emitter.emit('done', data);
        } else {
          return emitter.emit('fail', data);
        }
      } catch (e) {
        return emitter.emit('fail', {
          valid: false,
          message: e.message
        });
      }
    } else {
      return emitter.emit('fail', {
        valid: false,
        message: 'Unknown error'
      });
    }
  });

  // stderr
  stdio.stderr.on('data', function(data) {
    if (!utils.isObject(data)) {
      data = {
        valid: false,
        message: String(data || 'Unknown error')
      }
    }

    emitter.emit('fail', data);
  });

  // exec error
  stdio.on('error', function(error) {
    console.error(colors.yellow.bold('Exec Error:'), colors.red.bold(JSON.stringify(error, null, 2)));
  });

  return emitter;
};
