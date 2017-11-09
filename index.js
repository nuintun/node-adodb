/**
 * @module index
 * @license MIT
 * @version 2017/11/09
 */

'use strict';

const utils = require('./lib/utils');
const proxy = require('./lib/proxy');

class ADODB {
  constructor(connection) {
    this.connection = connection;
  }

  execute(sql, scalar) {
    const connection = this.connection;
    const params = { connection, sql };

    if (utils.isString(scalar)) {
      params.scalar = scalar;
    }

    return proxy.exec('execute', params);
  }

  query(sql) {
    const connection = this.connection;

    return proxy.exec('query', { connection, sql });
  }

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

module.exports = {
  open: (connection) => {
    return new ADODB(connection);
  }
};
