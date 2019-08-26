import React from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-css/semantic.min.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from "react-router-dom";

import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./rootReducers";
import decode from "jwt-decode";

import { userLoggedIn } from "./actions/auth";

const store = createStore(
	rootReducers,
	composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.sampoernaToken) {
	const payload 	= decode(localStorage.sampoernaToken);
	const user 		= { token: localStorage.sampoernaToken, username: payload.username, nippos: payload.nippos };
	store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
