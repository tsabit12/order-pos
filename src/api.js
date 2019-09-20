import axios from "axios"; 

const config = {
	headers: {
        'Content-type' : 'application/json'
	}
}

export default {
	user: {
		login: (credentials) => 
			axios.post(`${process.env.REACT_APP_API}/auth/login`, { credentials },  config).then(res => res.data.user),
		signup: (data) => 
			axios.post(`${process.env.REACT_APP_API}/register`, { 
				username: data.username,
				nopend: data.nopend,
				password: data.password,
				nama: data.nama
			}).then(res => res.data.user)
	},
	order: {
		hand_over: () =>
			axios.post(`${process.env.REACT_APP_API}/order/fetchHandover`).then(res => res.data.result),
		pickup: (data) =>
			axios.post(`${process.env.REACT_APP_API}/order/pickupHandover`, { data }).then(res => res.data.result),
		entri_po: (data) =>
			axios.post(`${process.env.REACT_APP_API}/entriPo`, { data }).then(res => res.data.result),
		get_kantor: () =>
			axios.post(`${process.env.REACT_APP_API}/order/getKantor`).then(res => res.data.result),
		fetch_assigment: () =>
			axios.post(`${process.env.REACT_APP_API}/order/getAssigment`, config).then(res => res.data.result),
		add_assigment: (data, name) => 
			axios.post(`${process.env.REACT_APP_API}/postAssigment`,  {
				nopickup: data.nopickup,
				idpetugas: data.idpetugas,
				admin: name
			}).then(response => response.data.result),
		get_handover: (data) =>
			axios.post(`${process.env.REACT_APP_API}/order/getHandover`, { data }).then(res => res.data.result)
	},
	petugas: {
		fetc_petugas: () =>
			axios.post(`${process.env.REACT_APP_API}/petugas/getPetugas`).then(res => res.data.petugas)
	},
	dashboard: {
		get_polimit: () =>
			axios.post(`${process.env.REACT_APP_API}/dashboard/limitPo`).then(res => res.data.result)
	},
	po: {
		get_pobyid: (data) => 
			axios.post(`${process.env.REACT_APP_API}/purchaseOrder/getById`, {
				id_po : data.id_po,
				userid: data.userid
			}, config).then(res => res.data.result),
		get_purchase: (data) => 
			axios.post(`${process.env.REACT_APP_API}/purchaseOrder/fetchPo`, {
				level: data.level,
				userid: data.userid
			}, config).then(res => res.data.result),
		add_topup: (data) => 
			axios.post(`${process.env.REACT_APP_API}/addTopUp`, {
				jumlah: data.jumlah,
				hasil: data.hasil,
				id_po: data.id_po,
				userid: data.userid
			}, config).then(res => res.data.result),
		fetch_listpo: (id) => 
			axios.post(`${process.env.REACT_APP_API}/getPoUser`, { 
				userid: id 
			}, config).then(res => res.data.result)
	}
}