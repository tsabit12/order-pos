import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Dropdown } from "semantic-ui-react";
import axios from "axios";

class ReceiverForm extends React.Component{
	state = {
		step: 3,
		data: {
			receiverName: this.props.dataReceiver.receiverName,
			receiverProv: this.props.dataReceiver.receiverProv,
			receiverKab: this.props.dataReceiver.receiverKab,
			receiverKec: this.props.dataReceiver.receiverKec,
			receiverAddress: this.props.dataReceiver.receiverAddress,
			receiverPos: this.props.dataReceiver.receiverPos,
			receiverPhone: this.props.dataReceiver.receiverPhone,
		},
		options: this.props.dataOptions.options,
		optionsKab: this.props.dataOptions.optionsKab,
		optionsKec: this.props.dataOptions.optionsKec,
		optionPostal: this.props.dataOptions.optionPostal,
		loadingsearch: false,
		loadingsearchKab: false,
		loadingsearchKec: false,
		provCode: '',
		kabCode: '',
		errors: {},
		loading: false

	}

	escapeRegExp = (string) => {
		return string.replace(/[~`_/*+?^${}<>()'"|[\]\\]/g, '');
	}

	onChange = (e) => {
		const str 	= e.target.value;
		const value	= this.escapeRegExp(str);

		this.setState({ data: { ...this.state.data, [e.target.name]: value }})
	} 

	onSearchChange = (e, data) => 	{
		clearTimeout(this.timer);
		this.setState({ 
			data: {
				...this.state.data, 
				receiverProv: data.searchQuery,
				receiverKab: '',
				receiverKec: '',
				receiverPos: ''
			},
			optionsKab: [],
			optionsKec: [],
			optionPostal: []
		});
		this.timer = setTimeout(this.fetchProp, 500);
	}

	fetchProp = () => {
		if (!this.state.data.receiverProv) return;
		this.setState({ loadingsearch: true });
		axios.post(`${process.env.REACT_APP_API}/Provinsi/getProv`, {
			provinceName: this.state.receiverProv
		})
			.then(res => res.data.result)
			.then(result => {
				const options = [];
				result.forEach(result => {
					options.push({
						key: result.Kode_Propinsi,
						value: result.Nama_Propinsi,
						text: result.Nama_Propinsi
					})
				});
				this.setState({ loadingsearch: false, options });
			})
			.catch(err => console.log(err));
	}

	onChangeProv = (e, data) => {
		const { key } = data.options.find(o => o.value === data.value);
		this.setState({ 
			data: {
				...this.state.data, receiverProv: data.value,
				receiverKab: '',
				receiverKec: '',
				receiverPos: ''
			}, 
			provCode: key,
			optionsKab: [],
			optionsKec: [],
			optionPostal: []
		});
	}

	onSearchChangeKab = (e, data) => {
		clearTimeout(this.timer);
		this.setState({ data: {...this.state.data, receiverKab: data.searchQuery} });
		this.timer = setTimeout(this.fetchKab, 500);	
	}

	fetchKab = () => {
		if (!this.state.data.receiverKab) return;
		this.setState({ loadingsearchKab: true });
		axios.post(`${process.env.REACT_APP_API}/Provinsi/getKab`, {
			provinceCode: this.state.provCode,
			cityName: this.state.data.receiverKab
		})
			.then(res => res.data.result)
			.then(result =>{
				const optionsKab = [];
				result.forEach(result => {
					optionsKab.push({
						key: result.Kode_Kabupaten,
						value: result.Nama_Kabupaten,
						text: result.Nama_Kabupaten
					})
				});
				this.setState({ loadingsearchKab: false, optionsKab  })
			})
			.catch(err => console.log(err))
	}

	onChangeKab = (e , data) => {
		const { key } = data.options.find(o => o.value === data.value);
		this.setState({ data: {...this.state.data, receiverKab: data.value }, kabCode: key });
	}

	onSearchChangeKec = (e, data) => {
		clearTimeout(this.timer);
		this.setState({ data: {...this.state.data, receiverKec: data.searchQuery} });
		this.timer = setTimeout(this.fetchKec, 500);	
	}

	fetchKec = () => {
		if (!this.state.data.receiverKec) return;
		this.setState({ loadingsearchKec: true });
		axios.post(`${process.env.REACT_APP_API}/Provinsi/getKecamatan`, {
			provinceCode: this.state.provCode,
			cityCode: this.state.kabCode,
			subDistrictName: this.state.data.receiverKec
		})
			.then(res => res.data.result)
			.then(result =>{
				const optionsKec = [];
				result.forEach(result => {
					optionsKec.push({
						key: result.Kode_Kecamatan,
						value: result.Nama_Kecamatan,
						text: result.Nama_Kecamatan
					})
				});
				this.setState({ loadingsearchKec: false, optionsKec  })
			})
			.catch(err => console.log(err));
	}

	onChangeKec = (e, data) => {
		this.setState({ data: {...this.state.data, receiverKec: data.value }, optionPostal: [] });	
		axios.post(`${process.env.REACT_APP_API}/Provinsi/getKodePos`, {
			kecamatan: data.value,
			kabupaten: this.state.kabCode
		}).then(res => res.data.result)
			.then(result => {
				const optionPostal = [];
				result.forEach(list => {
					optionPostal.push({
						key: list.kodepos,
						value: list.kodepos,
						text: list.kodepos
					})
				});
				this.setState({ optionPostal });
			})
	}

	handleChangePos = (e, data) => this.setState({ data: { ...this.state.data, receiverPos: data.value } })

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			const { options, optionsKab, optionsKec, optionPostal } = this.state;
			const dataOption = {
				options: options,
				optionsKab: optionsKab,
				optionsKec: optionsKec,
				optionPostal: optionPostal
			};

			this.setState({ loading: true });
			this.props.submitReceiver(this.state.data, this.state.step, dataOption);
		}
	}

	validate = (data) => {
		const errors = {};
		var regex	 =/^[0-9]+$/;
		if (!data.receiverName) errors.receiverName = "Nama penerima tidak boleh kosong";
		if (!data.receiverProv) errors.receiverProv = "Provinsi harap di isi";
		if (!data.receiverKab) errors.receiverKab = "Kabupaten harap di isi";
		if (!data.receiverKec) errors.receiverKec = "Kecamatan harap di isi";
		if (!data.receiverAddress) errors.receiverAddress = "Alamat tidak boleh kosong";
		if (!data.receiverPos) errors.receiverPos = "Kodepos tidak boleh kosong";
		if (!data.receiverPhone) errors.receiverPhone = "Nomor handphone tidak boleh kosong";

		if (data.receiverPhone !== ''){
			if(!data.receiverPhone.match(regex) || data.receiverPhone.length < 10) errors.receiverPhone = "Nomor handphone tidak valid";
		}

		return errors;
	}

	render(){
		const { step, data, loading, errors } = this.state;

		return(
			<React.Fragment>
				<Form onSubmit={this.onSubmit} loading={loading}>
					<Form.Field>
						<Form.Input
							type="text"
							name="receiverName"
							id="receiverName"
							label="Nama Penerima"
							placeholder="Masukan nama penerima"
							value={data.receiverName}
							onChange={this.onChange}
							error={errors.receiverName}
						/>
					</Form.Field>
					<Form.Group widths="equal">
						<Form.Field error={!!errors.receiverProv}>
					      	<label>Provinsi</label>
					      	<Dropdown
						        placeholder='Cari provinsi..'
						        search
						        selection
						        fluid
						        allowAdditions
						        value={data.receiverProv}
				    			onSearchChange={this.onSearchChange}
				    			options={this.state.options}
				    			loading={this.state.loadingsearch}
				    			onChange={this.onChangeProv}
						    />
					    </Form.Field>	
						<Form.Field error={!!errors.receiverKab}>
					      	<label>Kabupaten</label>
					      	<Dropdown
						        placeholder='Cari kabupaten..'
						        search
						        selection
						        fluid
						        allowAdditions
						        value={data.receiverKab}
				    			onSearchChange={this.onSearchChangeKab}
				    			options={this.state.optionsKab}
				    			loading={this.state.loadingsearchKab}
				    			onChange={this.onChangeKab}
						    />
					    </Form.Field>
					</Form.Group>
					<Form.Group widths='equal'>
						<Form.Field error={!!errors.receiverKec}>
					      	<label>Kecamatan</label>
					      	<Dropdown
						        placeholder='Cari kecamatan..'
						        search
						        selection
						        fluid
						        allowAdditions
						        value={data.receiverKec}
				    			onSearchChange={this.onSearchChangeKec}
				    			options={this.state.optionsKec}
				    			loading={this.state.loadingsearchKec}
				    			onChange={this.onChangeKec}
						    />
					    </Form.Field>
						<Form.Field>
							<Form.Input
								name="receiverAddress"
								id="receiverAddress"
								type="text"
								placeholder="Masukan alamat penerima"
								label="Alamat"
								value={data.receiverAddress}
								onChange={this.onChange}
								error={errors.receiverAddress}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Field error={!!errors.receiverPos}>
							<label>Kode Pos</label>
							<Dropdown 
								clearable 
								options={this.state.optionPostal} 
								selection 
								additionPosition='bottom'
								value={data.receiverPos}
								placeholder="Pilih kode pos"
								onChange={this.handleChangePos}
							/>
						</Form.Field>
						<Form.Field>
					      	<Form.Input
					          label='Nomor Handphone'
					          placeholder="Masukan nomor handphone (08XX XXXX XXXX)"
					          type='text'
					          id="receiverPhone"
					          name="receiverPhone"
					          value={data.receiverPhone}
					          onChange={this.onChange}
					          error={errors.receiverPhone}
					        />
					    </Form.Field>
					</Form.Group>
				
				</Form>
				<br/>
				<Button.Group fluid>
					<Button color='red' onClick={() => this.props.onClickBack(step) }>Kembali</Button>
					<Button secondary onClick={this.onSubmit}>Selanjutnya</Button>
				</Button.Group>
			</React.Fragment>
		);
	}
}

ReceiverForm.propTypes = {
	submitReceiver: PropTypes.func.isRequired,
	dataReceiver: PropTypes.object.isRequired
}

export default ReceiverForm;