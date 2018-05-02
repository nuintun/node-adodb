/**
 * @module proxy
 * @license MIT
 * @version 2017/11/09
 */

'use strict';

// Import lib
const spawn = require('./spawn');

// Get adodb
const adodb = require.resolve('./adodb');

/**
 * @class Proxy
 */
class Proxy {
  /**
   * @constructor
   * @param {string} engine
   * @param {string} [encoding]
   */
  constructor(engine, encoding) {
    this.engine = engine;
    this.encoding = encoding || 'utf16le';
  }

  /**
   * @method exec
   * @param {string} command
   * @param {Object} params
   * @returns {Promise}
   */
  exec(command, params) {
    const engine = this.engine;
    const encoding = this.encoding;

    // Params to string
    params = JSON.stringify(params);

    // Spawn args
    const args = [adodb, '//E:JScript', '//Nologo', '//U', '//B', command];

    // Spawn
    return spawn(engine, args, params, { encoding })
      .then(data => JSON.parse(data))
      .catch(error => {
        if (error.process) {
          error.process = JSON.parse(error.process);
        }

        throw error;
      });
  }
}

// Exports
module.exports = Proxy;
