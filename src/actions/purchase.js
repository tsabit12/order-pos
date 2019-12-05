import api from "../api";
import { GET_ID_PO, ADD_PO, FETCH_LIST_PO, FETCH_INVOICE, CLEAR_INVOICE } from "../types";

// export const poFetched = (po) => ({
// 	type: FETCH_PO,
// 	po
// })

export const idpoFetched = (po) => ({
	type: GET_ID_PO,
	po
})

export const topupAdded = (po) => ({
	type: ADD_PO,
	po
})

export const listPoFetched = (po) => ({
	type: FETCH_LIST_PO,
	po
})

export const invoiceFetched = (invoice) => ({
	type: FETCH_INVOICE,
	invoice
})

export const cleared = () => ({
	type: CLEAR_INVOICE
})

export const getPoByid = (id) => dispatch =>
	api.po.get_pobyid(id).then(res => dispatch(idpoFetched(res)))

// export const getPurchase = (data) => dispatch =>
// 	api.po.get_purchase(data).then(res => dispatch(poFetched(res))) 

export const addTopup = (data) => dispatch => 
	api.po.add_topup(data).then(res => dispatch(topupAdded(res)))

export const fetchListpo = (id) => dispatch =>
	api.po.fetch_listpo(id).then(res => dispatch(listPoFetched(res)));

export const getInvoice = (values) => dispatch =>
	api.invoice.laporan(values).then(res => dispatch(invoiceFetched(res)));
	
export const clearInvoice = () => dispatch => dispatch(cleared());