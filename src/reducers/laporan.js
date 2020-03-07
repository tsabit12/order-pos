import { 
	FETCH_LAP_ASSIGMENT, 
	FETCH_HANDOVER, 
	FETCH_SELESAI_ANTAR, 
	FETCH_LAP_PICKUP, 
	GET_TARIF_LAYANAN, 
	GET_DETAIL_TARIF, 
	GET_NEXT_PAGE_DETAIL_TARIF,
	GET_REF_LAYANAN
} from "../types";

const initialState = {
	assigment: [],
	handover: [],
	selesaiAntar: [],
	reqPickup: [],
	tarif: {
		list: [],
		detail: {
			nopend_layanan: []
		}
	},
	layanan: []
}

export default function laporan(state=initialState, action={}){
	switch(action.type){
		case FETCH_LAP_ASSIGMENT:
			return{
				...state,
				assigment: action.assigments
			}
		case FETCH_HANDOVER: 
			return {
				...state, 
				handover: action.handover
			}
		case FETCH_SELESAI_ANTAR: 
			return {
				...state,
				selesaiAntar: action.result
			}
		case FETCH_LAP_PICKUP:
			return{
				...state,
				reqPickup: action.pickup
			}
		case GET_TARIF_LAYANAN:
			return{
				...state,
				tarif: {
					...state.tarif,
					list: action.response
				}
			}
		case GET_DETAIL_TARIF:
			return{
				...state,
				tarif: {
					...state.tarif,
					detail:{
						...state.tarif.detail,
						[`${action.nopend}_${action.layanan}`] : action.res
					}
				}
			}
		case GET_NEXT_PAGE_DETAIL_TARIF:
			const oldStateDetail = state.tarif.detail[`${action.payload.nopend}_${action.payload.layanan}`];
			return{
				...state,
				tarif: {
					...state.tarif,
					detail: {
						...state.tarif.detail,
						[`${action.payload.nopend}_${action.payload.layanan}`] : oldStateDetail.concat(action.res)
					}
				}
			}
		case GET_REF_LAYANAN:
			return{
				...state,
				layanan: action.layanan
			}
		default: return state;
	}
}