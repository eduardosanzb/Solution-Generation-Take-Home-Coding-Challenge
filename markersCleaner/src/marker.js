/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import fs from 'fs'
import geocoder from './geocoder'
import Location from './locations.model'
import { DIR_LOCATION } from './config'

class MarkersCreator {
	constructor(array) {
		this.stores = array,
		this.storesToCheck = [...this.stores]
	}

	terminateProcess() {
		fs.writeFileSync(DIR_LOCATION + 'result2.txt', JSON.stringify(this.stores))
		console.log('*************************************')
		this.stores.map(store => {
			let {address, name, geocode} = store
			let newStore = new Location({ address, name, geocode })
			console.log(newStore)
			console.log('New location saved')
			//console.log(newStore);
			newStore.save((err, result) => {
				if (err) {
					console.log(err)
				}
				console.log(result)
			})
		})
		console.log('storesChecked', this.stores.length)
		process.exit(0)
	}

	fetching(array) {
		if (array.length === 0) {
			this.terminateProcess()
		}
		Promise.all(promiseFactory(array).map(p => p.catch(e => e)))
			.then(data => {
				const OK = data.filter(x => x.type === 'OK')
				OK.map(x => {
					stores.filter(s => s.index === x.payload.index)[0].geocode = x.payload.data
					array.filter(s => s.index === x.payload.index)[0].pristine = false
				})
				this.fetching(array.filter(x => x.pristine))

			})
	}
	geocode(address, index) {
		return new Promise((resolve, reject) => {
			geocoder.geocode(address)
				.then((data) => {
					console.log('location acquired');
					resolve({ type: 'OK', payload: { data: data[0], index } })
				})
				.catch(err => {
					console.log(err);
					reject({ type: 'Error', payload: { data: null, index } })
				})
		})
	}
	promiseFactory(array) {
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

}

