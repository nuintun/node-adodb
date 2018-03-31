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

// Variable
const x64 = arch() === 'x64';
const adodb = require.resolve('./adodb');
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
    // Exec cscript.exe
    const stdio = spawn(cscript, [adodb, '//E:JScript', '//Nologo', '//U', '//B', command], { windowsHide: true });

    // Variable
    const errors = [];
    const metadata = [];
    const stdin = stdio.stdin;
    const stdout = stdio.stdout;
    const stderr = stdio.stderr;

    // Exec error
    stdio.on('error', error => reject(error));

    // Stdout
    stdout.on('data', data => metadata.push(data));
    stdout.on('close', () => {
      // Only parse when with metadata
      if (metadata.length) {
        // Decode data use utf16le
        let data = Buffer.concat(metadata).toString('utf16le');

        try {
          // Parse json data
          data = JSON.parse(data);
        } catch (error) {
          return reject(data);
        }

        // Is valid json
        resolve(data);
      }
    });

    // Stderr
    stderr.on('data', data => errors.push(data));
    stderr.on('close', () => {
      // Only reject when with error
      if (errors.length) {
        reject(new Error(Buffer.concat(errors).toString('utf16le')));
      }
    });

    // Send params
    stdin.end(JSON.stringify(params), 'utf16le');
  });
};
