/*
  This is a sample project using Cocoafish and Titanium.
  See additional code samples and documentation on my blog 
  
  Aaron K. Saunders
  
  @see http://blog.clearlyinnovative.com
*/
(function() {

	//include Cocoafish & credentials module
	var credentials = require('credentials').C;
	var cocoafish = require('cocoafish_module');

	//create Cocoafish Client
	var client = new cocoafish.Client(credentials.COCOAFISH_APP_NAME, credentials.COCOAFISH_API_KEY);

	// login to the app
	var params = {
		'login' : "aaron@clearlyinnovative.com",
		'password' : "password"
	};
	client.login(params, function(e) {
		if(e.success === true) {
			Ti.API.info("login " + JSON.stringify(e));
			alert(JSON.stringify(e));

			// save the credentials so they are available later
			Ti.App.Properties.setString('CREDENTIALS', JSON.stringify(params));
		} else {
			Ti.API.error(e.error);
		}
	});
	/**
	 * event listener - on the resume event, try and log the user in
	 */
	Ti.App.addEventListener('resumed', function() {
		var creds = JSON.parse(Ti.App.Properties.getString('CREDENTIALS'));
		if(creds.login && creds.password) {
			client.login(creds, function(e) {
				if(e.success === false) {
					makeSimpleAlert("Error Connecting to the Server, Please login again").show();
				} else {
					Ti.API.debug("Logged in on resume " + JSON.stringify(e.response));
				}
			});
		}
	});
})();
