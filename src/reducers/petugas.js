import { PETUGAS_FETCHED } from "../types";

export default function petugas(state=[], action={}){
	switch(action.type){
		case PETUGAS_FETCHED:
			return action.petugas;
		default: return state;
	}
}