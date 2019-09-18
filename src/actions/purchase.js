import api from "../api";
import { GET_ID_PO, FETCH_PO, ADD_PO } from "../types";

export const poFetched = (po) => ({
	type: FETCH_PO,
	po
})

export const idpoFetched = (po) => ({
	type: GET_ID_PO,
	po
})

export const topupAdded = (po) => ({
	type: ADD_PO,
	po
})

export const getPoByid = (id) => dispatch =>
	api.po.get_pobyid(id).then(res => dispatch(idpoFetched(res)))

export const getPurchase = (data) => dispatch =>
	api.po.get_purchase(data).then(res => dispatch(poFetched(res))) 

export const addTopup = (data) => dispatch => 
	api.po.add_topup(data).then(res => dispatch(topupAdded(res)))