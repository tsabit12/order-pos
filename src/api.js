import axios from "axios";

export default {
	user: {
		login: (credentials) => 
			axios.post('/auth/login', { credentials }).then(res => res.data.user)
	},
	order: {
		hand_over: () =>
			axios.post('/order/fetchHandover').then(res => res.data.result),
		pickup: (data) =>
			axios.post('/order/pickupHandover', { data }).then(res => res.data.result),
		entri_po: (data) =>
			axios.post('/order/entriPO', { data }).then(res => res.data.result),
		get_kantor: () =>
			axios.post('/order/getKantor').then(res => res.data.result)
	}
}