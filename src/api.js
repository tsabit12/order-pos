import axios from "axios";

export default {
	user: {
		login: (credentials) => 
			axios.post('/auth/login', { credentials }).then(res => res.data.user),
		signup: (data) => 
			axios.post('/register', { 
				username: data.username,
				nopend: data.nopend
			}).then(res => res.data.user)
	},
	order: {
		hand_over: () =>
			axios.post('/order/fetchHandover').then(res => res.data.result),
		pickup: (data) =>
			axios.post('/order/pickupHandover', { data }).then(res => res.data.result),
		entri_po: (data) =>
			axios.post('/order/entriPO', { data }).then(res => res.data.result),
		get_kantor: () =>
			axios.post('/order/getKantor').then(res => res.data.result),
		fetch_assigment: () =>
			axios.post('/order/getAssigment').then(res => res.data.result),
		add_assigment: (data) =>
			axios.post('/order/postAssigment', { 
				idpetugas:data.idpetugas,
				nopickup: data.nopickup,
				pin: data.pin
			}).then(res => res.data.result),
		get_handover: (data) =>
			axios.post('/order/getHandover', { data }).then(res => res.data.result)
	}
}