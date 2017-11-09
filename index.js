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
    const connection = this.connection;

    return proxy.exec('schema', { connection, type, criteria, id });
  }
}

module.exports = {
  open: (connection) => {
    return new ADODB(connection);
  }
};
