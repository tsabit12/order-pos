import api from "../api";
import { GET_ID_PO, ADD_PO, FETCH_LIST_PO, GET_TOTAL_PAGE_PO } from "../types";

export const idpoFetched = (po) => ({
	type: GET_ID_PO,
	po
})

export const topupAdded = (po) => ({
	type: ADD_PO,
	po
})

export const listPoFetched = (po, page) => ({
	type: FETCH_LIST_PO,
	po,
	page
})

export const totalPageFetched = (total) => ({
	type: GET_TOTAL_PAGE_PO,
	total
})

export const getPoByid = (id) => dispatch =>
	api.po.get_pobyid(id).then(res => dispatch(idpoFetched(res)))

export const addTopup = (data) => dispatch => 
	api.po.add_topup(data).then(res => dispatch(topupAdded(res)))

export const fetchListpo = (id, pagination) => dispatch =>
	api.po.fetch_listpo(id, pagination).then(res => dispatch(listPoFetched(res, pagination.page)));

export const getTotalPage = (userid) => dispatch => 
	api.po.getTotalPage(userid)
		.then(total => dispatch(totalPageFetched(total)))