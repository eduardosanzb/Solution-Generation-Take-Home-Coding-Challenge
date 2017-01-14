import mongoose from 'mongoose'
let Schema = mongoose.Schema

let locationSchema = new mongoose.Schema({
	address: String
})

export default mongoose.model('Locations', locationSchema)
