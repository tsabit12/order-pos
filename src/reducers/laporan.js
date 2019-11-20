import { FETCH_LAP_ASSIGMENT } from "../types";

const initialState = {
	assigment: []
}

export default function laporan(state=initialState, action={}){
	switch(action.type){
		case FETCH_LAP_ASSIGMENT:
			return{
				...state,
				assigment: action.assigments
			}
		default: return state;
	}
}