import { 
	GET_TOTAL_PAGE_INVOICE, 
	FETCH_INVOICE, 
	SEARCH_PERIODE_INVOICE,
	CLEAR_SEARCH_INVOICE,
	GET_COUNT_SEARCH_INVOICE,
	GET_DETAIL_INVOICE
} from "../types";

const initialState = {
	totalPage: 0,
	pages: {},
	search: {
		status: false,
		pages: {},
		count: 0,
		params: ''
	},
	detail: {}
}

export default function invoice(state=initialState, action={}){
	switch(action.type){
		case GET_TOTAL_PAGE_INVOICE:
			const { status } = state.search;
			if (!status) {
				return{
					...state,
					totalPage: Math.ceil(Number(action.total) / 8) 
				}
			}else{
				return{...state}
			}
		case FETCH_INVOICE:
			return{
				...state,
				pages:{
					...state.pages,
					[`page${action.page}`]: action.result
				}
			}
		case SEARCH_PERIODE_INVOICE:
			return{
				...state,
				search: {
					...state.search,
					status: true,
					pages: {
						...state.search.pages,
						[`page${action.page}`]: action.result
					},
					params: action.dateRange
				}
			}
		case CLEAR_SEARCH_INVOICE:
			return{
				...state,
				search: {
					...state.search,
					status: false,
					params: ''
				}
			}
		case GET_COUNT_SEARCH_INVOICE:
			return{
				...state,
				totalPage: Math.ceil(Number(action.total) / 8)
			}
		case GET_DETAIL_INVOICE:
			return{
				...state,
				detail: {
					...state.detail,
					[action.param] : action.result
				}
			}
		default: return state;
	}
}