/**
 * @module index
 * @license MIT
 * @version 2017/11/09
 */

'use strict';

// Import lib
const proxy = require('./lib/proxy');
const debug = require('debug')('ADODB');

// Set debug color
debug.color = 6;

/**
 * @class ADODB
 */
class ADODB {
  /**
   * @constructor
   * @param {string} connection
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * @method execute
   * @param {string} sql
   * @param {string} scalar
   * @returns {Promise}
   */
  execute(sql, scalar) {
    debug('cmd:', 'execute');
    debug('sql:', sql);

    const connection = this.connection;
    const params = { connection, sql };

    if (arguments.length > 1) {
      debug('scalar:', scalar);

      params.scalar = scalar;
    }

    return proxy.exec('execute', params);
  }

  /**
   * @method query
   * @param {string} sql
   * @returns {Promise}
   */
  query(sql) {
    debug('cmd:', 'query');
    debug('sql:', sql);

    const connection = this.connection;

    return proxy.exec('query', { connection, sql });
  }

  /**
   * @method schema
   * @param {number} type
   * @param {Array} criteria
   * @param {string} id
   * @returns {Promise}
   */
  schema(type, criteria, id) {
    debug('cmd:', 'schema');
    debug('type:', type);

    const length = arguments.length;
    const connection = this.connection;
    const params = { connection, type };

    if (length > 1) {
      debug('criteria:', criteria);

      params.criteria = criteria;
    }

    if (length > 2) {
      debug('id:', id);

      params.id = id;
    }

    return proxy.exec('schema', params);
  }
}

// Exports
module.exports = {
  /**
   * @function open
   * @param {string} connection
   * @returns {ADODB}
   */
  open: connection => new ADODB(connection)
};
