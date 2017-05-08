'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: true }));

    app.get('/api/locations', (req, res) => {
        _location2.default.find({}, (err, locations) => {
            if (err) throw err;
            res.send(locations);
        });
    });

    app.post('/api/location', (req, res) => {
        let { name, address, geopoint } = req.body;
        let newLocation = new _location2.default({ name, address, geopoint });
        newLocation.save((err, result) => {
            if (err) throw err;
            res.send('Success');
        });
    });
};

var _location = require('../models/location.model');

var _location2 = _interopRequireDefault(_location);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }