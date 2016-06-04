// KhaledBot for Amazon Echo, inspired by http://khaledbot.com/ and http://www.theydontwantyouto.win/.
// List of major keys from http://khaledipsum.com/

var alexa = require('alexa-app'),
  _ = require('underscore'),
  keys = require('./keys.js');

var app = new alexa.app('KhaledBot');

app.intent('GetKey', {
  slots: {},
  utterances: ['{give me |to give me |for |}a {major |}key{ to success|}', '{for |}{another|anotha} {one|key}']
}, function(request, response) {
  var key = _.sample(keys);
  response.say(key);
});

app.messages.INVALID_REQUEST_TYPE = app.messages.NO_INTENT_FOUND = 'KhaledBot didn\'t understand that request. Congratulations, you played yourself.';
app.messages.NO_LAUNCH_FUNCTION = 'Try asking KhaledBot for a key to success instead of opening it. Lion.';
app.messages.GENERIC_ERROR = 'Sorry, KhaledBot encountered an error. They don\'t want us to win.';

// Checking if we're actually being run as a module (in this case, as a Lambda function.)
if (module.parent) {
  exports.handler = app.lambda();
} else {
  var fs = require('fs');
  fs.writeFileSync('schema.json', app.schema());
  fs.writeFileSync('utterances.txt', app.utterances());
  console.log('Schema and utterances exported!')
}
