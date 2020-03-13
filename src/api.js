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
				nama: data.nama,
				nohp: data.nohp
			}).then(res => res.data.user),
		sendEmail: (email) =>
			axios.post(`${process.env.REACT_APP_API}/auth/sendEmail`, {
				email: email
			}),
		confirmation: (payload) => 
			axios.post(`${process.env.REACT_APP_API}/auth/confirmationAkun`,{
				email: payload.email,
				userid: payload.userid
			}).then(res => res.data.response),
		ganti_password:(data) =>
			axios.post(`${process.env.REACT_APP_API}/auth/changePassword`, {
				userid: data.userid,
				password: data.password
			}),
		forgotPassword: (email) =>
			axios.post(`${process.env.REACT_APP_API}/auth/forgotPassword`, {
				email: email
			}),
		changePassword: (token) =>
			axios.post(`${process.env.REACT_APP_API}/auth/validateToken`, {
				token: token
			}),
		gantiPassword: (data) => 
			axios.post(`${process.env.REACT_APP_API}/auth/lupaPasswordPost`,{
				userid: data.userid,
				password: data.password
			}),
		searchNippos: (nippos) =>
			axios.post(`${process.env.REACT_APP_API}/user/searchNippos`,{
				nippos: nippos
			}).then(res => res.data.user),
		add: (payload, nippos) => 
			axios.post(`${process.env.REACT_APP_API}/user/add`, {
				username: payload.nik_alias,
				nohp: payload.Nomor_HP,
				email: payload.email,
				nopend: payload.nomor_dirian,
				nama: payload.nama,
				nippos: nippos
			})
	},
	order: {
		hand_over: (userid) =>
			axios.post(`${process.env.REACT_APP_API}/order/fetchHandover`, {
				userid: userid
			}).then(res => res.data.result),
		pickup: (data) =>
			axios.post(`${process.env.REACT_APP_API}/order/pickupHandover`, { data }).then(res => res.data.result),
		entri_po: (data) =>
			axios.post(`${process.env.REACT_APP_API}/entriPo`, { data }).then(res => res.data.result),
		get_kantor: (nopend) =>
			axios.post(`${process.env.REACT_APP_API}/order/getKantor`, {
				nopend: nopend
			}).then(res => res.data.result),
		fetch_assigment: (nopend, pagination) =>
			axios.get(`${process.env.REACT_APP_API}/order/getAssigment`, { 
				params: {
					nopend: nopend,
					limit: pagination.limit,
					offset: pagination.offset
				}
			}, config).then(res => res.data.items),
		add_assigment: (data) => 
			axios.post(`${process.env.REACT_APP_API}/postAssigment`,  {
				noreq: data.noreq,
				idpetugas: data.petugasId,
				admin: data.nama,
				nopend: data.nopend
			}).then(response => response.data.result),
		get_handover: (data) =>
			axios.post(`${process.env.REACT_APP_API}/order/getHandover`, { 
				nopickup: data.nopickup,
				nopend: data.nopend,
				pin: data.pin
			}).then(res => res.data.result),
		getRefSender: (kantor) =>
			axios.post(`${process.env.REACT_APP_API}/order/getRefSender`, {
				kantorId: kantor
			}).then(res => res.data.result),
		getTotalPageAssign: (nopend) =>
			axios.post(`${process.env.REACT_APP_API}/order/getTotalPageAssign`, {
				nopend: nopend
			}).then(res => res.data.total),
		notifAssign: (assigned) =>
			axios.post(`${process.env.REACT_APP_API}/order/getNotifAssign`, {
				extId: assigned //array
			}).then(res => res.data.result),
		postAssigment: (assigned, other) =>
			axios.post(`${process.env.REACT_APP_API}/postAssigment/generate`, {
				extId: assigned,
				nopend: other.nopend,
				petugasId: other.petugasId
			}).then(res => res.data.noPickup),
		downloadTugas: (noPickup, nama) =>
			axios.get(`${process.env.REACT_APP_API}/pdf/assigment`, {
				params: { 
					no_pickup: noPickup,
					nama: nama
				},
				responseType: 'arraybuffer'
			}).then(res => res.data),
		validatePo: (noPo) =>
			axios.post(`${process.env.REACT_APP_API}/order/validatePo`, {
				nomor_po: noPo
			}),
		sendingPo: (arr) =>
			axios.post(`${process.env.REACT_APP_API}/order/sendPo`, {
				payloadBody: arr
			}),
		validateKantor: (kantorid) =>
			axios.post(`${process.env.REACT_APP_API}/order/validateKantor`, {
				kantor: kantorid
			})
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
				nama: data.nama,
				status: data.status,
				nopend: data.kprk,
				nippos: data.idpetugas,
				email: data.email,
				password: 'AAaa123$'
			}, config).then(res => res.data.petugas),
		cariPetugas: (nippos, nopend) =>
			axios.post(`${process.env.REACT_APP_API}/petugas/cariPetugas`, {
				nippos: nippos,
				nopend: nopend
			}).then(res => res.data.petugas),
		validasiPickup: (data) => 
			axios.post(`${process.env.REACT_APP_API}/petugas/validasiPickup`, {
				nomorpickup: data.nopickup,
				pin: data.pin,
				nopend: data.nopend,
				userid: data.userid
			}).then(res => res.data.result),
		submitPickup: (data) => 
			axios.post(`${process.env.REACT_APP_API}/petugas/submitPickup`, {
				...data
			}).then(res => res.data.result),
		addPosting: (nopickup) =>
			axios.post(`${process.env.REACT_APP_API}/petugas/addPosting`, {
				nopickup
			}).then(res => res.data.result)
	},
	dashboard: {
		get_polimit: () =>
			axios.post(`${process.env.REACT_APP_API}/dashboard/limitPo`).then(res => res.data.result),
		get_countuser: () =>
			axios.post(`${process.env.REACT_APP_API}/dashboard/getCountUser`).then(res => res.data.result),
		get_countForMitra: (id) =>
			axios.post(`${process.env.REACT_APP_API}/dashboard/getCountForMitra`, {
				userid: id
			}).then(res => res.data.result)
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
		fetch_listpo: (id, pagination) => 
			axios.post(`${process.env.REACT_APP_API}/getPoUser`, { 
				userid: id,
				offset: pagination.offset,
				limit: pagination.limit
			}, config).then(res => res.data.result),
		getDetailPo: (id) => 
			axios.post(`${process.env.REACT_APP_API}/PurchaseOrder/getDetailOrder`, {
				nomor_po: id
			}).then(res => res.data.result),
		getRefCompany: () =>
			axios.post(`${process.env.REACT_APP_API}/entriPo/getRefCompany`).then(res => res.data.result),
		getLine: (noPo) =>
			axios.post(`${process.env.REACT_APP_API}/PurchaseOrder/getLinePo`, {
				nomor_po: noPo
			}).then(res => res.data.result),
		getTotalPage: (id) =>
			axios.post(`${process.env.REACT_APP_API}/getPoUser/getTotalPage`, {
				userid: id
			}).then(res => res.data.total)
	},
	invoice: {
		getGenerate: (payload) =>
			axios.post(`${process.env.REACT_APP_API}/invoice/getGenerate`, {
				tglAwal: payload.tglAwal,
				tglAkhir: payload.tglAkhir,
				noPo: payload.nopo
			}).then(res => res.data.result),
		generate: (noPickup, nopo, userid) =>
			axios.post(`${process.env.REACT_APP_API}/invoice/generate`, {
				no_pickup: noPickup,
				id_po: nopo,
				userid: userid
			}).then(res => res.data.noinvoice),
		download: (noinvoice) => 
			axios.get(`${process.env.REACT_APP_API}/pdf/invoice`, {
				params: { noInvoice: noinvoice },
				responseType: 'arraybuffer'
			}).then(res => res.data),
		totalPage: () =>
			axios.post(`${process.env.REACT_APP_API}/invoice/getTotalPage`).then(res => res.data.total),
		fetchInvoice: (payload) =>
			axios.get(`${process.env.REACT_APP_API}/invoice/fetchInvoice`, {
				params: {
					limit: payload.limit,
					offset: payload.offset
				}
			}).then(res => res.data.result),
		searchByDate: (payload) =>
			axios.get(`${process.env.REACT_APP_API}/invoice/invoicePeriode`, {
				params: {
					tglAwal: payload.tglAwal,
					tglAkhir: payload.tglAkhir,
					limit: payload.limit,
					offset: payload.offset
				}
			}).then(res => res.data.result),
		getCountSearch: (payload) =>
			axios.post(`${process.env.REACT_APP_API}/invoice/getCountSearch`, {
				tglAwal: payload.tglAwal,
				tglAkhir: payload.tglAkhir
			}).then(res => res.data.total),
		detailInvoice: (noInvoice) =>
			axios.get(`${process.env.REACT_APP_API}/invoice/getDetail`, {
				params: {noInvoice: noInvoice}
			}).then(res => res.data.result),
		downloadDetail: (noInvoice) =>
			axios.get(`${process.env.REACT_APP_API}/pdf/detailInvoice`, {
				params: { noInvoice: noInvoice },
				responseType: 'arraybuffer'
			}).then(res => res.data),
		downloadDetailExcel: (noInvoice) =>
			axios.get(`${process.env.REACT_APP_API}/pdf/detailInvoiceExcel`, {
				params: { noInvoice: noInvoice }
			}).then(res => res.data)
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
			}).then(res => res.data.result),
		getExternalId: (extId) =>
			axios.post(`${process.env.REACT_APP_API}/kurir/getExternalId`, {
				extId: extId
			}).then(res => res.data.result),
		updateBiaya: (data) => 
			axios.post(`${process.env.REACT_APP_API}/kurir/updateBiaya`, {
				extId: data.no_barcode,
				biaya: data.biaya_pickup
			})
	},
	laporan: {
		get_order: (tanggal, id) => 
			axios.post(`${process.env.REACT_APP_API}/laporan/getOrder`, {
				tanggal: tanggal,
				id: id
			}).then(res => res.data.result),
		get_assigment: (userid) =>
			axios.post(`${process.env.REACT_APP_API}/laporan/getAssigment`, {
				userid: userid
			}).then(res => res.data.assigments),
		getHandover: (userid) =>
			axios.post(`${process.env.REACT_APP_API}/laporan/getHandover`, {
				userid: userid
			}).then(res => res.data.handover),
		getSelesaiAntar: (userid) =>
			axios.post(`${process.env.REACT_APP_API}/laporan/getSelesaiAntar`, {
				userid: userid
			}).then(res => res.data.result),
		getPickup: (userid) =>
			axios.post(`${process.env.REACT_APP_API}/laporan/getLapPickup`, {
				userid: userid
			}).then(res => res.data.pickup),
		getTarifLayanan: () => 
			axios.post(`${process.env.REACT_APP_API}/laporan/getTarifLayanan`).then(res => res.data.result),
		getDetailTarif: (nopendAsal, layanan, paging) =>
			axios.post(`${process.env.REACT_APP_API}/laporan/getDetailTarif`, {
				nopendAsal: nopendAsal,
				layanan: layanan,
				limit: paging.limit,
				offset: paging.offset
			}).then(res => res.data.result),
		getRefLayanan: () => axios.post(`${process.env.REACT_APP_API}/laporan/getRefLayanan`).then(res => res.data.result)
	},
	pickup: {
		getTotalPage: (userid) => 
			axios.post(`${process.env.REACT_APP_API}/pickup/getTotalPage`, {
				userid: userid
			}).then(res => res.data.result),
		fetchItems: (pages, userid) => 
			axios.get(`${process.env.REACT_APP_API}/pickup/fetchData`, {
				params: {
					offset: pages.offset,
					limit: pages.limit,
					userid: userid
				}
			}).then(res => res.data.result),
		addToPickup: (items) =>
			axios.post(`${process.env.REACT_APP_API}/pickup/addPickup`, {
				extId: items //array
			})
	},
	mapping: {
		getTotalPage: () => 
			axios.post(`${process.env.REACT_APP_API}/mapping/getTotalPage`).then(res => res.data.total),
		fetchMapping: (paging) =>
			axios.post(`${process.env.REACT_APP_API}/mapping/fetchData`, {
				offset: paging.offset,
				limit: paging.limit
			}).then(res => res.data.result),
		fetchOne: (payload) =>
			axios.post(`${process.env.REACT_APP_API}/mapping/fetchOne`, {
				kantorId: payload.kantorId,
				no: payload.no
			}).then(res => res.data.result),
		getRegional: () => 
			axios.post(`${process.env.REACT_APP_API}/mapping/getRegional`).then(res => res.data.reg),
		getKprk: (wilayah) =>
			axios.post(`${process.env.REACT_APP_API}/mapping/getKprk`, {
				wilayah: wilayah
			}).then(res => res.data.kprk),
		updateMapping: (payload) =>
			axios.post(`${process.env.REACT_APP_API}/mapping/updateMapping`, {
				RowNum: payload.RowNum,
				nopend: payload.nopend,
				kantorId: payload.kantorId	
			}).then(res => res.data.result)
	},
	tarif: {
		addTarif: (payload) => 
			axios.post(`${process.env.REACT_APP_API}/tarif/add`, {
				...payload
			}).then(res => res.data.result)
	}
}