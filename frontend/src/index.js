import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk' 


import App from './components/App';
import reducers from './reducers'

const createStoreWithMiddleware = compose(
	applyMiddleware(ReduxPromise, ReduxThunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)


ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<App />
	</Provider>
	, document.getElementById('root'));
