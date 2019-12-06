// import produce from "immer"; 
import { FETCH_LIST_PO, FETCH_LAPORAN_ORDER, GET_TOTAL_PAGE_PO } from "../types";

const initialState = {
	po: {
		pages: {},
		totalPage: 0
	},
	order: []
}

export default function pouser(state = initialState, action={}){
	switch(action.type){
		case GET_TOTAL_PAGE_PO:
			return{
				...state,
				po: {
					...state.po,
					totalPage: Math.ceil(action.total / 10)
				}
			}
		case FETCH_LIST_PO:
			return {
				...state,
				po: {
					...state.po,
					pages: {
						...state.po.pages,
						[`page${action.page}`] : action.po
					}
				}
			}

		case FETCH_LAPORAN_ORDER:
			const indexes = state.order.map((x, i) => x.tanggal_order === action.result[0].tanggal_order ? i : null).filter(i => i !== null);
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