'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =




loadJsonFile;var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);var _config = require('./config');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var regex = /( (DELE)\w.* | (C.P.) | (C.P) | (CP.) | (CP) | (ENTRE) | (ESQ)\W.* ).*/gi;var regex2 = /(c.p.).*/gi;function loadJsonFile() {
	var json = JSON.parse(_fs2.default.readFileSync(_config.DIR_LOCATION + 'store_directory.json', 'utf8')).
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
//# sourceMappingURL=stores.js.map