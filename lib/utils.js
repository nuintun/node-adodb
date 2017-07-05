'use strict';

// Import lib
var debug = require('debug')('ADODB');

// Set debug color
debug.color = 6;

// Object toString
var toString = Object.prototype.toString;

/**
 * Judge string
 *
 * @param {any} string
 * @returns {Boolean}
 */
function isString(string) {
  return toString.call(string) === '[object String]';
}

/**
 * Faster apply
 * Call is faster than apply, optimize less than 6 args *
 *
 * @param  {Function} fn
 * @param  {any} context
 * @param  {Array} args
 * @see https://github.com/micro-js/apply
 * @see http://blog.csdn.net/zhengyinhui100/article/details/7837127
 */
function apply(fn, context, args) {
  switch (args.length) {
    // Faster
    case 0:
      return fn.call(context);
    case 1:
      return fn.call(context, args[0]);
    case 2:
      return fn.call(context, args[0], args[1]);
    case 3:
      return fn.call(context, args[0], args[1], args[2]);
    default:
      // Slower
      return fn.apply(context, args);
  }
}

/**
 * Strip UTF8 BOM
 *
 * @param {String} text
 * @returns {String}
 * @see https://github.com/sindresorhus/strip-bom
 */
function stripBOM(text) {
  // Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
  // conversion translates it to FEFF (UTF-16 BOM)
  if (text.charCodeAt(0) === 0xFEFF) {
    return text.slice(1);
  }

  return text;
}

// Exports
module.exports = {
  debug: debug,
  isString: isString,
  apply: apply,
  stripBOM: stripBOM
};
