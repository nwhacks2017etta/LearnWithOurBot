const processMessage = require('../helpers/processMessage');
const quizGenerator = require('../helpers/quizGenerator');

module.exports = (req, res) => {
    if(req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {

                var keyword = event.message.text.split(" ")[0];

                if (keyword == "quiz") {
                    quizGenerator(event);
                }
                else if(event.message && event.message.text) {
                    processMessage(event);
                }
            });
        });   

        res.status(200).end();
    }
};
