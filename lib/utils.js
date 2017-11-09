/**
 * @module utils
 * @license MIT
 * @version 2017/11/09
 */

'use strict';

// Import lib
const debug = require('debug')('ADODB');

// Object toString
const toString = Object.prototype.toString;

// Set debug color
debug.color = 6;

/**
 * Judge string
 *
 * @param {any} string
 * @returns {Boolean}
 */
function isString(string) {
  return toString.call(string) === '[object String]';
}

// Exports
module.exports = {
  debug,
  isString
};
