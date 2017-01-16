'use strict';
var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _nodeGeocoder = require('node-geocoder');var _nodeGeocoder2 = _interopRequireDefault(_nodeGeocoder);
var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);
var _locations = require('./locations.model');var _locations2 = _interopRequireDefault(_locations);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}} /*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

_mongoose2.default.Promise = Promise;
_mongoose2.default.connect('mongodb://localhost/generation');

var db = _mongoose2.default.connection;

// Setting up the debug flag:
_mongoose2.default.set('debug, true');
// Logging connection:
db.
on('error', console.error.bind(console, 'DB connection error.')).
once('open', console.log.bind(console, 'DB Connection established.'));



var JSON_LOCATION = __dirname + '/../src/';
var GOOGLE = 'AIzaSyDM_SxLW5I5q2yZGmyNzqk3ain_FuybRJA	';
var regex = /( (DELE)\w.* | (C.P.) | (C.P) | (CP.) | (CP) | (ENTRE) | (ESQ)\W.* ).*/gi;
var regex2 = /(c.p.).*/gi;
var options = {
	provider: 'google',
	apiKey: GOOGLE };


var geocoder = (0, _nodeGeocoder2.default)(options);

var stores = loadJsonFile();
stores = stores; //.slice(0,1)

var storesToCheck = [].concat(_toConsumableArray(stores));

fetching(storesToCheck);

function fetching(array) {
	if (array.length === 0) {
		_fs2.default.writeFileSync(JSON_LOCATION + 'result2.txt', JSON.stringify(stores));
		console.log('*************************************');
		stores.map(function (store) {var
			address = store.address,name = store.name,geocode = store.geocode;
			var newStore = new _locations2.default({ address: address, name: name, geocode: geocode });
			console.log('New location saved');
			//console.log(newStore);
			newStore.save(function (err, result) {
				if (err) {
					console.log(err);
				}
				console.log(result);
			});
		});
		console.log('storesChecked', stores.length);

		console.log("_________Closing Mongo connection_________");
		_mongoose2.default.connection.close();
		process.exit(0);
	}
	Promise.all(promiseFactory(array).map(function (p) {return p.catch(function (e) {return e;});})).
	then(function (data) {
		var OK = data.filter(function (x) {return x.type === 'OK';});
		OK.map(function (x) {
			stores.filter(function (s) {return s.index === x.payload.index;})[0].geocode = x.payload.data;
			array.filter(function (s) {return s.index === x.payload.index;})[0].pristine = false;
			//storesChecked.push(x.payload.data)
			//array.splice(x.payload.index - 1, 1)
		});
		fetching(array.filter(function (x) {return x.pristine;}));

	});
}
function geocode(address, index) {
	return new Promise(function (resolve, reject) {
		geocoder.geocode(address).
		then(function (data) {
			console.log('location acquired');
			resolve({ type: 'OK', payload: { data: data[0], index: index } });
		}).
		catch(function (err) {
			console.log(err);
			reject({ type: 'Error', payload: { data: null, index: index } });
		});
	});
}
function promiseFactory(array) {
	var pushThePromise = function pushThePromise(address, index) {
		promises.push(geocode(address, index));
	};
	var promises = [];
	if (array.length) {
		array.map(function (store) {
			//setTimeout(pushThePromise, 250, [store.address, store.index])
			promises.push(geocode(store.address, store.index));
		});
		return promises;
	}
	return null;
}
function loadJsonFile() {
	var json = JSON.parse(_fs2.default.readFileSync(JSON_LOCATION + 'store_directory.json', 'utf8')).
	reduce(function () {var prev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var val = arguments[1];var index = arguments[2];
		prev.push({
			address: val.Address.replace(regex, '').replace(regex2, ''),
			name: val.Name,
			index: index,
			pristine: true });

		return prev;
	}, []);
	return json;

}
//# sourceMappingURL=index.js.map