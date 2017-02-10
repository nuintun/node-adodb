import { stdout, fillRecords } from './utils';

/**
 * ADODB
 */
export var ADODB = {
  execute: function(params) {
    var valid = true;
    var message = 'Execute SQL: ' + params.sql + ' success !';
    var connection = new ActiveXObject('ADODB.Connection');

    try {
      connection.Open(params.connection);
      connection.Execute(params.sql);
    } catch (e) {
      valid = false;
      message = e.message;
    } finally {
      // close database
      connection.Close();
      // free memory
      connection = null;
    }

    // write data
    stdout({
      valid: valid,
      message: message
    });
  },
  executeScalar: function(params) {
    var records;
    var valid = true;
    var message = 'Execute Scalar SQL: ' + params.sql + ' / ' + params.scalar + ' success !';
    var connection = new ActiveXObject('ADODB.Connection');
    var recordset = new ActiveXObject('ADODB.Recordset');

    try {
      // execute
      connection.Open(params.connection);
      connection.Execute(params.sql);

      // scalar
      recordset.Open(params.scalar, connection, 0, 1);
      records = fillRecords(recordset);

      // empty
      if (records.length === 0) {
        message = 'The scalar recordset is empty !';
      }
    } catch (e) {
      valid = false;
      message = e.message;
    } finally {
      // close database
      recordset.Close();
      connection.Close();
      // free memory
      recordset = null;
      connection = null;
    }

    // write data
    stdout({
      valid: valid,
      message: message,
      records: records
    });
  },
  query: function(params) {
    var records;
    var valid = true;
    var message = 'Execute SQL: ' + params.sql + ' success !';
    var connection = new ActiveXObject('ADODB.Connection');
    var recordset = new ActiveXObject('ADODB.Recordset');

    try {
      connection.Open(params.connection);
      recordset.Open(params.sql, connection, 0, 1);
      records = fillRecords(recordset);

      // empty
      if (records.length === 0) {
        message = 'The recordset is empty !';
      }
    } catch (e) {
      valid = false;
      message = e.message;
    } finally {
      // close database
      recordset.Close();
      connection.Close();
      // free memory
      recordset = null;
      connection = null;
    }

    // write data
    stdout({
      valid: valid,
      message: message,
      records: records
    });
  }
};
