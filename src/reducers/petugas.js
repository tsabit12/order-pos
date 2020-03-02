import { PETUGAS_FETCHED, FETCH_KURIR, CLEAR_KURIR, FETCH_PETUGAS_PICKUP, ADD_PETUGAS_PICKUP, ADD_KURIR, GET_LIST_WILAYAH } from "../types";

const initialState = {
	petugas: [],
	kurir: [],
	pickup: [],
	wilayah: []
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
		case ADD_KURIR:
			return {
				...state, kurir: [ ...state.kurir, action.result ]
			}
		case GET_LIST_WILAYAH:
			return{
				...state,
				wilayah: action.res
			}
		default: return state;
	}
}