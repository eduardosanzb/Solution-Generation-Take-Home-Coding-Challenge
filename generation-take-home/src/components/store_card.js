import React from 'react'

const StoreCard = (props) => {
	const {marker, onAddFavorite, onCancelClick} = props
	return (
		<div className="card">
			<img className="card-img-top" style={style} src="https://vw-squattypotty.storage.googleapis.com/uploads/2015/04/07/images/SquattyPotty-Retailers-Target.jpg" />
			<div className="card-block">
				<h6>{marker.name}</h6>
				<button className="btn btn-primary btn-sm" onClick={onAddFavorite}>Agregar a Favoritos!</button>
				<button className="btn  btn-sm" onClick={onCancelClick}>Cancelar</button>
			</div>
		</div>

	)
}

const style = {
	width: 320
}
export default StoreCard