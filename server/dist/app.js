'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _fillLocations = require('./fill-locations');

var _fillLocations2 = _interopRequireDefault(_fillLocations);

var _api = require('./controllers/api.controller');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _fillLocations2.default)();

/* Filling with the already locations */


let port = process.env.port || 5000;
let app = (0, _express2.default)();
app.use((0, _cors2.default)());
_mongoose2.default.connect(_config2.default.mongo.uri, _config2.default.mongo.options);
_mongoose2.default.Promise = require('bluebird');
(0, _api2.default)(app);
console.log(`Running in port ${port}`);
app.listen(port);

exports = module.exports = app;