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

function setValue(value) {
  const sql =
    'INSERT INTO cityq(value1) ' + 'VALUES ($1)';

  if (clientConnected) {
    try {
      client.query(sql, [value]);
    } catch (e) {
      console.log(`error ${e.stack}`);
    }
  }
}

function getValues(callback) {
  const sql = 'SELECT * FROM cityq';

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
  getValues
};
