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
		hand_over: (kantorid) =>
			axios.post(`${process.env.REACT_APP_API}/order/fetchHandover`, {
				kantorid: kantorid
			}).then(res => res.data.result),
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
			}, config).then(res => res.data.result),
		getDetailPo: (id) => 
			axios.post(`${process.env.REACT_APP_API}/PurchaseOrder/getDetailOrder`, {
				nomor_po: id
			}).then(res => res.data.result)
	},
	invoice: {
		cetak: (data) => 
			axios.post(`${process.env.REACT_APP_API}/invoice/cetak`, {
				nopend: data.nopend,
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
			}).then(res => res.data.result),
		detail: (id) => 
			axios.post(`${process.env.REACT_APP_API}/invoice/laporanDetail`, {
				noinvoice: id
			}).then(res => res.data.result)
	},
	kurir: {
		get_kurir: (data) =>
			axios.post(`${process.env.REACT_APP_API}/kurir`, {
				regional: data.reg,
				kprk: data.kprk,
				level: data.level
			}).then(res => res.data.result),
		add_kurir: (data) => 
			axios.post(`${process.env.REACT_APP_API}/kurir/add`, {
				nama: data.nama,
				email: data.email,
				level: data.level,
				kprk: data.kprk,
				nohp: data.nohp
			}).then(res => res.data.result)
	},
	notifikasi: {
		get_jumlah: () => 
			axios.post(`${process.env.REACT_APP_API}/notifikasi/getJumlahTopup`).then(res => res.data.jumlah),
		get_data_topup: () =>
			axios.post(`${process.env.REACT_APP_API}/notifikasi/getDataToup`).then(res => res.data.result),
		confirm_topup: (data, id) =>
			axios.post(`${process.env.REACT_APP_API}/notifikasi/confirmTopup`, {
				idpo: data.idpo,
				nomor: data.nomor,
				userid: id
			}).then(res => res.data.result)
	}
}