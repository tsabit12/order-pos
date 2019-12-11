import api from "../api";
import { GET_TOTAL_PAGE_INVOICE, FETCH_INVOICE } from "../types";

export const totalPageFetched = (total) => ({
	type: GET_TOTAL_PAGE_INVOICE,
	total
})

export const invoiceFetched = (result, page) => ({
	type: FETCH_INVOICE,
	page,
	result
})

export const getTotalPage = () => dispatch =>
	api.invoice.totalPage()
		.then(res => dispatch(totalPageFetched(res)))

export const fetchInvoice = (payload) => dispatch =>
	api.invoice.fetchInvoice(payload)
		.then(res => dispatch(invoiceFetched(res, payload.page)))