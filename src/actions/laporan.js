import api from "../api";
import { FETCH_LAPORAN_ORDER, FETCH_LAP_ASSIGMENT, FETCH_HANDOVER, FETCH_SELESAI_ANTAR, FETCH_LAP_PICKUP } from "../types";

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

export const selesaiAntarFetched = (result) => ({
	type: FETCH_SELESAI_ANTAR,
	result
})

export const pickupFetched = (pickup) => ({
	type: FETCH_LAP_PICKUP,
	pickup
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

export const getSelesaiAntar = (userid) => dispatch =>
	api.laporan.getSelesaiAntar(userid)
		.then(res => dispatch(selesaiAntarFetched(res)))

export const getLapPickup = (userid) => dispatch =>
	api.laporan.getPickup(userid)
		.then(res => dispatch(pickupFetched(res)))