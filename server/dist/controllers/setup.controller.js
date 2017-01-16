'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    app.get('/api/SetupTodos', (req, res) => {
        // seed database
        let staterTodos = [{
            username: 'Test',
            toDo: 'Test',
            isDone: false,
            hasAttachment: false
        }, {
            username: 'Test2',
            toDo: 'Test2',
            isDone: false,
            hasAttachment: false
        }, {
            username: 'Test3',
            toDo: 'Test3',
            isDone: false,
            hasAttachment: false
        }];
        _location2.default.create(staterTodos, (err, result) => {
            res.send(result);
        });
    });
};

var _location = require('./../models/location.model');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=setup.controller.js.map