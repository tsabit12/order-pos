import { FETCH_LIST_PO } from "../types";
const initialState = {
	po: []
}

export default function pouser(state = initialState, action={}){
	switch(action.type){
		case FETCH_LIST_PO:
			return {
				...state, po: action.po
			}
		default: return state;
	}
}