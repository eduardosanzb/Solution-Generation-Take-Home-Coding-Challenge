'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var Schema = _mongoose2.default.Schema;

var locationSchema = new _mongoose2.default.Schema({
	address: String });exports.default =


_mongoose2.default.model('Locations', locationSchema);
//# sourceMappingURL=locations.model.js.map