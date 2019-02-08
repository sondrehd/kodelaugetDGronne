const dbHelper = require('./db-helper');

function getAssistanceLevel() {
    console.log('getting assistance level');
    return new Promise((resolve) => {
      dbHelper.getValues((rows) => {
        res = rows[0]['assistancelevel'];
        console.log('db assistance level: ' + res);
        resolve(res);
      }, 'level')
    })
}

function setAssistanceLevel(level) {
    return new Promise((resolve) => {
        dbHelper.updateValue(() => {
        console.log('setting assistance level ' + level);
        resolve();
        }, 'level', "assistancelevel='" + level + "'", 'id=1');
    })
}

function setAssistance(agent) {
    return new Promise((resolve) => {
        const level = agent.parameters.assistanceLevel;
        const levels = ['off', 'low', 'medium', 'high'];
        let getAssistanceLevelPromise = getAssistanceLevel();


        getAssistanceLevelPromise.then((currentLevel) => {
        console.log('current assistanceLevel is ' + currentLevel);
        let i = levels.indexOf(currentLevel);
        if (i === -1) {
            agent.add('Error reading assistance level from database');
            resolve();
        }
        // Index is valid
        if (level === 'down') {
            let newLevelIndex = i-1;
            if (newLevelIndex < 0) {
            agent.add('Assistance is already turned off')
            resolve();
            }
            else {
            let newLevel = levels[newLevelIndex];
            if (newLevel === 'off') agent.add('Turning assistance off');
            else agent.add('Turning assistance level down to ' + newLevel);
            setAssistanceLevel(newLevel).then(() => resolve()) 
            }
        }
        else if (level === 'up') {
            console.log('up');
            if (currentLevel === 'high') {
            agent.add('Sorry, you can not get more assistance. Assistance level is already high');
            resolve();
            }
            else {
            let newLevel = levels[levels.indexOf(currentLevel)+1]
            console.log('new level: ' + newLevel);
            agent.add('Turning assistance level up to ' + newLevel);
            setAssistanceLevel(newLevel).then(() => resolve());
            }
        }
        else if (currentLevel === level) {
            agent.add('Assistance level is already set to ' + level);
            resolve();
        }
        else {
            setAssistanceLevel(level).then(() => {
            if (level === 'off') agent.add('Your assistance is turned off');
            else agent.add('Your assistance level is updated to ' + level);
            console.log('Your assistance level is updated to ' + level);
            resolve();
            });
        }
        })
    })
}

function getAssistance(agent) {
    return new Promise((resolve) => {
        // use help function instead
        dbHelper.getValues((rows) => {
        console.log(rows);
        res = rows[0]['assistancelevel'];
        if (res === 'off') agent.add('Your assistance is stopped')
        else agent.add('Your assistance level is ' + res);
        resolve();
        }, 'level')
    })
}

module.exports = {
    getAssistance,
    setAssistance
}

