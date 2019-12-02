import api from "../api";
import { GET_TOTAL_PAGE_PICKUP, FETCH_REQUEST_PICKUP, SUBMIT_PICKUP } from "../types";

export const totalPageFetched = (total) => ({
	type: GET_TOTAL_PAGE_PICKUP,
	total
})

export const itemsFetched = (items, page) => ({
	type: FETCH_REQUEST_PICKUP,
	page: page,
	items
})

export const pickupSubmited = (items) => ({
	type: SUBMIT_PICKUP,
	items
})

export const getTotalPage = (userid) => dispatch =>
	api.pickup.getTotalPage(userid)
		.then(res => dispatch(totalPageFetched(res)))

export const getItems = (pagination, userid, page) => dispatch =>
	api.pickup.fetchItems(pagination, userid) 
		.then(res => dispatch(itemsFetched(res, page)))

export const submitPickup = (items, newState) => dispatch => 
	api.pickup.addToPickup(items)
		.then(() => dispatch(pickupSubmited(newState)))