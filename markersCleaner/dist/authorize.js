'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =








authorize;var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                        * Create an OAuth2 client with the given credentials, and then execute the
                                                                                                                                                                        * given callback function.
                                                                                                                                                                        *
                                                                                                                                                                        * @param {Object} credentials The authorization client credentials.
                                                                                                                                                                        * @param {function} callback The callback to call with the authorized client.
                                                                                                                                                                        */function authorize(credentials, callback) {var clientSecret = credentials.installed.client_secret;var clientId = credentials.installed.client_id;var redirectUrl = credentials.installed.redirect_uris[0];var auth = new googleAuth();var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
	// Check if we have previously stored a token.
	_fs2.default.readFile(TOKEN_PATH, function (err, token) {
		if (err) {
			getNewToken(oauth2Client, callback);
		} else {
			oauth2Client.credentials = JSON.parse(token);
			callback(oauth2Client);
		}
	});
}

/**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */ /*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
function getNewToken(oauth2Client, callback) {
	var authUrl = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES });

	console.log('Authorize this app by visiting this url: ', authUrl);
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout });

	rl.question('Enter the code from that page here: ', function (code) {
		rl.close();
		oauth2Client.getToken(code, function (err, token) {
			if (err) {
				console.log('Error while trying to retrieve access token', err);
				return;
			}
			oauth2Client.credentials = token;
			storeToken(token);
			callback(oauth2Client);
		});
	});
}

/**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
function storeToken(token) {
	try {
		_fs2.default.mkdirSync(TOKEN_DIR);
	} catch (err) {
		if (err.code != 'EEXIST') {
			throw err;
		}
	}
	_fs2.default.writeFile(TOKEN_PATH, JSON.stringify(token));
	console.log('Token stored to ' + TOKEN_PATH);
}
//# sourceMappingURL=authorize.js.map