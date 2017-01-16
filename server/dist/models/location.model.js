'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let schema = _mongoose2.default.Schema;

let locationSchema = new schema({
    name: String,
    address: String,
    geocode: [schema.Types.Mixed]
});
exports.default = _mongoose2.default.model('Locations', locationSchema);
//# sourceMappingURL=location.model.js.map