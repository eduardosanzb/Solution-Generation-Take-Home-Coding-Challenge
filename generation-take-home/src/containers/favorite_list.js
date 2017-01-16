import React, { Component } from 'react'
import { connect } from 'react-redux'
import { unselectFavorite } from '../actions'
import GoogleMap from '../components/google-map'


class FavoritesList extends Component {

	removeFavorite(store) {
		this.props.unselectFavorite(store)
	}

	renderFavorites() {
		return this.props.favorites.map((store, index) => {
			const {latitude: lat, longitude: lon} = store.geocode[0]
			return (
				<li key={store._id} className="list-group-item media">
					<div className="media-left"><div style={style}><GoogleMap lon={lon} lat={lat}></GoogleMap></div></div>
					<div className="media-body">
						<h6>{`#${index+1}: `}{store.name}</h6>
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
				<h3>Tiendas Favoritas: {this.props.favorites.length}</h3>
				<ul style={{overflow:'auto', maxHeight:600}}>
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