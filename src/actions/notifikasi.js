import { GET_NOTIF_TOPUP, REMOVE_NOTIF, GET_DATA_NOTIF_TOPUP, CONFIRM_TOPUP } from "../types";
import api from "../api";

export const remove = () => ({
	type: REMOVE_NOTIF
})

export const topupFetched = (total) => ({
	type: GET_NOTIF_TOPUP,
	total
})

export const dataFetched = (data) => ({
	type: GET_DATA_NOTIF_TOPUP,
	data
})

export const confirmedTopup = (data) => ({
	type: CONFIRM_TOPUP,
	data
})

export const getTopup = () => dispatch => {
	api.notifikasi.get_jumlah()
		.then(res => dispatch(topupFetched(res)))
}

export const removeNotif = () => dispatch => {
	dispatch(remove());
}

export const getDataTopup = () => dispatch => 
	api.notifikasi.get_data_topup().then(res => dispatch(dataFetched(res)))

export const submitTopup = (data, id) => dispatch =>
	api.notifikasi.confirm_topup(data, id).then(res =>{
		dispatch(confirmedTopup(res));
		console.log(res);
	})
