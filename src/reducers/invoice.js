import { GET_TOTAL_PAGE_INVOICE, FETCH_INVOICE } from "../types";

const initialState = {
	totalPage: 0,
	pages: {}
}

export default function invoice(state=initialState, action={}){
	switch(action.type){
		case GET_TOTAL_PAGE_INVOICE:
			return{
				...state,
				totalPage: Math.ceil(Number(action.total) / 10) 
			}
		case FETCH_INVOICE:
			return{
				...state,
				pages:{
					...state.pages,
					[`page${action.page}`]: action.result
				}
			}
		default: return state;
	}
}