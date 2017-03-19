const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
var port = process.env.port || 9010

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log('Webhook server is listening, port '+port));

app.get('/', verificationController);
app.post('/', messageWebhookController);