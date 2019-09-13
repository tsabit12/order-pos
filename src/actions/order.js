/* eslint-disable */
import api from "../api";
import { PO_ADDED, KANTOR_FETCHED, ASSIGMENT_FETCHED, ASSIGMENT_ADDED } from "../types";

export const assigmentAdded = result => ({
	type: ASSIGMENT_ADDED,
	result
});

export const assigmentFetched = data => ({
	type: ASSIGMENT_FETCHED,
	data
});

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

export const getKantor = () => dispatch => 
	api.order.get_kantor().then(res => dispatch(kantorIsGet(res)));

export const fetchAssigment = () => dispatch => 
	api.order.fetch_assigment()
	.then(res => dispatch(assigmentFetched(res)));

export const addAssigment = (data, name) => dispatch =>
	api.order.add_assigment(data, name)
	.then(res => dispatch(assigmentAdded(res)))

// let blob = new Blob([res], { type: 'application/pdf' }),
// 	  	url = window.URL.createObjectURL(blob)
// 	  	window.open(url) 

