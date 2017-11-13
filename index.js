/**
 * @module index
 * @license MIT
 * @version 2017/11/09
 */

'use strict';

const utils = require('./lib/utils');
const proxy = require('./lib/proxy');

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
    const connection = this.connection;
    const params = { connection, sql };

    if (utils.isString(scalar)) {
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
    const length = arguments.length;
    const connection = this.connection;
    const params = { connection, type };

    if (length >= 2) {
      params.criteria = criteria;
    }

    if (length >= 3) {
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
  open: (connection) => {
    return new ADODB(connection);
  }
};
