const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { WebhookClient } = require('dialogflow-fulfillment');
// const dbHelper = require('./db-helper');

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
	console.log('HTTPS Server running on port 443');
});

app.get('/', function(req, res){
  res.send("Hello green world");
});

app.post('/googleHome', function(request, response){
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  console.log('---');

  function speedUp(agent) {
    console.log("speeding up");
    agent.add("speeding up!");
  }

  function speedDown(agent) {
    console.log("speeding down");
    agent.add("speeding down!");
  }

  // Map triggered intents to functions
  let intentMap = new Map();
  console.log('intentmap is set up');
  intentMap.set('Speed up', speedUp);
  intentMap.set('Speed down', speedDown);
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


app.get('/sensorData', function(req, res){
  console.log("/sensorData");
});
