import { FETCH_PICKUP, IS_PICKUP } from "../types";
import api from "../api";

export const isPickup = data => ({
	type: IS_PICKUP,
	data
})

export const reqPickupFecthed = data => ({
	type: FETCH_PICKUP,
	data
})

export const fetchPickup = () => dispatch => 
	api.order.hand_over().then(res => dispatch(reqPickupFecthed(res)));

export const pickup = (data) => dispatch => 
	api.order.pickup(data).then(res => dispatch(isPickup(res)));