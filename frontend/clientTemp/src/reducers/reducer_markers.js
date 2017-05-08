import { ACTIONS_TYPES } from '../actions/index'
const INITIAL_STATE = { all: [], favorites: [] }
const newIcon = 'http://maps.google.com/mapfiles/kml/pal4/icon47.png'

export default function (state = INITIAL_STATE, action) {
	if (action.payload)
		switch (action.type) {

			case ACTIONS_TYPES.FETCH_MARKERS:
				return { ...state, all: action.payload }

			case ACTIONS_TYPES.SELECT_FAVORITE: {
				let { all, favorites } = state
				let marker = action.payload
				all = all.map(s => {
					if (s._id === marker._id) {
						return {
							...s,
							favorite: true,
							icon: newIcon
						}
					}
					return s
				})
				return { ...state, all, favorites: [marker, ...favorites] }
			}

			case ACTIONS_TYPES.UNSELECT_FAVORITE: {
				let { all } = state
				let marker = action.payload
				all = all.map(s => {
					if (s._id === marker._id) {
						return {
							...s,
							favorite: false,
							icon: ''
						}
					}
					return s
				})
				let favorites = all.filter(s => s.favorite)
				return { ...state, all, favorites }
			}

			default:
				return state
		}
	return state
}