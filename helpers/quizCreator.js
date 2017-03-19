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
ref.once("value")
 .then(function (snap) {
 console.log(snap.val());
 });

 //need to get the familiarity of the user
var quizTakers = firebase.app().database().ref("QuizTakers");
quizTakers.orderByKey().on("child_added", function(snapshot) {
  console.log(snapshot.key);
});

 //need to get the question list
var quizTakers = firebase.app().database().ref("QuizQuestions");
quizTakers.orderByKey().on("child_added", function(snapshot) {
  console.log(snapshot.key);
});


module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    var questionList = [];

};