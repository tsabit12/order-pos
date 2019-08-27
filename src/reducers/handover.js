import { FETCH_HANDOVER, IS_PICKUP } from "../types";

export default function handover(state = [], action={}){
	switch(action.type){
		case FETCH_HANDOVER:
			return action.data;
		case IS_PICKUP:
			return action.data;
		default: return state;
	}
}