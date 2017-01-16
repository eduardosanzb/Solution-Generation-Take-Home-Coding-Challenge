import Locations from '../models/location.model'
import bodyParser from 'body-parser'

export default function (app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/api/locations', (req, res) => {
        Locations.find({}, (err, locations) => {
            if (err) throw err;
            res.send(locations)
        })
    });

    app.post('/api/location', (req, res) => {
        let {name, address, geopoint} = req.body
        let newLocation = new Locations({ name, address, geopoint })
        newLocation.save((err, result) => {
            if (err) throw err;
            res.send('Success')
        })

    });

}