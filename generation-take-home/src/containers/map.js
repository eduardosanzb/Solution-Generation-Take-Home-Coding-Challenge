import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchMarkers } from '../actions/index'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'


class TheMap extends Component {
	constructor(props) {
		super(props)
		this.fetchMarkers = this.props.fetchMarkers.bind(this)
		this.markers = []
	}
	componentWillMount() {
		this.props.fetchMarkers([0, 10])
	}
	render() {
		return (
			<GoogleMapLoader
				containerElement={<div style={{ height: '100%' }} />}
				googleMapElement={
					<GoogleMap defaultZoom={12}
						center={this.props.markers[0]}>
						{this.props.markers.map(m => 
							(
								<Marker
									key={m}
									position={m}
									onRightClick={() => props.onMarkerRightClick(marker)}
									/>
							)
						)}

						))
				</GoogleMap>
				}
				/>
		)
	}
}

function mapStateToProps({markers}) {
	return { markers }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchMarkers }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(TheMap)