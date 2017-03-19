const FACEBOOK_ACCESS_TOKEN = 'EAADNbvWjXEkBAKKNADN9abtlNDiY5jbwlwANCcVfHjGIrHqb4LzlfWPNouwolvMzPIZBSefr8udQkMZC33Fyt3PgDBa5DEhtZBA7SFWT00qyTZAarNrCLJBLC6sH7H2pYpa8bPAQ3bVeJaiuzOJVB5CEIUE21HU4tZAK5BSSG2wZDZD';
const DOGE_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg';
const watchYoutubeUrl = "https://www.youtube.com/watch?v=";

const request = require('request');
const YouTube = require('youtube-node');

var youTube = new YouTube();

youTube.setKey('AIzaSyCP0JVGJYBjDA0xtUBZHQihEQmSoeWBePs');

var youtubeReadModel;
var youtubeItemList;
var videoId = "";

//youtube templates
var l1Title;
var l1ImageUrl;
var l1ActionUrl;


module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text.replace("search", "");
    var data;
    youTube.search(message, 3, function (error, result) {
        if (error) {
            console.log(error);
        }
        else {
            data = JSON.stringify(result, null, 2);
            console.log(data);
            youtubeReadModel = result;
            youtubeItemList = youtubeReadModel.items;
            if (youtubeItemList.length > 0) {
                for (var item in youtubeItemList) {
                    var youtubeItem = youtubeItemList[item];
                    if (youtubeItem.id.kind == "youtube#video") {
                        videoId = youtubeItem.id.videoId;
                        break;
                    }
                }
            }
        }
    });

    // var yout_url = watchYoutubeUrl + videoId;
    // console.log(yout_url);
    // if (yout_url) {
    // console.log(yout_url);


//We only want 2 templates

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            "message": {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "list",
                        "elements": [
                            {
                                "title": "Classic T-Shirt Collection",
                                "image_url": DOGE_IMAGE_URL,
                                // "default_action": {
                                //     "type": "web_url",
                                //     "url": "https://peterssendreceiveapp.ngrok.io/shop_collection",
                                //     "messenger_extensions": true,
                                //     "webview_height_ratio": "tall",
                                // }
                            },
                            {
                                "title": "Classic White T-Shirt",
                                "image_url": DOGE_IMAGE_URL,
                                "subtitle": "100% Cotton, 200% Comfortable",
                                // "default_action": {
                                //     "type": "web_url",
                                //     "url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
                                //     "messenger_extensions": true,
                                //     "webview_height_ratio": "tall",
                                //     "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                // }
                            },
                            {
                                "title": "Classic White T-Shirt",
                                "image_url": DOGE_IMAGE_URL,
                                "subtitle": "100% Cotton, 200% Comfortable",
                                // "default_action": {
                                //     "type": "web_url",
                                //     "url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
                                //     "messenger_extensions": true,
                                //     "webview_height_ratio": "tall",
                                //     "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                                // }
                            }
                        ]
                    }
                }
            }
        }
    });

};