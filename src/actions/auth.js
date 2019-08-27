import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT
});

export const userLoggedIn = (user) => ({
	type: USER_LOGGED_IN,
	user
})

export const login = credentials => dispatch =>
	api.user.login(credentials).then(user => {
		localStorage.sampoernaToken = user.token;
		dispatch(userLoggedIn(user));
	})

export const logout = () => dispatch => {
	localStorage.removeItem('sampoernaToken');
	dispatch(userLoggedOut());
};

export const signup = (data) => dispatch =>
	api.user.signup(data).then(user => {
		localStorage.sampoernaToken = user.token;
		dispatch(userLoggedIn(user));
	});