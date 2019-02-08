const dbHelper = require('./db-helper');
var socket = null;

function setSocket(newSocket) {
    socket = newSocket;
}

function startStop(agent) {
    return new Promise((resolve) => {
        const onoff = agent.parameters.onoff;
        const destination = agent.parameters.destination;

        console.log(onoff);
        console.log(destination);

        if (onoff === 'off') {
            agent.add('Stopping navigation');
            // Todo: Do some more 'stop' magic
        }
        else if (destination === '') {
            agent.add('Please select a destination');
        }
        else {
            agent.add('Starting navigation towards your ' + destination);
            if (socket) {
                console.log("emmiting message");
                socket.emit('message', { 'nav': destination });
            }
            // Todo: Do some more 'start' magic
        }
        resolve();
    })
}

function timeLeft(agent) {
    return new Promise((resolve) => {

    })
}

module.exports = {
    startStop,
    timeLeft,
    setSocket
}