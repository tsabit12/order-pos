import React from "react";
import { Button, Form, Message, Grid, Dimmer, Loader, Divider, Modal, Icon, Dropdown } from 'semantic-ui-react';
import PropTypes from "prop-types";
import axios from "axios";
import InlineError from "../InlineError";

const config = {
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer 74f5dbde-b920-3504-a41a-7691bf264d36',
		'Accept': 'application/json'
	}
}

class OrderForm extends React.Component {
	state = {
		data: {
			senderName: '',
			senderProv: '',
			senderAl: '',
			senderKab: '',
			senderKec: '',
			senderKel: '',
			senderPos: '',
			senderPhone: '',
			receiverName: '',
			receiverProv: '',
			receiverKab: '',
			receiverKec: '',
			receiverKel: '',
			receiverAl: '',
			receiverPos: '',
			receiverPhone: '',
			datafee: '',
			idpo: this.props.idpo
		},
		loading: this.props.loading,
		errors: {},
		fee: this.props.fee,
		open: this.props.open,
		loadingsearch: false,
		loadingsearch2: false,
		loadingsearch3: false,
		options: [],
		options2: [],
		optionsKab: [],
		optionsKab2: [],
		provinceCode: '',
		provinceCode2: '',
		disabled: true,
		errProv: false, //couse it bool
		errorProv: {} //so here the text
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({ 
			loading: nextProps.loading, 
			fee: nextProps.fee, 
			open: nextProps.open, 
			idpo: nextProps.idpo 
		});
	}

	onChange = e => this.setState({ 
		data: { ...this.state.data, [e.target.name]: e.target.value }
	})

