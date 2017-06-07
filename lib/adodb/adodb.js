import { stdout, fillRecords } from './utils';

/**
 * Free connection
 *
 * @param {Object} object
 */
function free(object) {
  object.State && object.Close();
}

/**
 * ADODB
 */
export var ADODB = {
  execute: function(params) {
    var recordset;
    var result = { valid: true };
    var scalarMode = !!params.scalar;
    var connection = new ActiveXObject('ADODB.Connection');

    if (scalarMode) {
      recordset = new ActiveXObject('ADODB.Recordset');
      result.message = params.sql + ' / ' + params.scalar + ' success';
    } else {
      result.message = params.sql + ' success';
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
        result.records = fillRecords(recordset);

        // Empty
        if (result.records.length === 0) {
          result.message = 'The scalar recordset is empty';
        }
      }
    } catch (e) {
      result.valid = false;
      result.message = e.message;
    } finally {
      // Close database
      free(connection);

      if (scalarMode) {
        free(recordset);
      }
    }

    // Write data
    stdout(result);
  },
  query: function(params) {
    var connection = new ActiveXObject('ADODB.Connection');
    var recordset = new ActiveXObject('ADODB.Recordset');
    var result = { valid: true, message: params.sql + ' success' };

    // Set CursorLocation
    connection.CursorLocation = 3;

    try {
      // Open
      connection.Open(params.connection);
      // Query
      recordset.Open(params.sql, connection, 0, 1);
      result.records = fillRecords(recordset);

      // Empty
      if (result.records.length === 0) {
        result.message = 'The recordset is empty';
      }
    } catch (e) {
      result.valid = false;
      result.message = e.message;
    } finally {
      // Close database
      free(recordset);
      free(connection);
    }

    // Write data
    stdout(result);
  }
};
