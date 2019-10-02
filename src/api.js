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
		get_kantor: (nopend) =>
			axios.post(`${process.env.REACT_APP_API}/order/getKantor`, {
				nopend: nopend
			}).then(res => res.data.result),
		fetch_assigment: (nopend) =>
			axios.post(`${process.env.REACT_APP_API}/order/getAssigment`, { 
				nopend: nopend
			}, config).then(res => res.data.result),
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
			axios.post(`${process.env.REACT_APP_API}/petugas/getPetugas`).then(res => res.data.petugas),
		fetch_petugaspickup: (nopend) =>
			axios.post(`${process.env.REACT_APP_API}/petugas/getPetugasPickup`, {
				nopend: nopend
			}).then(res => res.data.petugas),
		add_petugas: (data) => 
			axios.post(`${process.env.REACT_APP_API}/petugas/addPetugasPickup`, {
				nama: data.namapetugas,
				status: data.status,
				nopend: data.nopend,
				nippos: data.nippos
			}, config).then(res => res.data.petugas)
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
	},
	invoice: {
		cetak: (data) => 
			axios.post(`${process.env.REACT_APP_API}/invoice/cetak`, {
				kantor: data.kantor,
				periode: data.datesRange
			}),
		download: (noinvoice) =>
			axios.get(`${process.env.REACT_APP_API}/invoice/download`, {
				params: {no_invoice: noinvoice},
				responseType: 'arraybuffer'
			}),
		laporan: (values) => 
			axios.post(`${process.env.REACT_APP_API}/invoice/laporan`, {
				tanggal: values.tanggal
			}).then(res => res.data.result)
	},
	kurir: {
		get_kurir: (data) =>
			axios.post(`${process.env.REACT_APP_API}/kurir`, {
				regional: data.reg,
				kprk: data.kprk
			}).then(res => res.data.result)
	}
}