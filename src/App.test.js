import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter, Route, Switch } from "react-router-dom";

import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import HandleProgressBar from "./components/pages/HandleProgressBar";


import rootReducers from "./rootReducers";
import decode from "jwt-decode";

import { userLoggedIn } from "./actions/auth";

const store = createStore(
	rootReducers,
	applyMiddleware(thunk)
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<HashRouter>
		<Provider store={store}>
			<HandleProgressBar />
			<Switch>
				<Route component={App} />
			</Switch>
		</Provider>
	</HashRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
