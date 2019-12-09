import api from "../api";
import { GET_TOTAL_PAGE_MAPPING, FETCH_MAPPING_KANTOR, FETCH_ONE_KANTOR, UPDATE_MAPPING } from "../types";

export const totalPageFetched = (total) => ({
	type: GET_TOTAL_PAGE_MAPPING,
	total
})

export const mappingFetched = (items, page) => ({
	type: FETCH_MAPPING_KANTOR,
	items,
	page
})

export const getOneKantor = (page, items) => ({
	type: FETCH_ONE_KANTOR,
	items,
	page
})

export const mappingUpdated = (item, page) => ({
	type: UPDATE_MAPPING,
	item,
	page
})

export const getTotalPage = () => dispatch => 
	api.mapping.getTotalPage()
		.then(total => dispatch(totalPageFetched(total)))

export const fetchMapping = (paging) => dispatch =>
	api.mapping.fetchMapping(paging)
		.then(res => dispatch(mappingFetched(res, paging.page)))

export const fetchOneKantor = (payload) => dispatch =>
	api.mapping.fetchOne(payload)
		.then(result => dispatch(getOneKantor(payload.page, result)))

export const updateMapping = (payload) => dispatch =>
	api.mapping.updateMapping(payload)
		.then(res => dispatch(mappingUpdated(res, payload.page)))