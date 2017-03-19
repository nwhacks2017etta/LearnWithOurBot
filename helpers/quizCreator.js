const FACEBOOK_ACCESS_TOKEN = 'EAAgxPAHgXhQBADezB6dYP4U98LPYiVZCWtXCzjbhuaQpLmImyaoZAWF30qoQZCl3tc7Y7qyANruVrVWh2l39rBMOPwq69yrOoOlowNk7dS8ADurdN66LqNK5BPrtusIZA0ocA1ZAigFu4CB40p4YSgGahTNsBNbbYc3ZA0L20oGAZDZD';

const request = require('request');
var quizModel = require("../Models/quiz.js");

var questionModel = require("../Models/question.js");

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
quizQuestions.orderByKey().on("child_added", function(snapshot) {
  console.log(snapshot.key);
  console.log(snapshot.value);
});


module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    var familiarLevel;
    //familiarity level
    quizTakers.orderByKey().on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            if(data.key == senderId){
                var familiarLevel = data.val();
            }
        });

        //it doesn't exist in the database
        //we can add a new value later?
        if(!familiarLevel){
            familiarLevel = 0;
        }
        

    var questionList = [];

};