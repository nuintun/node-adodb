/**
 * @module spawn
 * @license MIT
 * @version 2018/04/28
 * @see https://github.com/panosoft/spawn-promise
 */

'use strict';

let transcode = require('buffer').transcode;
const childProcess = require('child_process');

// Hack transcode
if (!transcode) {
  /**
   * @function toBuffer
   * @param {string} string
   * @param {string} encoding
   * @returns {Buffer}
   */
  const toBuffer =
    Buffer.from ||
    function(string, encoding) {
      return new Buffer(string, encoding);
    };

  /**
   * @function transcode
   * @param {Buffer} source
   * @param {string} fromEncoding
   * @param {string} toEncoding
   * @returns {Buffer}
   */
  transcode = function(source, fromEncoding, toEncoding) {
    // Same encoding
    if (fromEncoding === toEncoding) return source;

    // Transcode
    return toBuffer(source.toString(fromEncoding), toEncoding);
  };
}

// Exit messages
const exitMessages = {
  1: 'Uncaught Fatal Exception',
  3: 'Internal JavaScript Parse Error',
  4: 'Internal JavaScript Evaluation Failure',
  5: 'Fatal Error',
  6: 'Non-function Internal Exception Handler',
  7: 'Internal Exception Handler Run-Time Failure',
  9: 'Invalid Argument',
  10: 'Internal JavaScript Run-Time Failure',
  12: 'Invalid Debug Argument'
};

/**
 * @function isEmpty
 * @description Is object empty
 * @param {Object} object
 * @returns {boolean}
 */
const isEmpty = object => Object.keys(object).length === 0;

/**
 * @function spawn
 * @description Spawn a child process and receive output via a Promise interface.
 * @param {string} command Command to spawn.
 * @param {string[]} args Array of arguments to run command with.
 * @param {string|Buffer} input Input to pass command via stdin.
 * @param {Object} options Spawn configure
 * @returns {Promise} Resolved with buffer of stdout or rejected with error
 */
const spawn = function(command, args, input, options) {
  return new Promise((resolve, reject) => {
    // Options normalize
    options = Object.assign({ encoding: 'utf8', windowsHide: true }, options);

    // Vars
    const stderrOutput = [];
    const encoding = options.encoding;
    const errors = Object.create(null);

    // Delete options encoding
    delete options.encoding;

    // Spawn command
    const child = childProcess.spawn(command, args, options);

    // Capture errors
    child.on('error', error => (errors.spawn = error));
    child.stdin.on('error', error => (errors.stdin = error));
    child.stdout.on('error', error => (errors.stdout = error));
    child.stderr.on('error', error => (errors.stderr = error));
    child.stderr.on('data', data => stderrOutput.push(data));

    // Capture output
    const buffers = [];

    // Capture data
    child.stdout.on('data', data => buffers.push(data));

    // Spawn close
    child.on('close', exitCode => {
      // Exit code not 0
      if (exitCode !== 0) {
        errors.exitMessage = exitMessages[exitCode];
      }

      // Stderr output
      if (stderrOutput.length) {
        errors.process = Buffer.concat(stderrOutput).toString(encoding);
      }

      // Errors not empty
      if (!isEmpty(errors)) {
        // Set exit code
        errors.exitCode = exitCode;

        // Reject error
        return reject(Object.assign(new Error(`Spawn ${command} error`), errors));
      }

      // Resolve data
      return resolve(transcode(Buffer.concat(buffers), encoding, 'utf8'));
    });

    // Send input data
    child.stdin.end(input, encoding);
  });
};

// Exports
module.exports = spawn;
