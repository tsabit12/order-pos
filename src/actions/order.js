import api from "../api";
import { PO_ADDED } from "../types";

export const poAdded = data => ({
	type: PO_ADDED,
	data
})


export const entriPo = (data) => dispatch =>
	api.order.entri_po(data)
	.then(res => dispatch(poAdded(res)));