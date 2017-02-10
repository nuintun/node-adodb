'use strict';

// import lib
var fs = require('fs');
var arch = require('arch');
var path = require('path');
var utils = require('./utils');
var Events = require('./events');
var spawn = require('child_process').spawn;

// variable declaration
var x64 = arch() === 'x64';
var adodb = path.join(__dirname, 'adodb.js');
var sysroot = process.env['systemroot'] || process.env['windir'];
var cscript = path.join(sysroot, x64 ? 'SysWOW64' : 'System32', 'cscript.exe');

// exports exec command
exports.exec = function(command, params) {
  var stdio;
  var emitter = new Events();

  // debug message
  utils.debug('cmd:', command);
  utils.debug('sql:', params.sql);
  params.scalar && utils.debug('scalar:', params.scalar);

  // params encode to base64
  params = new Buffer(JSON.stringify(params)).toString('base64');
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
          return emitter.emit('done', data.records || [], data.message);
        } else {
          return emitter.emit('fail', data.message);
        }
      } catch (error) {
        return emitter.emit('fail', String(error));
      }
    } else {
      return emitter.emit('fail', 'Unknown error');
    }
  });

  // stderr
  stdio.stderr.on('data', function(data) {
    emitter.emit('fail', String(data || 'Unknown error'));
  });

  // exec error
  stdio.on('error', function(error) {
    emitter.emit('fail', String(error));
  });

  return emitter;
};
