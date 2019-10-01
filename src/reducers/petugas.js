import { PETUGAS_FETCHED, FETCH_KURIR, CLEAR_KURIR } from "../types";

const initialState = {
	petugas: [],
	kurir: []
}

export default function petugas(state=initialState, action={}){
	switch(action.type){
		case PETUGAS_FETCHED:
			return {
				...state, petugas: action.petugas
			}
		case FETCH_KURIR: 
			return {
				...state, kurir: action.result
			}
		case CLEAR_KURIR: 
			return {
				...state, kurir: []
			}
		default: return state;
	}
}