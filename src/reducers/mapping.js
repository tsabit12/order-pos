import { GET_TOTAL_PAGE_MAPPING, FETCH_MAPPING_KANTOR, FETCH_ONE_KANTOR, UPDATE_MAPPING } from "../types";

const intialState = {
	totalPage: 0,
	pages: {}
}

export default function mapping(state=intialState, action={}){
	switch(action.type){
		case GET_TOTAL_PAGE_MAPPING:
			return{
				...state,
				totalPage: Math.ceil(action.total / 10)
			}
		case FETCH_MAPPING_KANTOR:
			return{
				...state,
				pages: {
					...state.pages,
					[`page${action.page}`] : action.items
				}
			}
		case FETCH_ONE_KANTOR:
			const oldStateOne = state.pages[`page${action.page}`];
			// console.log(oldStateOne);
			return{
				...state,
				pages: {
					...state.pages,
					[`page${action.page}`]: oldStateOne.map(x => {
						if (x.kantor_id === action.items.kantor_id) return action.items;
						return x;
					})
				}
			}
		case UPDATE_MAPPING:
			const oldStateTwo = state.pages[`page${action.page}`];
			return{
				...state,
				pages: {
					...state.pages,
					[`page${action.page}`]: oldStateTwo.map(x => {
						if (x.kantor_id === action.item.kantor_id) return action.item;
						return x;
					}) 
				}
			}
		default: return state
	}
}