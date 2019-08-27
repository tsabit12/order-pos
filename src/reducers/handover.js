import { FETCH_PICKUP, IS_PICKUP } from "../types";

export default function handover(state = [], action={}){
	switch(action.type){
		case FETCH_PICKUP:
			return action.data;
		case IS_PICKUP:
			return action.data;
		default: return state;
	}
}