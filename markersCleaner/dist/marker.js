'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}(); /*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _geocoder = require('./geocoder');var _geocoder2 = _interopRequireDefault(_geocoder);
var _locations = require('./locations.model');var _locations2 = _interopRequireDefault(_locations);
var _config = require('./config');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

MarkersCreator = function () {
	function MarkersCreator(array) {_classCallCheck(this, MarkersCreator);
		this.stores = array,
		this.storesToCheck = [].concat(_toConsumableArray(this.stores));
	}_createClass(MarkersCreator, [{ key: 'terminateProcess', value: function terminateProcess()

		{
			_fs2.default.writeFileSync(_config.DIR_LOCATION + 'result2.txt', JSON.stringify(this.stores));
			console.log('*************************************');
			this.stores.map(function (store) {var
				address = store.address,name = store.name,geocode = store.geocode;
				var newStore = new _locations2.default({ address: address, name: name, geocode: geocode });
				console.log(newStore);
				console.log('New location saved');
				//console.log(newStore);
				newStore.save(function (err, result) {
					if (err) {
						console.log(err);
					}
					console.log(result);
				});
			});
			console.log('storesChecked', this.stores.length);
			process.exit(0);
		} }, { key: 'fetching', value: function fetching(

		array) {var _this = this;
			if (array.length === 0) {
				this.terminateProcess();
			}
			Promise.all(promiseFactory(array).map(function (p) {return p.catch(function (e) {return e;});})).
			then(function (data) {
				var OK = data.filter(function (x) {return x.type === 'OK';});
				OK.map(function (x) {
					stores.filter(function (s) {return s.index === x.payload.index;})[0].geocode = x.payload.data;
					array.filter(function (s) {return s.index === x.payload.index;})[0].pristine = false;
				});
				_this.fetching(array.filter(function (x) {return x.pristine;}));

			});
		} }, { key: 'geocode', value: function geocode(
		address, index) {
			return new Promise(function (resolve, reject) {
				_geocoder2.default.geocode(address).
				then(function (data) {
					console.log('location acquired');
					resolve({ type: 'OK', payload: { data: data[0], index: index } });
				}).
				catch(function (err) {
					console.log(err);
					reject({ type: 'Error', payload: { data: null, index: index } });
				});
			});
		} }, { key: 'promiseFactory', value: function promiseFactory(
		array) {
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
		} }]);return MarkersCreator;}();
//# sourceMappingURL=marker.js.map