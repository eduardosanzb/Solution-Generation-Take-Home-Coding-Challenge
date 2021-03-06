import Locations from './models/location.model'
import theLocations from './markers'
console.log(theLocations)

export default function () {
	Locations.remove({}, (err, res) => {
		if(err) throw err;
		console.log('Collection cleaned');
	})
	theLocations.markers.map(location => {
		const {name, address, geocode=[]} = location
		
		let newLocation = new Locations({ name, address, geocode })
		newLocation.save((err, result) => {
			if (err) throw err;
			//console.log('Location saved')
		})
	})
}