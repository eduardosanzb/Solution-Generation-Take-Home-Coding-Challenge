'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	_location2.default.remove({}, (err, res) => {
		if (err) throw err;
		console.log('Collection cleaned');
	});
	_markers2.default.markers.map(location => {
		const { name, address, geocode = [] } = location;

		let newLocation = new _location2.default({ name, address, geocode });
		newLocation.save((err, result) => {
			if (err) throw err;
			//console.log('Location saved')
		});
	});
};

var _location = require('./models/location.model');

var _location2 = _interopRequireDefault(_location);

var _markers = require('./markers');

var _markers2 = _interopRequireDefault(_markers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_markers2.default);