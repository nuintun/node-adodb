/**
 * @module engine
 * @license MIT
 * @version 2018/05/02
 */

'use strict';

// Import lib
const arch = require('arch');
const path = require('path');

// Variable
const archx64 = arch() === 'x64';
const sysroot = process.env['systemroot'] || process.env['windir'];
const cscript32 = path.join(sysroot, archx64 ? 'SysWOW64' : 'System32', 'cscript.exe');
const cscript64 = path.join(sysroot, 'System32/cscript.exe');

/**
 * @function engine
 * @param {boolean} x64
 * @returns {string}
 */
module.exports = x64 => {
  if (x64) return cscript64;

  return cscript32;
};
