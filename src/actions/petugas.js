import { PETUGAS_FETCHED, FETCH_PETUGAS_PICKUP, ADD_PETUGAS_PICKUP } from "../types";
import api from "../api";

export const petugasFetched = petugas => ({
	type: PETUGAS_FETCHED,
	petugas
})

export const petugaspickupFetched = petugas => ({
	type: FETCH_PETUGAS_PICKUP,
	petugas
})

export const petugasAdded = petugas => ({
	type: ADD_PETUGAS_PICKUP,
	petugas
})

export const fetchPetugas = () => dispatch =>
	api.petugas.fetc_petugas()
	.then(res => dispatch(petugasFetched(res)))

export const fetchPetugasPickup = (nopend) => dispatch => 
	api.petugas.fetch_petugaspickup(nopend)
		.then(res => dispatch(petugaspickupFetched(res)))

export const addPetugas = (data) => dispatch => 
	api.petugas.add_petugas(data)
		.then(res => dispatch(petugasAdded(res)))