	submit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
		}
	}

	submitFee = () => {
		const { data } = this.state;
		this.setState({ loading: true });
		axios.post('/api_sampoerna/order/insertOrder', { data })
			.then(res => res.data.result)
			.then(result => this.setState({ loading: false }))
			.catch(err => {
				this.setState({ errors: err.response.data.errors, loading: false })
			})
	}


	tutupModal = () => this.setState({ open: false })

	changeDropdown = (e, { value }) => this.setState({ data: {...this.state.data, datafee: value} })
	

	onSearchChange = (e, data) => 	{
		clearTimeout(this.timer);
		this.setState({ data: {...this.state.data, senderProv: data.searchQuery} });
		this.timer = setTimeout(this.fetchProp(this.state.data.senderProv), 1000);
	}

	onSearchChange2 = (e, data) => 	{
		clearTimeout(this.timer);
		this.setState({ data: {...this.state.data, receiverProv: data.searchQuery} });
		this.timer = setTimeout(this.fetchProp2(this.state.data.receiverProv), 1000);
	}

	fetchProp = (prov) => {
		if (!this.state.data.senderProv) return;
		this.setState({ loadingsearch: true, loadingsearch3: true });
		axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getProvince', {
			provinceName: prov
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
				this.setState({ loadingsearch: false, options, disabled: false, errorProv: {}, errProv: false, loadingsearch3: false })
			})
			.catch(err => this.setState({ 
				loadingsearch: false, 
				errorProv: {senderProv: "Terdapat kesalahan, ketik lagi untuk refresh"}, 
				errProv: true, 
				loadingsearch3: false}))
	}

	fetchProp2 = (prov) => {
		if (!this.state.data.receiverProv) return;
		this.setState({ loadingsearch: true });
		axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getProvince', {
			provinceName: prov
		}, config)
			.then(res => res.data.responses.response)
			.then(result => {
				const options2 = [];
				result.forEach(result => {
					options2.push({
						key: result.provinceCode,
						value: result.provinceName,
						text: result.provinceName
					})
				});
				this.setState({ loadingsearch: false, options2 })
			})
			.catch(err => this.setState({ loadingsearch: false }))
	}

	onChangeProv = (e, data) => {
		const { key } = data.options.find(o => o.value === data.value);
		this.setState({ data: {...this.state.data, senderProv: data.value, senderKab: ''}, provinceCode: key });
	}

	onChangeProv2 = (e, data) => {
		const { key } = data.options.find(o => o.value === data.value);
		this.setState({ data: {...this.state.data, receiverProv: data.value, receiverKab: ''}, provinceCode2: key });
	}

	onSearchChangeKab = (e, data) => {
		clearTimeout(this.timer);
		this.setState({ data: {...this.state.data, senderKab: data.searchQuery} });
		this.timer = setTimeout(this.fetchKab(this.state.data.senderKab), 1000);	
	}

	onSearchChangeKab2 = (e, data) => {
		clearTimeout(this.timer);
		this.setState({ data: {...this.state.data, receiverKab: data.searchQuery} });
		this.timer = setTimeout(this.fetchKab2(this.state.data.receiverKab), 1000);	
	}

	fetchKab = (city) => {
		if (!this.state.data.senderKab) return;
		this.setState({ loadingsearch2: true });
		axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getCity', {
			provinceCode: this.state.provinceCode,
			cityName: city
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
				this.setState({ loadingsearch2: false, optionsKab  })
			})
			.catch(err => this.setState({ loadingsearch2: false }))

	}

	fetchKab2 = (city) => {
		if (!this.state.data.receiverKab) return;
		this.setState({ loadingsearch2: true });
		axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getCity', {
			provinceCode: this.state.provinceCode2,
			cityName: city
		}, config)
			.then(res => res.data.responses.response)
			.then(result =>{
				console.log(result);
				const optionsKab2 = [];
				result.forEach(result => {
					optionsKab2.push({
						key: result.cityCode,
						value: result.cityName,
						text: result.cityName
					})
				});
				this.setState({ loadingsearch2: false, optionsKab2  })
			})
			.catch(err => this.setState({ loadingsearch2: false }))

	}

	onChangeKab = (e , data) => {
		const { key } = data.options.find(o => o.value === data.value);
		this.setState({ data: {...this.state.data, senderKab: data.value } });
	}

	onChangeKab2 = (e , data) => {
		const { key } = data.options.find(o => o.value === data.value);
		this.setState({ data: {...this.state.data, receiverKab: data.value } });
	}

	validate = (data) => {
		const errors = {};
		if (!data.senderName) errors.senderName = "Harap disi";
		if (!data.senderProv) errors.senderProv = "Harap disi";
		if (!data.senderKab) errors.senderKab = "Harap disi";
		if (!data.senderKec) errors.senderKec = "Harap disi";
		if (!data.senderKel) errors.senderKel = "Harap disi";
		if (!data.senderPos) errors.senderPos = "Harap disi";
		if (!data.senderPhone) errors.senderPhone = "Harap disi";
		if (!data.senderAl) errors.senderAl = "Harap disi";

		if (!data.receiverName) errors.receiverName = "Harap disi";
		if (!data.receiverProv) errors.receiverProv = "Harap disi";
		if (!data.receiverKab) errors.receiverKab = "Harap disi";
		if (!data.receiverKec) errors.receiverKec = "Harap disi";
		if (!data.receiverKel) errors.receiverKel = "Harap disi";
		if (!data.receiverPos) errors.receiverPos = "Harap disi";
		if (!data.receiverPhone) errors.receiverPhone = "Harap disi";
		if (!data.receiverAl) errors.receiverAl = "Harap disi";

		return errors;
	}

	render(){
		const { loading, data, errors, fee, errorProv } = this.state;

		return(
			<React.Fragment>
				<Grid stackable columns={2}>
					<Dimmer active={loading} inverted>
				      <Loader inverted>Loading</Loader>
				    </Dimmer>
    				<Grid.Column>
    					<Message
					      attached
					      header='Pengirim'
					      content='Silahkan isi data pengirim dibawah ini'
					    />
					    <Form className='attached fluid segment'>
					      <Form.Field>
					      	<Form.Input
					          fluid
					          label='Nama pengirim'
					          placeholder='Masukan nama pengirim'
					          type='text'
					          id="senderName"
					          name="senderName"
					          value={data.senderName}
					          onChange={this.onChange}
					          error={errors.senderName}
					        />
					      </Form.Field>
					      <Form.Field>
						      <Form.Input
						          fluid
						          label='Alamat pengirim'
						          placeholder='Masukan alamat pengirim'
						          type='text'
						          id="senderAl"
						          name="senderAl"
						          value={data.senderAl}
						          onChange={this.onChange}
						          error={errors.senderAl}
						        />
					      </Form.Field>
					      <Form.Group widths='equal'>
					      	<Form.Field>
						      	<label>Provinsi</label>
						      	<Dropdown
							        placeholder='Cari provinsi..'
							        search
							        selection
							        fluid
							        allowAdditions
							        value={data.senderProv}
					    			onSearchChange={this.onSearchChange}
					    			options={this.state.options}
					    			loading={this.state.loadingsearch}
					    			onChange={this.onChangeProv}
					    			error={this.state.errProv}
							    />
							    { errorProv.senderProv && <InlineError text={errorProv.senderProv} /> }
						    </Form.Field>
					        <Form.Field>
						      	<label>Kabupaten</label>
						      	<Dropdown
							        placeholder='Cari provinsi..'
							        search
							        selection
							        fluid
							        disabled={this.state.disabled}
							        allowAdditions
							        value={data.senderKab}
					    			onSearchChange={this.onSearchChangeKab}
					    			options={this.state.optionsKab}
					    			loading={this.state.loadingsearch2}
					    			onChange={this.onChangeKab}
							    />
						    </Form.Field>
					        
					      </Form.Group>
					      <Form.Group widths='equal'>
					        <Form.Input
					          fluid
					          label='Kecamatan'
					          placeholder='Masukan kecamatan'
					          type='text'
					          id="senderKec"
					          name="senderKec"
					          value={data.senderKec}
					          onChange={this.onChange}
					          error={errors.senderKec}
					        />
					        <Form.Input
					          fluid
					          label='Kelurahan'
					          placeholder='Masukan kelurahan'
					          type='text'
					          id="senderKel"
					          name="senderKel"
					          value={data.senderKel}
					          onChange={this.onChange}
					          error={errors.senderKel}
					        />
					      </Form.Group>
					      <Form.Field>
					      	<Form.Input
					          fluid
					          label='Kode Pos'
					          placeholder='Masukan kode pos pengirim'
					          type='text'
					          id="senderPos"
					          name="senderPos"
					          value={data.senderPos}
					          onChange={this.onChange}
					          error={errors.senderPos}
					        />
					      </Form.Field>
					      <Form.Field>
					      	<Form.Input
					          fluid
					          label='Nomor Handphone'
					          placeholder='Masukan nomor handphone pengirim'
					          type='text'
					          id="senderPhone"
					          name="senderPhone"
					          value={data.senderPhone}
					          onChange={this.onChange}
					          error={errors.senderPhone}
					        />
					      </Form.Field>
					    </Form>
    				</Grid.Column>
    				<Grid.Column>
    					<Message
					      attached
					      header='Penerima'
					      content='Silahkan isi data penerima dibawah ini'
					    />
					    <Form className='attached fluid segment'>
					      <Form.Field>
					      	<Form.Input
					          fluid
					          label='Nama penerima'
					          placeholder='Masukan nama penerima'
					          type='text'
					          id="receiverName"
					          name="receiverName"
					          value={data.receiverName}
					          onChange={this.onChange}
					          error={errors.receiverName}
					        />
					      </Form.Field>
					      <Form.Field>
						      <Form.Input
						          fluid
						          label='Alamat penerima'
						          placeholder='Masukan alamat penerima'
						          type='text'
						          id="receiverAl"
						          name="receiverAl"
						          value={data.receiverAl}
						          onChange={this.onChange}
						          error={errors.receiverAl}
						        />
					      </Form.Field>
					      <Form.Group widths='equal'>
					      	<Form.Field>
						      	<label>Provinsi</label>
						      	<Dropdown
							        placeholder='Cari provinsi..'
							        search
							        selection
							        fluid
							        allowAdditions
							        value={data.receiverProv}
					    			onSearchChange={this.onSearchChange2}
					    			options={this.state.options2}
					    			loading={this.state.loadingsearch}
					    			onChange={this.onChangeProv2}
							    />
						    </Form.Field>	
						     <Form.Field>
						      	<label>Kabupaten</label>
						      	<Dropdown
							        placeholder='Cari kabupaten..'
							        search
							        selection
							        fluid
							        allowAdditions
							        value={data.receiverKab}
					    			onSearchChange={this.onSearchChangeKab2}
					    			options={this.state.optionsKab2}
					    			loading={this.state.loadingsearch2}
					    			onChange={this.onChangeKab2}
							    />
						    </Form.Field>				        
					      </Form.Group>
					      <Form.Group widths='equal'>
					        <Form.Input
					          fluid
					          label='Kecamatan'
					          placeholder='Masukan kecamatan'
					          type='text'
					          id="receiverKec"
					          name="receiverKec"
					          value={data.receiverKec}
					          onChange={this.onChange}
					          error={errors.receiverKec}
					        />
					        <Form.Input
					          fluid
					          label='Kelurahan'
					          placeholder='Masukan kelurahan'
					          type='text'
					          id="receiverKel"
					          name="receiverKel"
					          value={data.receiverKel}
					          onChange={this.onChange}
					          error={errors.receiverKel}
					        />
					      </Form.Group>
					      <Form.Field>
					      	<Form.Input
					          fluid
					          label='Kode Pos'
					          placeholder='Masukan kode pos penerima'
					          type='text'
					          id="receiverPos"
					          name="receiverPos"
					          value={data.receiverPos}
					          onChange={this.onChange}
					          error={errors.receiverPos}
					        />
					      </Form.Field>
					      <Form.Field>
					      	<Form.Input
					          fluid
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
    				</Grid.Column>
    			</Grid>
    			<Divider />
    			<Button fluid secondary onClick={this.submit}>Order</Button>
    			<Divider />
    			{ fee.length === 0 ? <React.Fragment /> : 
    				<Modal open={this.state.open} size="small">
    					<Dimmer active={loading} inverted>
					        <Loader inverted content='Loading' />
					    </Dimmer>
	    				<Modal.Header>Pilih Layanan</Modal.Header>
						<Modal.Content>
							{ errors.global && <Message negative>
								<Message.Header>Oppps!</Message.Header>
								<p>{errors.global}</p>
							</Message> }
							<Dropdown 
								placeholder='Pilih paket'
							    fluid
							    selection
								options={fee.map(onefee => ({ 
									key: onefee.serviceName, 
									text: onefee.serviceName, 
									value: onefee.serviceCode+'-'+onefee.fee+'-'+onefee.feeTax+'-'+onefee.insurance+'-'+onefee.insuranceTax+'-'+onefee.itemValue }) )}
								onChange={this.changeDropdown}
							/> 
						</Modal.Content>
						<Modal.Actions>
					      <Button color='red' onClick={this.tutupModal}>
					        <Icon name='remove' /> Tutup
					      </Button>
					      <Button primary onClick={this.submitFee}>
					        <Icon name='check' /> Oke
					      </Button>
					    </Modal.Actions>
				  </Modal> }
			</React.Fragment>
		);
	}
}

OrderForm.propTypes = {
	submit: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	fee: PropTypes.array.isRequired,
	open: PropTypes.bool.isRequired
}

export default OrderForm;