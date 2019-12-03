import api from "../api";
import { FETCH_ASSIGMENT, ASSIGMENT_ADDED, GET_TOTALPAGE_ASSIGMENT } from "../types";

export const assigmentFetched = (items, page) => ({
	type: FETCH_ASSIGMENT,
	page: page,
	items
}) 

export const assigmentAdded = (items, noPickup) => ({
	type: ASSIGMENT_ADDED,
	noPickup: noPickup,
	items
})

export const totalPageFetched = (total) => ({
	type: GET_TOTALPAGE_ASSIGMENT,
	total
})

export const fetchAssigment = (nopend, pagination) => dispatch =>
	api.order.fetch_assigment(nopend, pagination)
		.then(res => dispatch(assigmentFetched(res, pagination.page)))

export const getTotalPage = (nopend) => dispatch => 
	api.order.getTotalPageAssign(nopend)
		.then(res => dispatch(totalPageFetched(res)))

export const addAssign = (assigned, newState, other) => dispatch =>
	api.order.postAssigment(assigned, other)
		.then(noPickup => dispatch(assigmentAdded(newState, noPickup)))
