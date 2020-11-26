/**
 * @module adodb
 * @license MIT
 * @version 2017/11/09
 */

import { free, stdout, stdoutError, fillRecords } from './utils';

/**
 * @namespace ADODB
 */
export var ADODB = {
  /**
   * @method execute
   * @param {Object} params
   * @returns {Array}
   */
  execute: function(params) {
    var recordset;
    var result = [];
    var scalarMode = !!params.scalar;
    var connection = new ActiveXObject('ADODB.Connection');

    if (scalarMode) {
      recordset = new ActiveXObject('ADODB.Recordset');
    }

    // Set CursorLocation
    connection.CursorLocation = 3;

    try {
      // Open
      connection.Open(params.connection);
      // Execute
      connection.Execute(params.sql);

      // Scalar
      if (scalarMode) {
        recordset.Open(params.scalar, connection, 0, 1);

        // fill records
        result = fillRecords(recordset);
      }

      // Write data
      stdout(result);
    } catch (error) {
      stdoutError(error);
    }

    // Close database
    free(connection);
    scalarMode && free(recordset);
  },
   /**
   * @method transaction
   * @param {Object} params
   * @returns {Array}
   */
  transaction: function(params) {
    var connection = new ActiveXObject('ADODB.Connection');

    // Set CursorLocation
    connection.CursorLocation = 3;

    try {
      // Open
      connection.Open(params.connection);
      connection.BeginTrans();
      // Execute
      for (i = 0; i < params.sql.length; i++)
        connection.Execute(params.sql[i]);

    } catch (error) {
      connection.RollbackTrans(),
      stdoutError(error);
    }
    connection.CommitTrans();
    stdout([]);
    // Close database
    free(connection);
  },
  /**
   * @method query
   * @param {Object} params
   * @returns {Array}
   */
  query: function(params) {
    var connection = new ActiveXObject('ADODB.Connection');
    var recordset = new ActiveXObject('ADODB.Recordset');

    // Set CursorLocation
    connection.CursorLocation = 3;

    try {
      // Open
      connection.Open(params.connection);
      // Query
      recordset.Open(params.sql, connection, 0, 1);

      // Write data
      stdout(fillRecords(recordset));
    } catch (error) {
      stdoutError(error);
    }

    // Close database
    free(recordset);
    free(connection);
  },
  /**
   * @method schema
   * @param {Object} params
   * @returns {Array}
   */
  schema: function(params) {
    var recordset;
    var connection = new ActiveXObject('ADODB.Connection');

    // Set CursorLocation
    connection.CursorLocation = 3;

    try {
      // Open
      connection.Open(params.connection);

      // OpenSchema
      if (params.hasOwnProperty('id')) {
        recordset = connection.OpenSchema(params.type, params.criteria, params.id);
      } else if (params.hasOwnProperty('criteria')) {
        recordset = connection.OpenSchema(params.type, params.criteria);
      } else {
        recordset = connection.OpenSchema(params.type);
      }

      // Write data
      stdout(fillRecords(recordset));
    } catch (error) {
      stdoutError(error);
    }

    // Close database
    free(recordset);
    free(connection);
  }
};
