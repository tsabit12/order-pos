import { FETCH_INVOICE } from "../types";

export default function invoice(state=[], action={}){
	switch(action.type){
		case FETCH_INVOICE:
			return action.invoice;
		default: return state;
	}
}