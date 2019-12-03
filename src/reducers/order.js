import { KANTOR_FETCHED, FETCH_ASSIGMENT, GET_TOTALPAGE_ASSIGMENT, ASSIGMENT_ADDED } from "../types";

const initialState = {
	kantor: [],
	assigment: {
		totalPage: 0,
		pages: {},
		items: [],
		noPickup: 0 //number
	}
}

export default function order( state = initialState, action={}){
	switch(action.type){
		case KANTOR_FETCHED:
			return {
				...state,
				kantor: action.kantor
			}
		case GET_TOTALPAGE_ASSIGMENT:
			return {
				...state,
				assigment: {
					...state.assigment,
					totalPage: Math.ceil(action.total / 10)
				}
			}
		case FETCH_ASSIGMENT:
			let indexPage = `page${action.page}`;
			const { pages } = state.assigment;
			const index 	= Object.keys(pages).findIndex(x => x === indexPage);			
			if (index > -1) {
				return{
					...state,
					assigment: {
						...state.assigment,
						pages: {
							...state.assigment.pages,
							[indexPage] : action.items
						},
						items: pages[indexPage]
					}
				}
			}else{ //state empty
				return{
					...state,
					assigment: {
						...state.assigment,
						pages: {
							...state.assigment.pages,
							[indexPage] : action.items
						},
						items: action.items
					}
				}
			}
		case ASSIGMENT_ADDED:
			const oldState = state.assigment.pages;
			return{
				...state,
				assigment: {
					...state.assigment,
					pages: Object.assign(oldState, action.items),
					items: [],
					noPickup: action.noPickup
				}
			}
		default: return state;
	}
}