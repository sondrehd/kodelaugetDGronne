const dbHelper = require('./db-helper');

function getSpeed(agent = null) {
    return new Promise((resolve) => {
      let output = 'Your speed is ';
      dbHelper.getValues((rows) => {
        let latest = rows[0];
        console.log(rows);
        output += latest['speed'];
        output += ' kilometre per hour';
        if (agent != null) agent.add(output);
        resolve(latest['speed']);
      }, 'speed')
    })
}

function getBattery(agent = null) {
    return new Promise((resolve) => {
      let output = 'Your battery level is ';
      dbHelper.getValues((rows) => {
        console.log(rows);
        let batteryPercent = rows[0]['batterylevel'];
        output += batteryPercent;
        output += ' percent';
        if (agent != null) agent.add(output);
        resolve(batteryPercent);
      }, 'battery')
    })
}

module.exports = {
    getSpeed,
    getBattery,
}