import api from "../api";
import { FETCH_ASSIGMENT, ASSIGMENT_ADDED } from "../types";

export const assigmentFetched = data => ({
	type: FETCH_ASSIGMENT,
	data
}) 

export const assigmentAdded = data => ({
	type: ASSIGMENT_ADDED,
	data
})

export const fetchAssigment = (nopend) => dispatch =>
	api.order.fetch_assigment(nopend)
		.then(res => dispatch(assigmentFetched(res)))

export const addAssigment = (data) => dispatch =>
	api.order.add_assigment(data)
		.then(res => dispatch(assigmentAdded(res)))