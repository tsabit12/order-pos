import { PETUGAS_FETCHED, FETCH_KURIR, CLEAR_KURIR, FETCH_PETUGAS_PICKUP, ADD_PETUGAS_PICKUP } from "../types";

const initialState = {
	petugas: [],
	kurir: [],
	pickup: []
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
		case FETCH_PETUGAS_PICKUP:
			return {
				...state, pickup: action.petugas
			}
		case ADD_PETUGAS_PICKUP: 
			return {
				...state, pickup: [ action.petugas ]
			}
		default: return state;
	}
}