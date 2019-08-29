import { GET_HANDOVER } from "../types";

export default function lasthandover(state=[], action={}){
	switch(action.type){
		case GET_HANDOVER:
			return action.data;
		default: return state;
	}
}