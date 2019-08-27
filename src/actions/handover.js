import { FETCH_HANDOVER, IS_PICKUP } from "../types";
import api from "../api";

export const isPickup = data => ({
	type: IS_PICKUP,
	data
})

export const handoverFecthed = data => ({
	type: FETCH_HANDOVER,
	data
})

export const fetchHandOver = () => dispatch => 
	api.order.hand_over().then(res => dispatch(handoverFecthed(res)));

export const pickup = (data) => dispatch => 
	api.order.pickup(data).then(res => dispatch(isPickup(res)));