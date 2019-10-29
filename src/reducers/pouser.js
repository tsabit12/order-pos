// import produce from "immer"; 
import { FETCH_LIST_PO, FETCH_LAPORAN_ORDER } from "../types";

const initialState = {
	po: [],
	order: []
}

export default function pouser(state = initialState, action={}){
	switch(action.type){
		case FETCH_LIST_PO:
			return {
				...state, po: action.po
			}

		//method is save all data wherever user search
		//and then filter it with mapStateToProps
		case FETCH_LAPORAN_ORDER:
			const indexes = state.order.map((x, i) => x.tanggal_order === action.result[0].tanggal_order ? i : null).filter(i => i !== null);
			//data alerady in state we should update
			if (indexes.length > 0) {
				const updatedOrder = state.order.filter(x => x.tanggal_order !== action.result[0].tanggal_order);
				return {
					...state,
					order: [ ...updatedOrder, ...action.result ]
				}
			}else{ 
				//add new item
				return {
					...state,
					order: [ ...state.order, ...action.result ]
				}
			}
		default: return state;
	}
}