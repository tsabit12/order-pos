import { PO_ADDED } from "../types";

const initialState = {
	entripo: [],
	order: []
}

export default function order( state = initialState, action={}){
	switch(action.type){
		case PO_ADDED:
			return {
				entripo: [ ...state.entripo, action.data ],
				order: []
			}
		default: return state;
	}
}