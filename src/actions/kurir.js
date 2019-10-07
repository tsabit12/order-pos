import api from "../api";
import { FETCH_KURIR, CLEAR_KURIR, ADD_KURIR } from "../types";

export const kurirCleared = () => ({
	type: CLEAR_KURIR
})

export const kurirFetched = (result) => ({
	type: FETCH_KURIR,
	result
})

export const kurirAdded = (result) => ({
	type: ADD_KURIR,
	result
})

export const getKurir = (data) => dispatch =>
	api.kurir.get_kurir(data).then(res => dispatch(kurirFetched(res)));

export const clearKurir = () => dispatch => dispatch(kurirCleared());

export const addKurir = (data) => dispatch => 
	api.kurir.add_kurir(data).then(res => dispatch(kurirAdded(res)));