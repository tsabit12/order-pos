import { SET_PROGRESS_BAR } from "../types";

export default function ui(state=false, action={}){
	switch(action.type){
		case SET_PROGRESS_BAR:
		 	return action.isOpen;
		default: return state;
	}
}	