const Room = require('../models/Room');
const roomsApi = require('../utils/rooms-api');

module.exports = {
    getAllRooms: function (agent) {
        return new Promise((resolve) => {
          roomsApi.getRooms().then((response) => {
            let output = 'Her kommer en oversikt over alle rom:';
            response.forEach(r => {
              var obj = new Room(r);
              output += ' ' + obj.roomName + ', ';
            });
            agent.add(output);
            resolve();
          }).catch((error) => {
            if (error['code'] === 'ENOTFOUND') {
              agent.add('Beklager, et nettverksproblem med rom-APIet oppstod.')
            }
            else {
              agent.add('Beklager, en ukjent feil oppstod ved henting av alle rom.');
            }
            resolve(error);
          });
        })
      },
    
      capitalizeFirstLetter: function (string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
      },
    
      availableRoom: function (agent) {
        const room = agent.parameters.room;
        if (room !== undefined) {
          return new Promise((resolve, reject) => {
            roomsApi.getRooms().then((response) => {
              response.forEach(r => {
                var obj = new Room(r);
                if (obj.roomName.toLowerCase() === room) {
                  var availableBusy = (obj.isBusy) ? "dessverre opptatt" : "ledig";
                  agent.add(capitalizeFirstLetter(room) + ' (' + obj.roomCode + ')' + ' er ' + availableBusy + ' nå');
                }
              });
              resolve();
            }).catch(() => {
              agent.add('En feil oppstod');
              resolve();
            });
          })
        }
        // This will never occur because room is a required parameter for the intent
        else {
          agent.add('Beklager, jeg forstår ikke hvilket rom du spør om. Her kommer et eksempel: "Er Nettet ledig?" ')
        }
      },

      sendMap: function (agent) {
        const room = agent.parameters.room;
        agent.add(
          `Her er et bilde av '${room}' `,
          new Image('https://avatars1.githubusercontent.com/u/36980416')
        )
      }
}