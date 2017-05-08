import React from 'react'
import ReactStreetView from 'react-streetview'


const StoreCard = (props) => {
	const {marker, onAddFavorite, onCancelClick} = props
	const {latitude: lat, longitude: lon} = marker.geocode[0]
	const API_KEY = 'AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A'
			const streetViewsOptions = {
				position: {lat, lng:lon},
				pov: {heading:100, pitch:0},
				zoom:0
			}
	return (
		<div className="card">
			<div className="card-img-top"><div style={styleToImg}><ReactStreetView apiKey={API_KEY} streetViewPanoramaOptions={streetViewsOptions}/></div></div>
			<div className="card-block">
				<h6>{marker.name}</h6>
				<button className="btn btn-primary btn-sm" onClick={onAddFavorite}>Add to favorites!</button>
				<button className="btn  btn-sm" onClick={onCancelClick}>Cancel</button>
			</div>
		</div>

	)
}

const style = {
	width: 320
}
const styleToImg = {
	height: 200,
	width: 300
}
export default StoreCard