import { PO_ADDED, KANTOR_FETCHED, FETCH_ASSIGMENT, ASSIGMENT_ADDED } from "../types";

const initialState = {
	entripo: [],
	order: [],
	kantor: [],
	assigment: []
}

export default function order( state = initialState, action={}){
	switch(action.type){
		case PO_ADDED:
			return {
				...state, entripo: [ action.data ], order: []
			}
		case KANTOR_FETCHED:
			return {
				entripo: [ ...state.entripo ], 
				order: [], 
				kantor: action.kantor, 
				assigment: [ ...state.assigment ]
			}
		case FETCH_ASSIGMENT:
			return {
				...state,
				assigment: action.data
			}
		case ASSIGMENT_ADDED:
			return {
				...state,
				assigment: action.data.data
			}
		default: return state;
	}
}