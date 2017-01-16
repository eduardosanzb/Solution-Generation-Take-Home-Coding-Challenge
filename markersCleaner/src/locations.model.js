import mongoose from 'mongoose'
let Schema = mongoose.Schema

let locationSchema = new Schema({
	address: String
})

export default mongoose.model('Locations', locationSchema)

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