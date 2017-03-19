const FACEBOOK_ACCESS_TOKEN = 'EAADNbvWjXEkBAKKNADN9abtlNDiY5jbwlwANCcVfHjGIrHqb4LzlfWPNouwolvMzPIZBSefr8udQkMZC33Fyt3PgDBa5DEhtZBA7SFWT00qyTZAarNrCLJBLC6sH7H2pYpa8bPAQ3bVeJaiuzOJVB5CEIUE21HU4tZAK5BSSG2wZDZD';
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

            quizQuestions.child(1).child("answer").on("value", function(snapshot) {
    answer = snapshot.val();
    console.log(answer);
    });
      quizQuestions.child(1).child("question").on("value", function(snapshot) {
    question = snapshot.val();
    console.log(question);
    quizQuestions.child(1).child("option").on("value", function(snapshot) {
    option = snapshot.val();
    console.log(option);
    var title1 = !!option[0];
    var title2 = !!option[1];
      request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            json: {
                recipient: { id: senderId },
                 "message":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": question,
"buttons":[
          {
            "type":"web_url",
            "url":"https://google.com",
            "title": "true"
          },
          {
            "type":"postback",
            "title": "false",
            "payload":"USER_DEFINED_PAYLOAD"
          }
        ]
      }
    }
                 }
            }
        });
  });


  });

});
}