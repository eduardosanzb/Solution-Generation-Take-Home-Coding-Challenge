import React from 'react'
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps'

export default (props) => {
	const {lat, lon:lng} = props
	return(
		<GoogleMapLoader 
			containerElement={<div style={{ height: '100%' }}/>}
			googleMapElement={
				<GoogleMap defaultZoom={15} defaultCenter={{lat, lng}}>
					<Marker position={{ lat, lng }}/>
				</GoogleMap>
			}
		/>
	)
}