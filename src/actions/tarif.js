import api from "../api";
import { GET_TARIF_LAYANAN, GET_DETAIL_TARIF } from "../types";

export const tarifFetched = (response) => ({
	type: GET_TARIF_LAYANAN,
	response
})

export const getTarifLayanan = () => dispatch => 
	api.laporan.getTarifLayanan()
		.then(res => dispatch(tarifFetched(res)))

export const detailFetched = (res, nopend, layanan) => ({
	type: GET_DETAIL_TARIF,
	res,
	nopend,
	layanan
})

export const getDetailTarif = (nopend, layanan) => dispatch =>
	api.laporan.getDetailTarif(nopend, layanan)
		.then(res => dispatch(detailFetched(res, nopend, layanan)))