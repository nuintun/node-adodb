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
const spawn = require('./spawn');

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
  // Set encoding
  const encoding = 'utf16le';

  // Params to string
  params = JSON.stringify(params);

  // Spawn args
  const args = [adodb, '//E:JScript', '//Nologo', '//U', '//B', command];

  // Spawn
  return spawn(cscript, args, params, { encoding }).then(data => JSON.parse(data));
};
