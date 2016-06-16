// MajorKeys for Amazon Echo, inspired by http://khaledbot.com/ and http://www.theydontwantyouto.win/.
// List of major keys from http://khaledipsum.com/

var alexa = require('alexa-app'),
  _ = require('underscore'),
  keys = require('./keys.js');

var app = new alexa.app('MajorKeys');

app.intent('GetKey', {
  slots: {},
  utterances: ['{give me |to give me |for |}a {major |}key{ to success|}', '{for |give me |to give me |}{another|anotha} {one|key}']
}, function(request, response) {
  var key = _.sample(keys);
  response.say(key);
});

app.intent('AMAZON.HelpIntent', function(request, response) {
  response
    .say('Try saying, "give me a key to success". What would you like to ask ' + app.name + '?')
    .shouldEndSession(false)
    .reprompt('What would you like to ask ' + app.name + '?');
});

app.launch(function(request, response) {
  // Amazon requires us to handle the "no-intent" launch invocation with a help message and a reprompt.
  response.say('Try asking ' + app.name + ' for a key to success instead of opening it directly.');
  response.say('What would you like to ask ' + app.name + '?')
  response.shouldEndSession(false);
  response.reprompt('What would you like to ask ' + app.name + '?');
})

app.messages.INVALID_REQUEST_TYPE = app.messages.NO_INTENT_FOUND = app.name + ' didn\'t understand that request. Congratulations, you played yourself.';
app.messages.GENERIC_ERROR = 'Sorry, ' + app.name + ' encountered an error. They don\'t want us to win.';

// Checking if we're actually being run as a module (in this case, as a Lambda function.)
if (module.parent) {
  exports.handler = app.lambda();
} else {
  var fs = require('fs');
  fs.writeFileSync('schema.json', app.schema());
  fs.writeFileSync('utterances.txt', app.utterances());
  console.log('Schema and utterances exported!')
}
