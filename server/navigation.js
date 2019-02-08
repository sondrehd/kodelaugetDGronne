const dbHelper = require('./db-helper');

function startStop(agent) {
    return new Promise((resolve) => {
        const startStop = agent.parameters.startstop;
        const destination = agent.parameters.destination;

        console.log(startStop);
        console.log(destination);

        if (startStop === 'stop') {
            agent.add('Stopping navigation');
            // Todo: Do some more 'stop' magic
        }
        else if (destination != undefined) {
            agent.add('Starting navigation towards your ' + destination);
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
    timeLeft
}