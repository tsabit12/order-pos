import React from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-css/semantic.min.css";
import App from './App';
import HandleProgressBar from "./components/pages/HandleProgressBar";
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route, Switch } from "react-router-dom";

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
	const user 		= { 
			token: localStorage.sampoernaToken, 
			username: payload.username, 
			nopend: payload.nopend, 
			nama: payload.nama, 
			userid: payload.userid, 
			level: payload.level,
			nopendPos: payload.nopendPos,
			confirmed: payload.confirmed,
			nohp: payload.nohp,
			city: payload.city,
			address: payload.address,
			address2: payload.address2,
			postalCode: payload.postalCode,
			provinsi: payload.provinsi
	};
	store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
	<HashRouter /*basename={process.env.PUBLIC_URL+'/app'} */>
		<Provider store={store}>
			<HandleProgressBar />
			<Switch>
				<Route component={App} />
			</Switch>
		</Provider>
	</HashRouter>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
