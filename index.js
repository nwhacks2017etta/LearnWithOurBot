const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(9010, () => console.log('Webhook server is listening, port 9010'));

app.get('/', verificationController);
app.post('/', messageWebhookController);