import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Dropdown } from "semantic-ui-react";
import axios from "axios";

const config = {
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer 74f5dbde-b920-3504-a41a-7691bf264d36',
		'Accept': 'application/json'
	}
}

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
		options: [],
		optionsKab: [],
		optionsKec: [],
		loadingsearch: false,
		provCode: '',
		kabCode: '',
		kecKode: '',
		errors: {},
		loading: false

	}

	onChange = (e) => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value }})

	onSearchChange = (e, data) => 	{
		clearTimeout(this.timer);
		this.setState({ data: {...this.state.data, receiverProv: data.searchQuery} });
		this.timer = setTimeout(this.fetchProp, 1000);
	}

	fetchProp = () => {
		if (!this.state.data.receiverProv) return;
		this.setState({ loadingsearch: true });
		axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getProvince', {
			provinceName: this.state.receiverProv
		}, config)
			.then(res => res.data.responses.response)
			.then(result => {
				const options = [];
				result.forEach(result => {
					options.push({
						key: result.provinceCode,
						value: result.provinceName,
						text: result.provinceName
					})
				});
				this.setState({ loadingsearch: false, options });
			})
			.catch(err => console.log(err));
	}

	onChangeProv = (e, data) => {
		const { key } = data.options.find(o => o.value === data.value);
		this.setState({ data: {...this.state.data, receiverProv: data.value, receiverKab: ''}, provCode: key });
	}

	onSearchChangeKab = (e, data) => {
		clearTimeout(this.timer);
		this.setState({ data: {...this.state.data, receiverKab: data.searchQuery} });
		this.timer = setTimeout(this.fetchKab, 1000);	
	}

	fetchKab = () => {
		if (!this.state.data.receiverKab) return;
		this.setState({ loadingsearch: true });
		axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getCity', {
			provinceCode: this.state.provCode,
			cityName: this.state.data.receiverKab
		}, config)
			.then(res => res.data.responses.response)
			.then(result =>{
				const optionsKab = [];
				result.forEach(result => {
					optionsKab.push({
						key: result.cityCode,
						value: result.cityName,
						text: result.cityName
					})
				});
				this.setState({ loadingsearch: false, optionsKab  })
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
		this.setState({ loadingsearch: true });
		axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getSubDistrict', {
			provinceCode: this.state.provCode,
			cityCode: this.state.kabCode,
			subDistrictName: this.state.data.receiverKec
		}, config)
			.then(res => res.data.responses.response)
			.then(result =>{
				const optionsKec = [];
				result.forEach(result => {
					optionsKec.push({
						key: result.subDistrictCode,
						value: result.subDistrictName,
						text: result.subDistrictName
					})
				});
				this.setState({ loadingsearch: false, optionsKec  })
			})
			.catch(err => console.log(err));
	}

	onChangeKec = (e, data) => {
		const { key } = data.options.find(o => o.value === data.value);
		this.setState({ data: {...this.state.data, receiverKec: data.value }, kecKode: key });	
	}

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submitReceiver(this.state.data, this.state.step);
		}
	}

	validate = (data) => {
		const errors = {};

		if (!data.receiverName) errors.receiverName = "Nama penerima tidak boleh kosong";
		if (!data.receiverProv) errors.receiverProv = "Provinsi harap di isi";
		if (!data.receiverKab) errors.receiverKab = "Kabupaten harap di isi";
		if (!data.receiverKec) errors.receiverKec = "Kecamatan harap di isi";
		if (!data.receiverAddress) errors.receiverAddress = "Alamat tidak boleh kosong";
		if (!data.receiverPos) errors.receiverPos = "Kodepos tidak boleh kosong";
		if (!data.receiverPhone) errors.receiverPhone = "Nomor handphone tidak boleh kosong";

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
				    			loading={this.state.loadingsearch}
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
				    			loading={this.state.loadingsearch}
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
					<Form.Field>
						<Form.Input
							name="receiverPos"
							id="receiverPos"
							type="text"
							placeholder="Masukan kodepos penerima"
							label="Kodepos"
							value={data.receiverPos}
							onChange={this.onChange}
							error={errors.receiverPos}
						/>
					</Form.Field>
					<Form.Field>
				      	<Form.Input
				          label='Nomor Handphone'
				          placeholder='Masukan nomor handphone penerima'
				          type='text'
				          id="receiverPhone"
				          name="receiverPhone"
				          value={data.receiverPhone}
				          onChange={this.onChange}
				          error={errors.receiverPhone}
				        />
				    </Form.Field>
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