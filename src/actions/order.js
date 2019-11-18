/* eslint-disable */
import api from "../api";
import { PO_ADDED, KANTOR_FETCHED } from "../types";

export const kantorIsGet = kantor => ({
	type: KANTOR_FETCHED,
	kantor
})

export const poAdded = data => ({
	type: PO_ADDED,
	data
})


export const entriPo = (data) => dispatch =>
	api.order.entri_po(data)
	.then(res => dispatch(poAdded(res)));

export const getKantor = (nopend) => dispatch => 
	api.order.get_kantor(nopend).then(res => dispatch(kantorIsGet(res)));
