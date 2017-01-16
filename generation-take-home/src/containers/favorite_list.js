import React, { Component } from 'react'
import { connect } from 'react-redux'
import { unselectFavorite } from '../actions'
import GoogleMap from '../components/google-map'
import ReactStreetView from 'react-streetview'


class FavoritesList extends Component {

	removeFavorite(store) {
		this.props.unselectFavorite(store)
	}
	renderFavorites() {
		return this.props.favorites.map(store => {
			const {latitude: lat, longitude: lon} = store.geocode[0]
			const API_KEY = 'AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A'
			const streetViewsOptions = {
				position: {lat, lng:lon},
				pov: {heading:100, pitch:0},
				zoom:0
			}
			return (
				<li key={store._id} className="list-group-item media">
					<div className="media-left"><div style={style}><GoogleMap lon={lon} lat={lat} /></div></div>
					<div className="media-left"><div style={style}><ReactStreetView apiKey={API_KEY} streetViewPanoramaOptions={streetViewsOptions}/></div></div>
					<div className="media-body">
						<h6>{store.name}</h6>
						<p>{store.address}</p>
						<a className="btn btn-primary btn-xs" href={`http://maps.google.com/maps?q=${lat},${lon}`} target="_blank">Direcciones</a>
						<button className="btn btn-danger btn-xs" onClick={() => this.props.unselectFavorite(store)}>Eliminar</button>
					</div>
				</li>
			)
		})
	}
	render() {
		if (!this.props.favorites.length) {
			return (
				<div className="list-container" >
					<h3>Tiendas Favoritas</h3>
					<h5>Agrega tus tiendas favoritas</h5>
					<h6>Selecciona algún marcador</h6>
				</div>
			)
		}
		return (
			<div className="list-container" >
				<h3>Tiendas Favoritas</h3>
				<ul className="list-group">
					{this.renderFavorites()}
				</ul>

			</div>

		)
	}
}

function mapStateToProps(state) {
	return {
		favorites: state.markers.favorites
	}
}

const style = {
	height: 120,
	width: 120
}

export default connect(mapStateToProps, { unselectFavorite })(FavoritesList)