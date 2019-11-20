import { FETCH_LAP_ASSIGMENT, FETCH_HANDOVER } from "../types";

const initialState = {
	assigment: [],
	handover: []
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
		default: return state;
	}
}