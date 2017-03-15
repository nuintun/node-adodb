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
    var valid = true;
    var message = params.sql + ' success';
    var connection = new ActiveXObject('ADODB.Connection');

    // Set CursorLocation
    connection.CursorLocation = 3;

    try {
      // Open
      connection.Open(params.connection);
      // Execute
      connection.Execute(params.sql);
    } catch (e) {
      valid = false;
      message = e.message;
    } finally {
      // Close database
      free(connection);
    }

    // Write data
    stdout({
      valid: valid,
      message: message
    });
  },
  scalar: function(params) {
    var records;
    var valid = true;
    var message = params.sql + ' / ' + params.scalar + ' success';
    var connection = new ActiveXObject('ADODB.Connection');
    var recordset = new ActiveXObject('ADODB.Recordset');

    // Set CursorLocation
    connection.CursorLocation = 3;

    try {
      // Open
      connection.Open(params.connection);
      // Execute
      connection.Execute(params.sql);
      // Scalar
      recordset.Open(params.scalar, connection, 0, 1);
      records = fillRecords(recordset);

      // Empty
      if (records.length === 0) {
        message = 'The scalar recordset is empty';
      }
    } catch (e) {
      valid = false;
      message = e.message;
    } finally {
      // Close database
      free(recordset);
      free(connection);
    }

    // Write data
    stdout({
      valid: valid,
      message: message,
      records: records
    });
  },
  query: function(params) {
    var records;
    var valid = true;
    var message = params.sql + ' success';
    var connection = new ActiveXObject('ADODB.Connection');
    var recordset = new ActiveXObject('ADODB.Recordset');

    // Set CursorLocation
    connection.CursorLocation = 3;

    try {
      // Open
      connection.Open(params.connection);
      // Query
      recordset.Open(params.sql, connection, 0, 1);
      records = fillRecords(recordset);

      // Empty
      if (records.length === 0) {
        message = 'The recordset is empty';
      }
    } catch (e) {
      valid = false;
      message = e.message;
    } finally {
      // Close database
      free(recordset);
      free(connection);
    }

    // Write data
    stdout({
      valid: valid,
      message: message,
      records: records
    });
  }
};
