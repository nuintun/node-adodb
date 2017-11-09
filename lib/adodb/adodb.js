import { stdout, stderr, fillRecords } from './utils';

/**
 * Free connection
 *
 * @param {Object} connection
 */
function free(connection) {
  connection.State && connection.Close();
}

/**
 * ADODB
 */
export var ADODB = {
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
    } catch (e) {
      stderr(e);
    }

    // Close database
    free(connection);
    scalarMode && free(recordset);
  },
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
    } catch (e) {
      stderr(e);
    }

    // Close database
    free(recordset);
    free(connection);
  },
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
    } catch (e) {
      stderr(e);
    }

    // Close database
    free(recordset);
    free(connection);
  }
};
