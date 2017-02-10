'use strict';

var debug = require('debug')('ADODB');

debug.color = 6;

var toString = Object.prototype.toString;

/**
 * noop function
 */
function noop() {}

/**
 * judge function
 *
 * @param {any} fn
 * @returns {Boolean}
 */
function isFunction(fn) {
  return toString.call(fn) === '[object Function]';
}

/**
 * judge string
 *
 * @param {any} string
 * @returns {Boolean}
 */
function isString(string) {
  return toString.call(string) === '[object String]';
}

/**
 * judge object
 *
 * @param {any} object
 * @returns {Boolean}
 */
function isObject(object) {
  return toString.call(object) === '[object Object]';
}

/**
 * strip utf-8 BOM
 *
 * @param {any} buffer
 * @returns {Buffer}
 */
function stripBOM(buffer) {
  //EF BB BF 239 187 191
  if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
    buffer = buffer.slice(3);
  }

  return buffer;
}

// exports
module.exports = {
  noop: noop,
  isFunction: isFunction,
  isString: isString,
  isObject: isObject,
  stripBOM: stripBOM,
  debug: debug
};
