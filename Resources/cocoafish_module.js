//Public client interface
function Client(applicationName, applicationkey) {
	this.COCOAFISH_APP_NAME = applicationName;
	this.COCOAFISH_APPLICATION_KEY = applicationkey;
	this.ENDPOINT = 'https://api.cocoafish.com/v1/';
	this.CURRENT_USER = {};

	Ti.API.debug(JSON.stringify(this));

};

/*
 *
 */
Client.prototype.login = function(args, callback) {
	var that = this;
	var xhr = Ti.Network.createHTTPClient();

	xhr.onerror = function(r) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : '',
			message : 'Unable to connect server. Please check network connection',
			buttonNames : ['OK']
		});
		alertDialog.show();
		Titanium.API.error("login " + JSON.stringify(r));
		Titanium.API.error(xhr.responseText);

		callback({
			"success" : false,
			"response" : xhr.responseText,
			"error" : r
		});
	};
	xhr.onload = function() {
		//Titanium.API.debug(" success " + xhr.responseText);
		callback({
			"success" : true,
			"response" : xhr.responseText
		});
		// SAVE THE CURRENT USER FOR LATER
		var respObject = JSON.parse(xhr.responseText);
		that.CURRENT_USER = respObject.response.users[0];
		Ti.API.info("Saved current user " + that.CURRENT_USER);
	};

	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.open('POST', "http://api.cocoafish.com/v1/users/login.json?key=" + that.COCOAFISH_APPLICATION_KEY);
	xhr.send({
		"login" : args.login,
		"password" : args.password
	});
};
exports.Client = Client;
