const dbHelper = require('./db-helper');

// function getOnOff(table) {
//     return new Promise((resolve) => {
//       dbHelper.getValues((rows) => {
//         res = rows[0]['on'];
//         console.log('db on: ' + res);
//         resolve(res);
//       }, table)
//     })
// }

function setOnOff(isOn, table) {
    return new Promise((resolve) => {
        dbHelper.updateValue(() => {
            console.log('setting on ' + isOn);
            resolve();
        }, table, "ison=" + isOn, 'id=1');
    })
}

function lightOnOff(agent) {
    return new Promise((resolve) => {
        console.log('start light onoff');
        const onoff = agent.parameters.onoff;
        let isOn = (onoff === 'on');
        console.log(onoff + ', ' + isOn);
        setOnOff(isOn, 'light').then(() => {
            if (isOn) agent.add('Light is on');
            else agent.add('Light is off');
            resolve();
        });
    })
}

function lockOnOff(agent) {
    return new Promise((resolve) => {
        console.log('start lock onoff');
        const onoff = agent.parameters.onoff;
        let isOn = (onoff === 'on');
        console.log(onoff + ', ' + isOn);
        setOnOff(isOn, 'lock').then(() => {
            if (isOn) agent.add('Bike is locked');
            else agent.add('Bike is unlocked');
            resolve();
        });
    })
}

module.exports = {
    lightOnOff,
    lockOnOff
}