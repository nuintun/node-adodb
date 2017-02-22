'use strict';

// Import lib
var utils = require('./utils');

// Array slice
var slice = Array.prototype.slice;

function Events() {
  // Keep this empty so it's easier to inherit from
}

Events.prototype = {
  on: function(name, listener, context) {
    var self = this;
    var events = self.__events || (self.__events = {});

    context = arguments.length < 3 ? self : context;

    (events[name] || (events[name] = [])).push({
      fn: listener,
      context: context
    });

    return self;
  },
  once: function(name, listener, context) {
    var self = this;

    function feedback() {
      self.off(name, feedback);
      utils.apply(listener, this, arguments);
    };

    return self.on(name, feedback, context);
  },
  emit: function(name) {
    var context = this;
    var data = slice.call(arguments, 1);
    var events = context.__events || (context.__events = {});
    var listeners = events[name] || [];

    var result;
    var listener;
    var returned;

    // emit events
    for (var i = 0, length = listeners.length; i < length; i++) {
      listener = listeners[i];
      result = utils.apply(listener.fn, listener.context, data);

      if (returned !== false) {
        returned = result;
      }
    }

    return returned;
  },
  off: function(name, listener, context) {
    var self = this;
    var length = arguments.length;
    var events = self.__events || (self.__events = {});

    switch (length) {
      case 0:
        self.__events = {};
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

            var event;

            for (var i = 0; i < length; i++) {
              event = listeners[i];

              if (event.fn === listener && event.context === context) {
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
