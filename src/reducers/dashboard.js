import { LIMIT_FETCHED } from "../types";
const initialState = {
	limit: []
}

export default function dashboard( state = initialState, action={}){
	switch(action.type){
		case LIMIT_FETCHED:
			return {
				limit: action.result
			}
		default: return state;
	}
}