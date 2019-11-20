import { FETCH_LAP_ASSIGMENT, FETCH_HANDOVER, FETCH_SELESAI_ANTAR, FETCH_LAP_PICKUP } from "../types";

const initialState = {
	assigment: [],
	handover: [],
	selesaiAntar: [],
	reqPickup: []
}

export default function laporan(state=initialState, action={}){
	switch(action.type){
		case FETCH_LAP_ASSIGMENT:
			return{
				...state,
				assigment: action.assigments
			}
		case FETCH_HANDOVER: 
			return {
				...state, 
				handover: action.handover
			}
		case FETCH_SELESAI_ANTAR: 
			return {
				...state,
				selesaiAntar: action.result
			}
		case FETCH_LAP_PICKUP:
			return{
				...state,
				reqPickup: action.pickup
			}
		default: return state;
	}
}