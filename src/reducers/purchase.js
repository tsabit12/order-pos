import { GET_ID_PO, FETCH_PO, ADD_PO } from "../types";

export default function purchase(state=[], action={}){
	switch(action.type){
		case FETCH_PO:
			return action.po;
		case GET_ID_PO:
			const index = state.findIndex(result => result.id_po === action.po.id_po);
	    	if (index > -1) {
	        	return state.map(result => {
	        		if (result.id_po === action.po.id_po) return action.po;
	        		return result;
	        	});
	    	}else{
	    		return [
	    			...state,
	    			action.result
	    		];
	    	}
	    case ADD_PO: //this is top up
	    	return state.map(data => {
	    		if (data.id_po === action.po.id_po) return action.po;
	    		return data;
	    	})
		default: return state;
	}
}