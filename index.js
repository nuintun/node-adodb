/**
 * @module index
 * @license MIT
 * @version 2017/11/09
 */

'use strict';

// Import lib
const Proxy = require('./lib/proxy');
const engine = require('./lib/engine');
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
   * @param {boolean} [x64]
   */
  constructor(connection, x64) {
    this.connection = connection;
    this.proxy = new Proxy(engine(x64));
  }

  /**
   * @method execute
   * @param {string} sql
   * @param {string} [scalar]
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

    return this.proxy.exec('execute', params);
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

    return this.proxy.exec('query', { connection, sql });
  }

  /**
   * @method schema
   * @param {number} type
   * @param {Array} [criteria]
   * @param {string} [id]
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

    return this.proxy.exec('schema', params);
  }
}

// Exports
module.exports = {
  /**
   * @property PATH
   * @description Set ADODB PATH
   */
  set PATH(adodb) {
    Proxy.adodb = adodb;
  },

  /**
   * @property PATH
   * @description Get ADODB PATH
   */
  get PATH() {
    return Proxy.adodb;
  },

  /**
   * @function open
   * @param {string} connection
   * @param {boolean} [x64]
   * @returns {ADODB}
   */
  open: (connection, x64) => new ADODB(connection, x64)
};
