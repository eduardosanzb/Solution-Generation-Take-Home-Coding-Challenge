import React, { Component } from 'react';
import YourComponent from './YourComponent';
import TheMap from '../containers/map'
export default class App extends Component {
  render() {
    return (
      <div style={divStyle}>
      <TheMap></TheMap>
      </div>
    );
  }
}

var divStyle = {
  height: 800,
	width: 600
};