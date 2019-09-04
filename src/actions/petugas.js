import { PETUGAS_FETCHED } from "../types";
import api from "../api";

export const petugasFetched = petugas => ({
	type: PETUGAS_FETCHED,
	petugas
})

export const fetchPetugas = () => dispatch =>
	api.petugas.fetc_petugas()
	.then(res => dispatch(petugasFetched(res)))