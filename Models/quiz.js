const FACEBOOK_ACCESS_TOKEN = 'EAAgxPAHgXhQBADezB6dYP4U98LPYiVZCWtXCzjbhuaQpLmImyaoZAWF30qoQZCl3tc7Y7qyANruVrVWh2l39rBMOPwq69yrOoOlowNk7dS8ADurdN66LqNK5BPrtusIZA0ocA1ZAigFu4CB40p4YSgGahTNsBNbbYc3ZA0L20oGAZDZD';

const request = require('request');

class Quiz {
    constructor(id, questions) {
        this.userId = id;
        this.questions = questions;
        }
    }

