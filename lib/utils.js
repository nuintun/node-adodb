'use strict';

// import lib
var debug = require('debug')('ADODB');

// set debug color
debug.color = 6;

// object toString
var toString = Object.prototype.toString;

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
 * faster apply
 *
 * @param  {Function} func
 * @param  {any} context
 * @param  {Array} args
 * call is faster than apply, optimize less than 6 args
 * https://github.com/micro-js/apply
 * http://blog.csdn.net/zhengyinhui100/article/details/7837127
 */
function apply(func, context, args) {
  switch (args.length) {
    // faster
    case 0:
      return func.call(context);
    case 1:
      return func.call(context, args[0]);
    case 2:
      return func.call(context, args[0], args[1]);
    case 3:
      return func.call(context, args[0], args[1], args[2]);
    default:
      // slower
      return func.apply(context, args);
  }
}

// exports
module.exports = {
  debug: debug,
  isString: isString,
  apply: apply
};
