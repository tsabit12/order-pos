import { SET_PROGRESS_BAR, SET_LOADING } from "../types";

const initialState = {
	loading: false,
	version: 'version 1.0.4',
	loader: false
}

export default function ui(state=initialState, action={}){
	switch(action.type){
		case SET_PROGRESS_BAR:
		 	return {
		 		...state,
		 		loading: action.isOpen
		 	}
		 case SET_LOADING:
		 	return{
		 		...state,
		 		loader: action.isLoading
		 	}
		default: return state;
	}
}	