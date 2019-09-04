import axios from "axios";

export default {
	user: {
		login: (credentials) => 
			axios.post('/api_sampoerna/auth/login', { credentials }).then(res => res.data.user),
		signup: (data) => 
			axios.post('/api_sampoerna/register', { 
				username: data.username,
				nopend: data.nopend
			}).then(res => res.data.user)
	},
	order: {
		hand_over: () =>
			axios.post('/api_sampoerna/order/fetchHandover').then(res => res.data.result),
		pickup: (data) =>
			axios.post('/api_sampoerna/order/pickupHandover', { data }).then(res => res.data.result),
		entri_po: (data) =>
			axios.post('/api_sampoerna/order/entriPO', { data }).then(res => res.data.result),
		get_kantor: () =>
			axios.post('/api_sampoerna/order/getKantor').then(res => res.data.result),
		fetch_assigment: () =>
			axios.post('/api_sampoerna/order/getAssigment').then(res => res.data.result),
		add_assigment: (data) =>
			axios.post('/api_sampoerna/order/postAssigment', { 
				idpetugas:data.idpetugas,
				nopickup: data.nopickup,
				pin: data.pin
			}).then(res => res.data.result),
		get_handover: (data) =>
			axios.post('/api_sampoerna/order/getHandover', { data }).then(res => res.data.result)
	},
	petugas: {
		fetc_petugas: () =>
			axios.post('/api_sampoerna/petugas/getPetugas').then(res => res.data.petugas)
	}
}