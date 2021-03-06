import { FETCH_PICKUP, IS_PICKUP } from "../types";
import api from "../api";

// export const handoverIsGet = data => ({
// 	type: GET_HANDOVER,
// 	data
// })

export const isPickup = data => ({
	type: IS_PICKUP,
	data
})

export const reqPickupFecthed = data => ({
	type: FETCH_PICKUP,
	data
})

export const fetchPickup = (userid) => dispatch => 
	api.order.hand_over(userid).then(res => dispatch(reqPickupFecthed(res)));

export const pickup = (data) => dispatch => 
	api.order.pickup(data).then(res => dispatch(isPickup(res)));

// export const getHandover = (data) => dispatch => 
// 	api.order.get_handover(data)
// 	.then(res => dispatch(handoverIsGet(res)));