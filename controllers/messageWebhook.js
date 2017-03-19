const processMessage = require('../helpers/processMessage');
const youtubeMessage = require('../helpers/youtubeVideo');

module.exports = (req, res) => {
    if(req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                //format is search {videoname}
                var keyword = event.message.text.split(" ")[0];
                
                if(keyword == "search"){
                    console.log("here");
                    youtubeMessage(event);
                }
            //    if(event.message && event.message.text) {
            //        processMessage(event);
            //    }
            });
        });   

        res.status(200).end();
    }
};
