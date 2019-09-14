import api from "../api";
import { LIMIT_FETCHED } from "../types";


export const limitFetched = (result) => ({
	type: LIMIT_FETCHED,
	result
})

export const getLimtPo = () => dispatch =>
	api.dashboard.get_polimit()
	.then(res => dispatch(limitFetched(res)))