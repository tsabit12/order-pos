import api from "../api";
import { 
	GET_TOTAL_PAGE_INVOICE, 
	FETCH_INVOICE, 
	SEARCH_PERIODE_INVOICE, 
	CLEAR_SEARCH_INVOICE, 
	GET_COUNT_SEARCH_INVOICE,
	GET_DETAIL_INVOICE
} from "../types";

export const totalPageFetched = (total) => ({
	type: GET_TOTAL_PAGE_INVOICE,
	total
})

export const invoiceFetched = (result, page) => ({
	type: FETCH_INVOICE,
	page,
	result
})

export const searchInvoice = (result, page, dateRange) => ({
	type: SEARCH_PERIODE_INVOICE,
	page,
	result,
	dateRange
})

export const isClear = () => ({
	type: CLEAR_SEARCH_INVOICE
})

export const countSearchFetched = (total) => ({
	type: GET_COUNT_SEARCH_INVOICE,
	total
})

export const detailFetched = (result, param) => ({
	type: GET_DETAIL_INVOICE,
	result,
	param
})

export const getTotalPage = () => dispatch =>
	api.invoice.totalPage()
		.then(res => dispatch(totalPageFetched(res)))

export const fetchInvoice = (payload) => dispatch =>
	api.invoice.fetchInvoice(payload)
		.then(res => dispatch(invoiceFetched(res, payload.page)))

export const searchByDate = (payload) => dispatch =>
	api.invoice.searchByDate(payload)
		.then(res => {
			dispatch(searchInvoice(res, payload.page, payload.dateRange));
			//refresh total page by search
			api.invoice.getCountSearch(payload)
				.then(total => dispatch(countSearchFetched(total)))
				.catch(err => console.log(err))
		})

export const clearSearch = () => dispatch => dispatch(isClear())

export const getDetail = (noInvoice) => dispatch => 
	api.invoice.detailInvoice(noInvoice)
		.then(res => dispatch(detailFetched(res, noInvoice)))