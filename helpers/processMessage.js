
const FACEBOOK_ACCESS_TOKEN = 'EAADNbvWjXEkBAFyEwucaBAr8lZB2WQ0nryu3WrQ3lNWNG7BNFfWmpdk8iFsmwS2n9isGeS9JuYGGBpC5zOSOAR5V45eaSQgqhuDbBOnnAyQEi2m1DJ50AWZAveltFOsSH0ndZAwUmzHHpAZBXLvaSsuF9P4QVGgPDcVjpqJ1WQZDZD';

const DOGE_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg';

const request = require('request');

const API_AI_TOKEN = '9eca60c7c53247178def79d5099a304c';
const apiAiCLient = require('apiai')(API_AI_TOKEN);


module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiCLient.textRequest(message, {sessionId: 'learnwithourbot'});

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;

        sendTextMessage(senderId, result);
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};


const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text }
        }
    });
}