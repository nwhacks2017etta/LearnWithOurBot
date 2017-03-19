const FACEBOOK_ACCESS_TOKEN = 'EAAgxPAHgXhQBADezB6dYP4U98LPYiVZCWtXCzjbhuaQpLmImyaoZAWF30qoQZCl3tc7Y7qyANruVrVWh2l39rBMOPwq69yrOoOlowNk7dS8ADurdN66LqNK5BPrtusIZA0ocA1ZAigFu4CB40p4YSgGahTNsBNbbYc3ZA0L20oGAZDZD';

const request = require('request');

class Topic {
    learningGoals = [];
}

// learning goals for each topic - these are just identifiers
var topics = {"default":{"learningGoals":["A1","A2"]}}

class QuizState {
    familiarity = [];

    constructor(topic, name) {
        this.topic = topic;
        this.name = name;
        for (var i = 0; i < topic.learningGoals.length; i++) {
            this.familiarity.push(0);
        }
    }

    // get the next learning goal to quiz on
    getLearningGoal() {
        for (var i = 0; i < this.topic.learningGoals.length; i++) {
            if (this.familiarity[i] < 100) {
                return this.topic.learningGoals[i];
            }
        }
        return null;
    }
}

var idQuizMap = {}

function generateQuestion(learningGoal) {
    return {"text":"Respond true to this question",
        options:["True","False"]}
}

module.exports = (event) => {
    const senderId = event.sender.id;
    var quizName = "default";
    if (!idQuizMap[senderId]) {
        idQuizMap[senderId] = new QuizState(topics[quizname], quizname)
    }
    var question = generateQuestion(idQuizMap[senderId].getLearningGoal());

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            "message": {
                "attachment":{
                    "type":"template",
                    "payload":{
                        "template_type":"button",
                        "text":"What do you want to do next?",
                        "buttons":[
                            {
                                "type":"web_url",
                                "url":"http://www.example.com",
                                "title":"Show Website"
                            },
                            {
                                "type":"postback",
                                "title":"Start Chatting",
                                "payload":"USER_DEFINED_PAYLOAD"
                            }
                        ]
                    }
                }
            }
        }
    });

};