import NodeGeocoder from 'node-geocoder'
import {GOOGLE} from './config'
const options = {
	provider: 'google',
	apiKey: GOOGLE
}

export default NodeGeocoder(options)