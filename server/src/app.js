'use strict';
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './config'

/* Filling with the already locations */
import filler from './fill-locations'
filler()
import apiController from './controllers/api.controller'

let port = process.env.port || 5000
let app = express()
app.use(cors())
mongoose.connect(config.mongo.uri, config.mongo.options)
mongoose.Promise = Promise
apiController(app)
app.listen(port)

exports = module.exports = app