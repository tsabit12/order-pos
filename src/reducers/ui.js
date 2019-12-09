import { SET_PROGRESS_BAR } from "../types";

const initialState = {
	loading: false,
	version: 'version 1.0.2'
}

export default function ui(state=initialState, action={}){
	switch(action.type){
		case SET_PROGRESS_BAR:
		 	return {
		 		...state,
		 		loading: action.isOpen
		 	}
		default: return state;
	}
}	