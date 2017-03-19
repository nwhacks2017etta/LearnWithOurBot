const FACEBOOK_ACCESS_TOKEN = 'EAAgxPAHgXhQBADezB6dYP4U98LPYiVZCWtXCzjbhuaQpLmImyaoZAWF30qoQZCl3tc7Y7qyANruVrVWh2l39rBMOPwq69yrOoOlowNk7dS8ADurdN66LqNK5BPrtusIZA0ocA1ZAigFu4CB40p4YSgGahTNsBNbbYc3ZA0L20oGAZDZD';

const request = require('request');
var Quiz = require("../Models/quiz.js");

var Question = require("../Models/question.js");

var firebase = require('firebase');
console.log("here2");
var config = {
    apiKey: "AIzaSyANOaPwVpPo8K98zKEk5DPyvSf8632HiXc",
    authDomain: "learnwithourbot.firebaseapp.com",
    databaseURL: "https://learnwithourbot.firebaseio.com",
};

firebase.initializeApp(config);

var ref = firebase.app().database().ref();

 //need to get the familiarity of the user
var quizTakers = firebase.app().database().ref("QuizTakers");
quizTakers.orderByKey().on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key + " dinosaur's score is " + data.val());
  });
});

 //need to get the question list
var quizQuestions = firebase.app().database().ref("QuizQuestions");
quizQuestions.child(1).child("option").on("value", function(snapshot) {
    console.log("The " + snapshot.key + " dinosaur's score is " + snapshot.val());
  });


module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    var familiarLevel;
    var questionList = [];
    //familiarity level
    quizTakers.orderByKey().on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            if(data.key == senderId){
                var familiarLevel = data.val();
            }
        });

        //it doesn't exist in the database
        //we can add a new value later?
        //assume familiarity level is bounded by the number of questions
        if(!familiarLevel){
            familiarLevel = 3;
        }

        var answer;
        var question;
        var option = [];
         var newQuestion = new Question(question, option, answer);
        for(var i = 1; i <= familiarLevel; i++ ){
            console.log(i);
            quizQuestions.child(i).child("answer").on("value", function(snapshot) {
    answer = snapshot.val();
    console.log(answer);
  });
  quizQuestions.child(i).child("question").on("value", function(snapshot) {
    question = snapshot.val();
    console.log(question);
  });
quizQuestions.child(i).child("option").on("value", function(snapshot) {
    option = snapshot.val();
    console.log(option);
  });
  var newQuestion = new Question(question, option, answer);
  console.log(newQuestion);
  questionList.push(newQuestion);
        }
console.log(questionList.length +"new");
for(var q in questionList){
    console.log(q.question);
    console.log(q.option);
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
                            "text":q.question,
                            "buttons":q.option
                        }
                    }
                }
            }
        });
}

});
}