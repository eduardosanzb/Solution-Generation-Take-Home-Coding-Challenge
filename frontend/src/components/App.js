import React, { Component } from 'react';
import YourComponent from './YourComponent';
import TheMap from '../containers/map'
import FavoritesList from '../containers/favorite_list'

export default class App extends Component {
  render() {
    return (
      <div className="row main-app">
        <div className="col-xs-6 map-container" style={divStyle}>
          <h3>Stores</h3>
          <TheMap />
        </div>
        <div className="col-xs-6"><FavoritesList></FavoritesList></div>
      </div>
      
    );
  }
}

var divStyle = {
  height: 750,
	width: 500
};