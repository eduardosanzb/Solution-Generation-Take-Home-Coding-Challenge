/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import fs from 'fs'
import _ from 'lodash'
import NodeGeocoder from 'node-geocoder'
import mongoose from 'mongoose'
import Location from './locations.model'

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/generation')

let db = mongoose.connection;

// Setting up the debug flag:
mongoose.set('debug, true');
// Logging connection:
db
  .on('error', console.error.bind(console, 'DB connection error.'))
  .once('open', console.log.bind(console, 'DB Connection established.'));



const JSON_LOCATION = `${__dirname}/../src/`
const GOOGLE = 'AIzaSyDM_SxLW5I5q2yZGmyNzqk3ain_FuybRJA	'
const regex = /( (DELE)\w.* | (C.P.) | (C.P) | (CP.) | (CP) | (ENTRE) | (ESQ)\W.* ).*/gi
const regex2 = /(c.p.).*/gi
const options = {
	provider: 'google',
	apiKey: GOOGLE
};

let geocoder = NodeGeocoder(options);

let stores = loadJsonFile()
stores = stores.slice(0,1)

let storesChecked = []
let storesToCheck = [...stores]

fetching(storesToCheck)

function fetching(array) {
	if (array.length === 0) {
		fs.writeFileSync(JSON_LOCATION + 'result2.txt', JSON.stringify(stores))
		console.log('*************************************');
		stores.map(store => {
			let {address, name, geocode} = store
			let newStore = new Location({address, name, geocode})
			console.log('New location saved');
			//console.log(newStore);
			newStore.save((err, result) => {
				if(err) {
					console.log(err)
				}
				console.log(result);
			})
		})
		console.log('storesChecked', stores.length)

        console.log("_________Closing Mongo connection_________");
        mongoose.connection.close();
		process.exit(0)
	}
	Promise.all(promiseFactory(array).map(p => p.catch(e => e)))
		.then(data => {
			const OK = data.filter(x => x.type === 'OK')
			OK.map(x => {
				stores.filter(s=>s.index===x.payload.index)[0].geocode = x.payload.data
				array.filter(s=>s.index===x.payload.index)[0].pristine = false
				//storesChecked.push(x.payload.data)
				//array.splice(x.payload.index - 1, 1)
			})
			fetching(array.filter(x => x.pristine))
			
		})
}
function geocode(address, index) {
	return new Promise((resolve, reject) => {
		geocoder.geocode(address)
			.then((data) => {
				console.log('location acquired');
				resolve({ type: 'OK', payload: { data: data[0], index } })
			})
			.catch(err => {
				console.log(err);
				reject({ type: 'Error', payload: { data: null, index  } })
			})
	})
}
function promiseFactory(array) {
	let pushThePromise = (address, index) => {
		promises.push(geocode(address, index))
	}
	let promises = []
	if (array.length) {
		array.map(store => {
			//setTimeout(pushThePromise, 250, [store.address, store.index])
			promises.push(geocode(store.address, store.index))
		})
		return promises
	}
	return null
}
function loadJsonFile() {
	const json = JSON.parse(fs.readFileSync(JSON_LOCATION + 'store_directory.json', 'utf8'))
		.reduce((prev = [], val, index) => {
			prev.push({
				address: val.Address.replace(regex, '').replace(regex2, ''),
				name: val.Name,
				index: index,
				pristine: true
			})
			return prev
		}, [])
	return json

}



