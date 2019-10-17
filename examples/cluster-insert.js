'use strict';

// External lib
const ADODB = require('../'),
  cluster = require('cluster');

// Variable declaration
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=node-adodb.mdb;');

// Execute
async function insertByUserTable(index, count) {
  try {
    let len = 1e4, 
      interval = len / count,
      _index = Math.floor(interval * index),
      _count = Math.ceil(interval * (index + 1))

    for (let i = _index; i < _count; i++) {
      console.log(`第${index}个核心在工作，进度${_count}/${i}`)
      await connection.execute(`INSERT INTO Users(UserName, UserSex, UserBirthday, UserMarried) VALUES ("Bill", ${i}, "1991/3/9", 1)`);
    }

  } catch (error) {
    console.error(error)
  }
}

if (cluster.isMaster) {
  let numCPUs = require('os').cpus().length;

  console.time('插入用时')
  for (let i = 0; i < numCPUs; i++) {
    let worker = cluster.fork();
    worker.on('message', async (msg) => {
      // console.log(msg.cmd)
      await insertByUserTable(i, numCPUs)
    })
  }
  console.timeEnd('插入用时')

} else {
  process.send({ cmd: 'notifyRequest' });
}
