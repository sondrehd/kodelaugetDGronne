const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { WebhookClient } = require('dialogflow-fulfillment');
const dbHelper = require('./db-helper');
const power = require('./power-level');
const navigation = require('./navigation');
const onOffComponents = require('./on-off-components');
const getComponents = require('./get-components');
const socketio = require('socket.io');

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/hawkon.eu/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/hawkon.eu/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/hawkon.eu/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
const httpsServer = https.createServer(credentials, app);

var io = require('socket.io')(httpsServer);
var socket = null;

io.sockets.on('connection', function (newSocket) {
  console.log('A client is connected!');
  socket = newSocket;
  power.setSocket(socket);
  navigation.setSocket(socket);
  onOffComponents.setSocket(socket);

  let levelPromise = power.getPowerLevel();
  let lockPromise = onOffComponents.getLockValue();
  let lightPromise = onOffComponents.getLightValue();
  let speedPromise = getComponents.getSpeed();
  let batteryPromise = getComponents.getBattery();

  Promise.all([levelPromise, batteryPromise, speedPromise, lockPromise, lightPromise]).then(function(values) {
    console.log(values);
    let socketObject = { 
      level: values[0], 
      battery: values[1], 
      speed: values[2], 
      lock: values[3], 
      light: values[4]
    };

    console.log('------');
    console.log('Socket object: ');
    console.log(socketObject);
    console.log('------');

    socket.emit('message', socketObject);
    socket.on('message', (message) => handleSocketMessage(message));
  });
});

function handleSocketMessage(message) {
  console.log("Got a socket message: ", message);
}

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 444');
});

app.get('/', function (req, res) {
  res.send("Hello green world");
});

app.post('/googleHome', function (request, response) {
  const agent = new WebhookClient({ request, response });
  //console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  //console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  console.log('---');

  // Map triggered intents to functions
  let intentMap = new Map();
  console.log('intentmap is set up');
  intentMap.set('Get speed', getComponents.getSpeed);
  intentMap.set('Get battery', getComponents.getBattery);

  intentMap.set('Nav - Start and stop', navigation.startStop);
  intentMap.set('Nav - Time left', navigation.timeLeft);

  intentMap.set('Light - On and off', onOffComponents.lightOnOff);
  intentMap.set('Lock - On and off', onOffComponents.lockOnOff);

  intentMap.set('Set power', power.setPower);
  intentMap.set('Get power', power.getPower);
  agent.handleRequest(intentMap);
  // if (accessController.isAuthorized(req.body.originalRequest.data.user.userId)) {
  //   intentToActionMapper.mapIntentToAction(req.body.result.metadata.intentName, req.body.result.parameters, socket);
  //   var response = JSON.stringify(req.body.result.fulfillment.speech);
  //   res.send(JSON.stringify({ "speech": response, "displayText": req.body.result.metadata.intentName }));
  // }
  // else {
  //   res.send(JSON.stringify({ "speech": "You are not Hakon. Get out!", "displayText": "Failed to call server"}));
  // }
  //response.send(JSON.stringify({ "speech": "You are not Hakon. Get out!", "displayText": "Failed to call server"}));
});


app.get('/getValue', function (req, res) {
  console.log("/getValue");
  dbHelper.getValues((rows) => {
    res.send(rows);
  });
});

app.post('/setValue', function (req, res) {
  console.log("/setValue");
  dbHelper.setValue("hei");
  res.send("done");
});
