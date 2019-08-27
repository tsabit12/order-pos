import { PO_ADDED, KANTOR_FETCHED } from "../types";

const initialState = {
	entripo: [],
	order: [],
	kantor: []
}

export default function order( state = initialState, action={}){
	switch(action.type){
		case PO_ADDED:
			return {
				entripo: [ ...state.entripo, action.data ],
				order: [],
				kantor: [ ... state.kantor ]
			}
		case KANTOR_FETCHED:
			return {
				entripo: [ ...state.entripo ],
				order: [],
				kantor: action.kantor
			}
		default: return state;
	}
}