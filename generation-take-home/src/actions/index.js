import { stores } from './store_directory'
const regex = /( (DELE)\w.* | (C.P.) | (C.P) | (CP.) | (CP) | (ENTRE) | (ESQ)\W.* ).*/gi;
let count = 0
export const ACTIONS_TYPES = {
	FETCH_MARKERS: 'FETCH_MARKERS'
}
export function fetchMarkers(limit) {
	return (dispatch) => {
		geocodeMarkers(stores, limit).then(data => {
			dispatch({
					type: ACTIONS_TYPES.FETCH_MARKERS,
					payload: data
				})
		})
	}
}
/*export function fetchMarkers() {
	return {
					type: ACTIONS_TYPES.FETCH_MARKERS,
					payload: geocodeMarkers(stores)
			}
}*/

 function geocodeMarkers(stores, limit) {
	// wraping my promises in a resolved promise so all the promises get resilved.
	return Promise.all( stores
				//.map(store => geocodePromise( store.Address.replace(regex,''), ))
				.slice(...limit)
				.map(store => slowGeocode(store))
				.map(p => p.catch(e => e))/*-> .all*/)
}

 function slowGeocode(store) {
	 return new Promise((resolve, reject) => {
		 setTimeout(function() {
			resolve(geocodePromise(store.Address.replace(regex,'')))
		}, 250);
	 })
}

 function geocodePromise(address) {
	let geocoder = new google.maps.Geocoder()
	return new Promise((resolve, reject) => {
		geocoder.geocode({address}, (result, status) => {
			if (status === google.maps.GeocoderStatus.OK) {
				resolve( result[0].geometry.location )
			} else {
				reject(status)
			}
		})
	})
}

