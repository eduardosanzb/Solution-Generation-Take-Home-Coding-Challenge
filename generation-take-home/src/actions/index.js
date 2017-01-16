import axios from 'axios'
const URL_LOCATIONS = 'http://dalet.tk:5000/api/locations'

export const ACTIONS_TYPES = {
	FETCH_MARKERS: 'FETCH_MARKERS',
	SELECT_FAVORITE: 'SELECT_FAVORITE',
	UNSELECT_FAVORITE: 'UNSELECT_FAVORITE'
}

export function fetchMarkers() {
	const request = axios.get(URL_LOCATIONS)
	return (dispatch) => {
		request.then(data => {
			dispatch({
				type:ACTIONS_TYPES.FETCH_MARKERS, 
				
			payload:data.data.map(store => Object.assign(store, {favorite:false, showInfo:false}))
			})
		})
	}
}
export function selectFavorite(marker) {
	return {
		type: ACTIONS_TYPES.SELECT_FAVORITE,
		payload: marker
	}
}
export function unselectFavorite(marker) {
	return {
		type: ACTIONS_TYPES.UNSELECT_FAVORITE,
		payload: marker
	}
}