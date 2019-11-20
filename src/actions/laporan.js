import api from "../api";
import { FETCH_LAPORAN_ORDER, FETCH_LAP_ASSIGMENT } from "../types";

export const fetchOrder = (result) => ({
	type: FETCH_LAPORAN_ORDER,
	result
})

export const assigmentFetched = (assigments) => ({
	type: FETCH_LAP_ASSIGMENT,
	assigments
})

export const getOrder = (tanggal, id) => dispatch =>
	api.laporan.get_order(tanggal, id)
		.then(res => dispatch(fetchOrder(res)))

export const fetchLapAssigment = (userid) => dispatch =>
	api.laporan.get_assigment(userid)
		.then(res => dispatch(assigmentFetched(res)))