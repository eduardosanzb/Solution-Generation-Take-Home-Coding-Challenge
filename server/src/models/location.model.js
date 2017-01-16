import mongoose from 'mongoose'
let schema = mongoose.Schema

let locationSchema = new schema({
    name: String,
    address: String,
    geocode: [schema.Types.Mixed]
})
export default mongoose.model('Locations', locationSchema)