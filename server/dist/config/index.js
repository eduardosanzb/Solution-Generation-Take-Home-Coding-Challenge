'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    root: _path2.default.normalize(`${__dirname}/../..`),
    getDbConnectionString: function () {},
    mongo: {
        uri: 'mongodb://localhost/generation',
        options: {
            db: {
                safe: true
            }
        }
    }
};