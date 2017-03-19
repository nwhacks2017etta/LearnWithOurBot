const processMessage = require('../helpers/processMessage');
const quizGenerator = require('../helpers/quizGenerator');
const youtubeMessage = require('../helpers/youtubeVideo');

module.exports = (req, res) => {
    if(req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {

                if (event.postback) {
                    quizGenerator.handlePostback(event);
                } else {

                    var keyword = event.message.text.split(" ")[0];

                    if (keyword == "search") {
                        youtubeMessage(event);
                    } else if (keyword == "quiz") {
                        quizGenerator.handleQuiz(event);
                    } else if(event.message && event.message.text) {
                        processMessage(event);
                    }

                }
            });
        });   

        res.status(200).end();
    }
};
