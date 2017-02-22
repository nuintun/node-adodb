'use strict';

// Import lib
var fs = require('fs');
var arch = require('arch');
var path = require('path');
var utils = require('./utils');
var Events = require('./events');
var spawn = require('child_process').spawn;

// Variable declaration
var x64 = arch() === 'x64';
var adodb = path.join(__dirname, 'adodb.js');
var sysroot = process.env['systemroot'] || process.env['windir'];
var cscript = path.join(sysroot, x64 ? 'SysWOW64' : 'System32', 'cscript.exe');

// Exports exec command
exports.exec = function(command, params) {
  var stdio;
  var emitter = new Events();

  // Debug message
  utils.debug('cmd:', command);
  utils.debug('sql:', params.sql);
  params.scalar && utils.debug('scalar:', params.scalar);

  // Encode params
  params = encodeURI(JSON.stringify(params));
  // Exec commond
  stdio = spawn(cscript, [adodb, '//E:JScript', '//Nologo', command, params]);

  // Stdout
  stdio.stdout.on('data', function(data) {
    // Decode data
    data = decodeURI(String(data))

    try {
      // Parse json
      data = JSON.parse(data);
    } catch (error) {
      return emitter.emit('fail', data);
    }

    // Is valid json
    if (data.valid) {
      return emitter.emit('done', data.records || [], data.message);
    } else {
      return emitter.emit('fail', data.message);
    }
  });

  // Stderr
  stdio.stderr.on('data', function(data) {
    emitter.emit('fail', String(data));
  });

  // Exec error
  stdio.on('error', function(error) {
    emitter.emit('fail', String(error));
  });

  return emitter;
};
