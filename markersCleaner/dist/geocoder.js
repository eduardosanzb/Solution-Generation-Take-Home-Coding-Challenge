'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _nodeGeocoder = require('node-geocoder');var _nodeGeocoder2 = _interopRequireDefault(_nodeGeocoder);
var _config = require('./config');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var options = {
	provider: 'google',
	apiKey: _config.GOOGLE };exports.default =


(0, _nodeGeocoder2.default)(options);
//# sourceMappingURL=geocoder.js.map