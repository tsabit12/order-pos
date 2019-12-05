/* eslint-disable */
import api from "../api";
import { PO_ADDED, KANTOR_FETCHED, DELETE_LIST_PO } from "../types";

export const kantorIsGet = kantor => ({
	type: KANTOR_FETCHED,
	kantor
})

export const poAdded = data => ({
	type: PO_ADDED,
	data
})

export const poDeleted = () => ({
	type: DELETE_LIST_PO
})

export const entriPo = data => dispatch => 
	api.order.validatePo(data.noPo)
		.then(() => dispatch(poAdded(data)))
	// api.order.entri_po(data).then(res => dispatch(poAdded(res)));

export const getKantor = (nopend) => dispatch => 
	api.order.get_kantor(nopend).then(res => dispatch(kantorIsGet(res)));

export const deleteListPo = () => dispatch => dispatch(poDeleted())

export const sendPo = (arr) => dispatch =>
	api.order.sendingPo(arr)
		.then(() => dispatch(poDeleted()))