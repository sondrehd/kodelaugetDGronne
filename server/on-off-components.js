const dbHelper = require('./db-helper');

function getOnOff(table) {
    return new Promise((resolve) => {
      dbHelper.getValues((rows) => {
        res = rows[0]['ison'];
        console.log('db on: ' + res);
        resolve(res);
      }, table)
    })
}

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

        getOnOff('light').then((res) => {
            console.log('res: ' + res);
            console.log(typeof res);
            console.log('ison: ' + isOn.toString());
            console.log(typeof isOn);
            let isSame = (res == isOn);
            console.log('is same: ' + isSame);
            if (isSame) {
                agent.add('light is already ' + onoff);
                resolve();
            }
            else {
                console.log(onoff + ', ' + isOn);
                setOnOff(isOn, 'light').then(() => {
                    if (isOn) agent.add('Ok, turning light on');
                    else agent.add('Ok, turning light off');
                    resolve();
                });
            }
        })
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