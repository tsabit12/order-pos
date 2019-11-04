import api from "../api";
import { LIMIT_FETCHED, GET_COUNT_USER, GET_COUNT_FOR_MIRA } from "../types";


export const limitFetched = (result) => ({
	type: LIMIT_FETCHED,
	result
})

export const countUserFetched = (result) => ({
	type: GET_COUNT_USER,
	result
})

export const countMitraFetcher = (result) => ({
	type: GET_COUNT_FOR_MIRA,
	result
})

export const getLimtPo = () => dispatch =>
	api.dashboard.get_polimit()
	.then(res => dispatch(limitFetched(res)))

export const fetchCountUser = () => dispatch =>
	api.dashboard.get_countuser()
		.then(res => dispatch(countUserFetched(res)))

export const fetchCountForMitra = (userid) => dispatch =>
	api.dashboard.get_countForMitra(userid)
		.then(res => dispatch(countMitraFetcher(res)))