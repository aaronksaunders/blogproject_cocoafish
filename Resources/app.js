//include Cocoafish & credentials module
var credentials = require('credentials').C;
var cocoafish = require('cocoafish_module');

//create Cocoafish Client
var client = new cocoafish.Client(credentials.COCOAFISH_APP_NAME, credentials.COCOAFISH_API_KEY);

// login to the app
client.login({
	'login' : "aaron@clearlyinnovative.com",
	'password' : "password"
}, function(e) {
	if(e.success === true) {
		Ti.API.info("login " + JSON.stringify(e));
		alert(JSON.stringify(e));
	} else {
		Ti.API.error(e.error);
	}
});