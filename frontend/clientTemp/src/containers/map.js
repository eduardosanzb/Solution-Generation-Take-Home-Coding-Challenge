import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMarkers, selectFavorite } from '../actions/index'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import StoreCard from '../components/store_card'
class TheMap extends Component {
	constructor(props) {
		super(props)
		this.firstTime = true
		this.state = {}
	}
	componentWillMount() {
		this.props.fetchMarkers()
	}
	componentWillReceiveProps(nextprops){
		this.setState({markers: nextprops.markers})
	}

	onClickMarker(marker) {
		this.setState({
			markers:this.state.markers.map(m => {
				if (m === marker) {
					return { ...marker, showInfo: true }
				}
				return m
			})
		})
	}
	onCloseMarker(marker) {
		this.setState({
			markers:this.state.markers.map(m => {
				if (m === marker) {
					return { ...marker, showInfo: false }
				}
				return m
			})
		})
	}
	addFavorite(marker) {
		this.props.selectFavorite(marker)
	}
	renderMarkers() {
		if (this.state.markers) {
			return this.state.markers.map(marker => {
				if (marker.geocode.length) {
					const {latitude: lat, longitude: lng, extra} = marker.geocode[0]
					return (
						<Marker position={{ lat, lng }}
							key={marker._id}
							icon={marker.icon}
							onClick={() => this.onClickMarker(marker)}>
							{!marker.favorite && marker.showInfo &&(
								<InfoWindow onCloseclick={() => this.onCloseMarker(marker)}>
									<div>
										<StoreCard 
											marker={marker} 
											onAddFavorite={() => this.addFavorite(marker)}
											onCancelClick={() => this.onCloseMarker(marker)}/>
									</div>
								</InfoWindow>
							)}
						</Marker>
					)
				}
			})
		}
	}
	render() {
		return (
			<GoogleMapLoader
				containerElement={<div style={{ height: '90%' }} />}
				googleMapElement={
					<GoogleMap
						defaultZoom={12}
						defaultCenter={{ lng: -99.17225311, lat: 19.4497769 }}>
						{this.renderMarkers()}
					</GoogleMap>
				}
				/>
		)
	}
}


function mapStateToProps(state) {
	return { markers: state.markers.all }
}

export default connect(mapStateToProps, { fetchMarkers, selectFavorite })(TheMap)