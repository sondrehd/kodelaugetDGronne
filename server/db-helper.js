const { Client } = require('pg');
const postgresSecrets = require('./secrets/postgres-secrets');

clientConnected = false;

const client = getNewClient();
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('Connected to db');
    clientConnected = true;
  }
});

function getNewClient() {
  return new Client(postgresSecrets.dbConfig);
}

function updateValue(callback, table, value, where) {
  const sql =
    'UPDATE ' + table + ' SET ' + value + ' WHERE ' + where;
  if (clientConnected) {
    try {
      client.query(sql);
      callback();
    } catch (e) {
      console.log(`error ${e.stack}`);
    }
  }
}

function setValue(value, table = 'cityq') {
  const sql =
    'INSERT INTO ' + table + '(value1) ' + 'VALUES ($1)';
  if (clientConnected) {
    try {
      client.query(sql, [value]);
    } catch (e) {
      console.log(`error ${e.stack}`);
    }
  }
}

function getValues(callback, table = 'cityq') {
  const sql = 'SELECT * FROM ' + table;
  let results;
  if (clientConnected) {
    try {
      client.query(sql, (err, res) => {
        callback(res.rows);
      });
    } catch (e) {
      console.error(e.stack);
    }
    return results;
  }
}

module.exports = {
  setValue,
  getValues,
  updateValue
};
