const dbHelper = require('./db-helper');

function getPowerLevel() {
    console.log('getting power level');
    return new Promise((resolve) => {
      dbHelper.getValues((rows) => {
        res = rows[0]['powerlevel'];
        console.log('db power level: ' + res);
        resolve(res);
      }, 'level')
    })
}

function setPowerLevel(level) {
    return new Promise((resolve) => {
        dbHelper.updateValue(() => {
        console.log('setting power level ' + level);
        resolve();
        }, 'level', "powerlevel='" + level + "'", 'id=1');
    })
}

function setPower(agent) {
    return new Promise((resolve) => {
        const level = agent.parameters.powerLevel;
        const levels = ['off', 'low', 'medium', 'high'];

        getPowerLevel().then((currentLevel) => {
        console.log('current power is ' + currentLevel);
        let i = levels.indexOf(currentLevel);
        if (i === -1) {
            agent.add('Error reading power level from database');
            resolve();
        }
        // Index is valid
        if (level === 'down') {
            let newLevelIndex = i-1;
            if (newLevelIndex < 0) {
            agent.add('Power is already turned off')
            resolve();
            }
            else {
            let newLevel = levels[newLevelIndex];
            if (newLevel === 'off') agent.add('Turning power off');
            else agent.add('Turning power down to ' + newLevel);
            setPowerLevel(newLevel).then(() => resolve()) 
            }
        }
        else if (level === 'up') {
            console.log('up');
            if (currentLevel === 'high') {
            agent.add('Sorry, you can not get more bike assistance. Power is already high');
            resolve();
            }
            else {
            let newLevel = levels[levels.indexOf(currentLevel)+1]
            console.log('new level: ' + newLevel);
            agent.add('Turning power level up to ' + newLevel);
            setPowerLevel(newLevel).then(() => resolve());
            }
        }
        else if (currentLevel === level) {
            agent.add('Power level is already set to ' + level);
            resolve();
        }
        else {
            setPowerLevel(level).then(() => {
            if (level === 'off') agent.add('Your power is turned off');
            else agent.add('Your power level is updated to ' + level);
            console.log('Your power level is updated to ' + level);
            resolve();
            });
        }
        })
    })
}

function getPower(agent) {
    return new Promise((resolve) => {
        // use help function instead
        dbHelper.getValues((rows) => {
        console.log(rows);
        res = rows[0]['powerlevel'];
        if (res === 'off') agent.add('Your power is stopped')
        else agent.add('Your power level is ' + res);
        resolve();
        }, 'level')
    })
}

module.exports = {
    getPower,
    setPower
}

