import api from "../api";
import { FETCH_LAPORAN_ORDER } from "../types";

export const fetchOrder = (result) => ({
	type: FETCH_LAPORAN_ORDER,
	result
})

export const getOrder = (tanggal, id) => dispatch =>
	api.laporan.get_order(tanggal, id)
		.then(res => dispatch(fetchOrder(res)))