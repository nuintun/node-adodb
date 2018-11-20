/**
 * @module proxy
 * @license MIT
 * @version 2017/11/09
 */

'use strict';

// Import lib
const spawn = require('./spawn');

/**
 * @class Proxy
 */
class Proxy {
  /**
   * @constructor
   * @param {string} engine
   */
  constructor(engine) {
    this.engine = engine;
  }

  /**
   * @method exec
   * @param {string} command
   * @param {Object} params
   * @returns {Promise}
   */
  exec(command, params) {
    const engine = this.engine;

    // Params to string
    params = JSON.stringify(params);

    // Spawn args
    const args = [Proxy.adodb, '//E:JScript', '//Nologo', '//U', '//B', command];

    // Spawn
    return spawn(engine, args, params, { encoding: 'utf16le' })
      .then(data => JSON.parse(data))
      .catch(error => {
        if (error.process) {
          error.process = JSON.parse(error.process);
        }

        throw error;
      });
  }
}

// ADODB actuator
Proxy.adodb = require.resolve('./adodb');

// Exports
module.exports = Proxy;
