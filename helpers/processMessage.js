const FACEBOOK_ACCESS_TOKEN = 'EAADNbvWjXEkBAFyEwucaBAr8lZB2WQ0nryu3WrQ3lNWNG7BNFfWmpdk8iFsmwS2n9isGeS9JuYGGBpC5zOSOAR5V45eaSQgqhuDbBOnnAyQEi2m1DJ50AWZAveltFOsSH0ndZAwUmzHHpAZBXLvaSsuF9P4QVGgPDcVjpqJ1WQZDZD';
const DOGE_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg';

const request = require('request');

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: DOGE_IMAGE_URL}
                }
            }
        }
    });
};