import {ACTIONS_TYPES} from '../actions/index'

export default function(state=[], action) {
	//console.log('reducer action:',action.payload);
	if(action.payload)
	switch(action.type) {
		case ACTIONS_TYPES.FETCH_MARKERS:{
			return [].concat(state, action.payload)
		}
	}
	return state
}