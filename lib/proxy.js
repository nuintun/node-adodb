'use strict';

// Import lib
const fs = require('fs');
const arch = require('arch');
const path = require('path');
const utils = require('./utils');
const spawn = require('child_process').spawn;

// Variable declaration
const x64 = arch() === 'x64';
const adodb = path.join(__dirname, 'adodb.js');
const sysroot = process.env['systemroot'] || process.env['windir'];
const cscript = path.join(sysroot, x64 ? 'SysWOW64' : 'System32', 'cscript.exe');

// Exports exec command
exports.exec = function(command, params) {
  // Debug message
  utils.debug('cmd:', command);
  utils.debug('sql:', params.sql);
  params.scalar && utils.debug('scalar:', params.scalar);

  return new Promise((resolve, reject) => {
    // Encode params
    params = encodeURI(JSON.stringify(params));

    // Exec commond
    const stdio = spawn(cscript, [adodb, '//E:JScript', '//Nologo', command, params]);

    // Stdout
    stdio.stdout.on('data', (data) => {
      // Decode data and strip UTF8 BOM
      data = utils.stripBOM(decodeURI(String(data)));

      try {
        // Parse json data
        data = JSON.parse(data);
      } catch (error) {
        return reject(data);
      }

      // Is valid json
      if (data.valid) {
        resolve(data.records || []);
      } else {
        reject(data.message);
      }
    });

    // Stderr
    stdio.stderr.on('data', (data) => {
      reject(String(data));
    });

    // Exec error
    stdio.on('error', (error) => {
      reject(String(error));
    });
  });
};
