const FACEBOOK_ACCESS_TOKEN = 'EAAgxPAHgXhQBAO5I7vOl7HJHRVBgcd18pwRBAzgEspLHkFQ6mzRTU1GKqZA7kvHQNTVD8ZAPjsxnWWzeU0ZAa83pa3KqctYmZAPD7P3EF62GVWsQFcvP28Fo72IyJ7cQS8t5oMSGgcmxf8UY0PZBW7CqLIxaEQfn4AE6xKhQTCQZDZD';
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