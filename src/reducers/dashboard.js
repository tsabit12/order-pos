import { LIMIT_FETCHED, GET_COUNT_USER } from "../types";
const initialState = {
	limit: [],
	admin: {
		usercount: []
	}
}

export default function dashboard( state = initialState, action={}){
	switch(action.type){
		case LIMIT_FETCHED:
			return {
				...state,
				limit: action.result
			}
		case GET_COUNT_USER:
			return{
				...state,
				admin: {
					...state.admin, usercount: action.result
				}
			}
		default: return state;
	}
}