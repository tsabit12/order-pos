import { PO_ADDED, KANTOR_FETCHED, ASSIGMENT_FETCHED, ASSIGMENT_ADDED } from "../types";

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
				entripo: [ ...state.entripo, action.data ], 
				order: [], 
				kantor: [ ... state.kantor ],
				assigment: [ ...state.assigment ]
			}
		case KANTOR_FETCHED:
			return {
				entripo: [ ...state.entripo ], 
				order: [], 
				kantor: action.kantor, 
				assigment: [ ...state.assigment ]
			}
		case ASSIGMENT_FETCHED:
			return {
				entripo: [...state.entripo], 
				order: [], 
				kantor: [...state.kantor], 
				assigment: action.data
			}
		case ASSIGMENT_ADDED: 
			return {
				entripo: [...state.entripo], 
				order: [], 
				kantor: [...state.kantor], 
				assigment: action.data
			}
		default: return state;
	}
}