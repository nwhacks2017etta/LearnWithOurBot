const processMessage = require('../helpers/processMessage');
const youtubeMessage = require('../helpers/youtubeVideo');

module.exports = (req, res) => {
    if(req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                if(event.message && event.message.text) {
                var keyword = event.message.text.split(" ")[0];
                
                if(keyword == "search"){
                    youtubeMessage(event);
                }
               else {
                   processMessage(event);
               }
                }
            });
        });   

        res.status(200).end();
    }
};
