import React from "react";
import { Button, Form, Message, Grid, Dimmer, Loader, Divider, Modal, Icon, Dropdown } from 'semantic-ui-react';
import PropTypes from "prop-types";
import axios from "axios";

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
		open: this.props.open
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
		axios.post('/order/insertOrder', { data })
			.then(res => res.data.result)
			.then(result => this.setState({ loading: false }))
			.catch(err => {
				this.setState({ errors: err.response.data.errors, loading: false })
			})
	}


	tutupModal = () => this.setState({ open: false })

	changeDropdown = (e, { value }) => this.setState({ data: {...this.state.data, datafee: value} });

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
		const { loading, data, errors, fee } = this.state;
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
					        <Form.Input
					          fluid
					          label='Provinsi'
					          placeholder='Masukan provinsi'
					          type='text'
					          id="senderProv"
					          name="senderProv"
					          value={data.senderProv}
					          onChange={this.onChange}
					          error={errors.senderProv}
					        />
					        <Form.Input
					          fluid
					          label='Kabupaten'
					          placeholder='Masukan kabupaten'
					          type='text'
					          id="senderKab"
					          name="senderKab"
					          value={data.senderKab}
					          onChange={this.onChange}
					          error={errors.senderKab}
					        />
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
					        <Form.Input
					          fluid
					          label='Provinsi'
					          placeholder='Masukan provinsi'
					          type='text'
					          id="receiverProv"
					          name="receiverProv"
					          value={data.receiverProv}
					          onChange={this.onChange}
					          error={errors.receiverProv}
					        />
					        <Form.Input
					          fluid
					          label='Kabupaten'
					          placeholder='Masukan kabupaten'
					          type='text'
					          id="receiverKab"
					          name="receiverKab"
					          value={data.receiverKab}
					          onChange={this.onChange}
					          error={errors.receiverKab}
					        />
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
								<Message.Header>Maaf!</Message.Header>
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