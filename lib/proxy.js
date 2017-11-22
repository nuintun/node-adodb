/**
 * @module proxy
 * @license MIT
 * @version 2017/11/09
 */

'use strict';

// Import lib
const fs = require('fs');
const arch = require('arch');
const path = require('path');
const spawn = require('child_process').spawn;

// Variable declaration
const x64 = arch() === 'x64';
const adodb = path.join(__dirname, 'adodb.js');
const sysroot = process.env['systemroot'] || process.env['windir'];
const cscript = path.join(sysroot, x64 ? 'SysWOW64' : 'System32', 'cscript.exe');

/**
 * @function exec
 * @param {string} command
 * @param {Object} params
 * @returns {Promise}
 */
exports.exec = function(command, params) {
  return new Promise((resolve, reject) => {
    // Exec commond
    const stdio = spawn(cscript, [adodb, '//E:JScript', '//Nologo', '//U', '//B', command], { windowsHide: true });

    // Stdout
    stdio.stdout.on('data', data => {
      // Decode data use utf16le
      data = data.toString('utf16le');

      try {
        // Parse json data
        data = JSON.parse(data);
      } catch (error) {
        return reject(data);
      }

      // Is valid json
      resolve(data);
    });

    // Stderr
    stdio.stderr.on('data', data => {
      reject(new Error(data.toString('utf16le')));
    });

    // Exec error
    stdio.on('error', error => {
      reject(error);
    });

    // Send params
    stdio.stdin.end(JSON.stringify(params), 'utf16le');
  });
};
