import {combineReducers} from 'redux'
import MarkerReducer from './reducer_markers'

const rootReducer = combineReducers({
	markers: MarkerReducer
})

export default rootReducer