/*!
 * events
 * Version: 0.0.1
 * Date: 2016/8/1
 * https://github.com/nuintun/node-adodb
 *
 * Original Author: https://github.com/aralejs/events
 *
 * This is licensed under the MIT License (MIT).
 * For details, see: https://github.com/nuintun/node-adodb/blob/master/LICENSE
 */

'use strict';

var utils = require('./utils');

// Array slice
var slice = Array.prototype.slice;

/**
 * Events
 *
 * @constructor
 */
function Events() {
  // Keep this empty so it's easier to inherit from
}

Events.prototype = {
  /**
   * Bind event
   *
   * @param {String} name
   * @param {Function} listener
   * @param {any} context
   * @returns {Events}
   */
  on: function(name, listener, context) {
    var self = this;
    var events = self._events || (self._events = {});

    context = arguments.length < 3 ? self : context;

    // [...[listener, context]]
    (events[name] || (events[name] = [])).push([listener, context]);

    return self;
  },
  /**
   * Bind event only emit once
   *
   * @param {String} name
   * @param {Function} listener
   * @param {any} context
   * @returns {Events}
   */
  once: function(name, listener, context) {
    var self = this;

    context = arguments.length < 3 ? self : context;

    function feedback() {
      self.off(name, feedback, this);
      utils.apply(listener, this, arguments);
    };

    return self.on(name, feedback, context);
  },
  /**
   * Emit event
   *
   * @param {String} name
   * @param {any} [...param]
   * @returns {Events}
   */
  emit: function(name) {
    var context = this;
    var data = slice.call(arguments, 1);
    var events = context._events || (context._events = {});
    var listeners = events[name] || [];

    var result;
    var listener;
    var returned;

    // Emit events
    for (var i = 0, length = listeners.length; i < length; i++) {
      listener = listeners[i];
      result = utils.apply(listener[0], listener[1], data);

      if (returned !== false) {
        returned = result;
      }
    }

    return returned;
  },
  /**
   * Remove event
   *
   * @param {String} name
   * @param {Function} listener
   * @param {any} context
   * @returns {Events}
   */
  off: function(name, listener, context) {
    var self = this;
    var length = arguments.length;
    var events = self._events || (self._events = {});

    switch (length) {
      case 0:
        self._events = {};
        break;
      case 1:
        delete events[name];
        break;
      default:
        if (listener) {
          var listeners = events[name];

          if (listeners) {
            context = length < 3 ? self : context;
            length = listeners.length;

            var monitor;

            for (var i = 0; i < length; i++) {
              monitor = listeners[i];

              if (monitor[0] === listener && monitor[1] === context) {
                listeners.splice(i, 1);
                break;
              }
            }

            // Remove event from queue to prevent memory leak
            if (!listeners.length) {
              delete events[name];
            }
          }
        }
        break;
    }

    return self;
  }
};

module.exports = Events;
