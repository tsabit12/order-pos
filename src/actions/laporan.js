import api from "../api";
import { FETCH_LAPORAN_ORDER, FETCH_LAP_ASSIGMENT, FETCH_HANDOVER } from "../types";

export const fetchOrder = (result) => ({
	type: FETCH_LAPORAN_ORDER,
	result
})

export const assigmentFetched = (assigments) => ({
	type: FETCH_LAP_ASSIGMENT,
	assigments
})

export const handoverFetched = (handover) => ({
	type: FETCH_HANDOVER,
	handover
})

export const getOrder = (tanggal, id) => dispatch =>
	api.laporan.get_order(tanggal, id)
		.then(res => dispatch(fetchOrder(res)))

export const fetchLapAssigment = (userid) => dispatch =>
	api.laporan.get_assigment(userid)
		.then(res => dispatch(assigmentFetched(res)))

export const getLaporanHandover = (userid) => dispatch =>
	api.laporan.getHandover(userid)
		.then(res => dispatch(handoverFetched(res)))