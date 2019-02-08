const dbHelper = require('./db-helper');
var socket = null;

function setSocket(newSocket) {
    socket = newSocket;
}

function getOnOff(table) {
    return new Promise((resolve) => {
      dbHelper.getValues((rows) => {
        res = rows[0]['ison'];
        console.log('db on: ' + res);
        resolve(res);
      }, table)
    })
}

function getLightValue() {
    return getOnOff('light');
}

function getLockValue() {
    return getOnOff('lock');
}

function setOnOff(isOn, table) {
    return new Promise((resolve) => {
        dbHelper.updateValue(() => {
            if (socket) {
                console.log("emmiting message");
                socket.emit('message', {[table]: isOn });
            }
            resolve();
        }, table, "ison=" + isOn, 'id=1');
    })
}

function lightOnOff(agent) {
    return new Promise((resolve) => {
        const onoff = agent.parameters.onoff;
        let isOn = (onoff === 'on');
        getOnOff('light').then((res) => {
            let isSame = (res == isOn);
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
        const onoff = agent.parameters.onoff;
        let isOn = (onoff === 'on');
        getOnOff('lock').then((res) => {
            let isSame = (res == isOn);
            if (isSame) {
                if (isOn) agent.add('Bike is already locked');
                else agent.add('Bike is already unlocked. Ready to go!');
                resolve();
            }
            else {
                console.log(onoff + ', ' + isOn);
                setOnOff(isOn, 'lock').then(() => {
                    if (isOn) agent.add('Ok, locking bike');
                    else agent.add('Ok, unlocking bike');
                    resolve();
                });
            }
        })
    })
}

module.exports = {
    lightOnOff,
    lockOnOff,
    setSocket,
    getLightValue,
    getLockValue
}