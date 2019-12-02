import { GET_TOTAL_PAGE_PICKUP, FETCH_REQUEST_PICKUP, SUBMIT_PICKUP } from "../types";

const initialState = {
	pagination: {
		pages: {},
		totalPage: 0
	}
}


export default function pickup(state=initialState, action={}){
	switch(action.type){
		case GET_TOTAL_PAGE_PICKUP: 
			return{
				...state,
				pagination: {
					...state.pagination,
					totalPage: Math.ceil(action.total / 10)
				}
			}

		case FETCH_REQUEST_PICKUP:
			return{
				...state,
				pagination: {
					...state.pagination,
					pages: {
						...state.pagination.pages,
						[`page${action.page}`] : action.items
					}
				}
			}
		case SUBMIT_PICKUP:
			const { pages } = state.pagination;
			return{
				...state,
				pagination: {
					...state.pagination,
					pages: Object.assign(pages, action.items)
				}
			}
		default: return state;
	}
}