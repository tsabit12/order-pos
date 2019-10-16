import { GET_NOTIF_TOPUP, REMOVE_NOTIF, GET_DATA_NOTIF_TOPUP, CONFIRM_TOPUP } from "../types";

const intialState = {
	show: true,
	topup: {
		total: '',
		data: []
	}
}

export default function notifikasi(state = intialState, action={}){
	switch(action.type){
		case GET_NOTIF_TOPUP: 
			return {
				...state, topup: {
					...state.topup, total: action.total
				}
			}
		case REMOVE_NOTIF:
			return {
				...state,
				show: false
			}
		case GET_DATA_NOTIF_TOPUP:
			return {
				...state, topup: {
					...state.topup, data: action.data
				}
			}
		case CONFIRM_TOPUP:
			return {
				...state, topup: {
					...state.topup, 
					total: state.topup.total - 1,
					data: state.topup.data.filter(list => list.create_time !== action.data.create_time)
				}
			}
		default: return state;
	}
}