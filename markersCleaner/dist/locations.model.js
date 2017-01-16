'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var Schema = _mongoose2.default.Schema;

var locationSchema = new Schema({
  address: String });exports.default =


_mongoose2.default.model('Locations', locationSchema);

/*
                                                       'use strict';
                                                       import mongoose from 'mongoose';
                                                       var Schema = mongoose.Schema;
                                                       
                                                       var StatsSchema = new mongoose.Schema({
                                                         _provider:{ type: Schema.Types.ObjectId, ref: 'Provider' },
                                                         type: String,
                                                         dateOfCreation: Date,
                                                         content:[Schema.Types.Mixed]
                                                       });
                                                       
                                                       export default mongoose.model('Statistics', StatsSchema);
                                                       
                                                        */
//# sourceMappingURL=locations.model.js.map