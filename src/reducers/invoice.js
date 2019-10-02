import { FETCH_INVOICE, CLEAR_INVOICE } from "../types";

export default function invoice(state=[], action={}){
	switch(action.type){
		case FETCH_INVOICE:
			return action.invoice;
		case CLEAR_INVOICE:
			return [];
		default: return state;
	}
}