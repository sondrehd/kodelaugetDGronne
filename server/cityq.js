const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { WebhookClient } = require('dialogflow-fulfillment');
const dbHelper = require('./db-helper');

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

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 444');
});

app.get('/', function(req, res){
  res.send("Hello green world");
});

app.post('/googleHome', function(request, response){
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  console.log('---');

  function setAssistance(agent) {
    const level = agent.parameters.assistanceLevel;
    return new Promise((resolve) => {
      console.log('start update');
      dbHelper.updateValue(() => {
        agent.add('Your assistance level is updated to ' + level);
        console.log('Your assistance level is updated to ' + level);
        resolve();
      }, 'level', "assistancelevel='" + level + "'", 'id=1');
    })
  }

  function getAssistance(agent) {
    return new Promise((resolve) => {
      let output = 'Your assistance level is ';
      dbHelper.getValues((rows) => {
        console.log(rows);
        output += rows[0]['assistancelevel'];
        agent.add(output);
        resolve();
      }, 'level')
    })
  }

  function getSpeed(agent) {
    return new Promise((resolve) => {
      let output = 'Your speed is ';
      dbHelper.getValues((rows) => {
        let latest = rows[0];
        console.log(rows);
        output += latest['speed'];
        output += ' kilometre per hour';
        agent.add(output);
        resolve();
      }, 'speed')
    })
  }

  // Map triggered intents to functions
  let intentMap = new Map();
  console.log('intentmap is set up');
  intentMap.set('Get speed', getSpeed);
  intentMap.set('Set assistance', setAssistance);
  intentMap.set('Get assistance', getAssistance);
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


app.get('/getValue', function(req, res){
  console.log("/getValue");
  dbHelper.getValues((rows) => {
    res.send(rows);
  });
});

app.post('/setValue', function(req, res){
  console.log("/setValue");
  dbHelper.setValue("hei");
  res.send("done");
});
