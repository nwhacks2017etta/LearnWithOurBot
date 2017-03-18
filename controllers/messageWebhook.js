const processMesage = require('../helpers/processMessage');

module.exports = (req, res) => {
    if(req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                if(event.message && event.message.text) {
                    processMessage(Event);
                }
            });
        });

        res.status(200).end();
    }
}