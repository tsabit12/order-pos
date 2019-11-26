import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment, Message, Icon, Dropdown } from "semantic-ui-react";
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { connect } from "react-redux";
import { entriPo } from "../../actions/order";
import Validator from "validator";

class FormEntriPo extends React.Component {
	state = {
		data: {
			desc: '',
			datesRange: '',
			money: '',
			moneyView: '',
			noPo: '',
			username: this.props.email,
			email: this.props.emailAsli,
			vendorname: '0',
			pic: ''
		},
		loading: false,
		errors: {}
	}

	onChange = e => this.setState({ 
		data: { ...this.state.data, [e.target.name]: e.target.value }
	})

	numberWithCommas = (number) => {
    	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	onChangeMoney = (e) => {
		var val = e.target.value.replace(/,/g, '');
		var x = Number(val);
		const value = this.numberWithCommas(x);
		this.setState({ data: {...this.state.data, moneyView: value, money: val } });
	}

	handleChange = (event, {name, value}) => this.setState({ data: { ...this.state.data, [name]: value} })

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this.props.entriPo(this.state.data)
				.then(() => {
					this.setState({ loading: false });
					this.props.entriSuccess(); 
				})
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.desc) errors.desc = "Deskripsi harap di isi";
		if (!data.datesRange) errors.tglStart = "Periode harap di isi";
		if (!data.money) errors.money = "Jumlah uang harap di isi";
		if (!data.noPo) errors.noPo = "Nomor PO tidak boleh kosong";
		if (!data.email) errors.email = "Email harap di isi";
		if (data.vendorname === '0') errors.vendorname = "Perusahaan harap dipilih";
		if (!data.pic) errors.pic = "Nama p.i.c harap di isi";
		if (data.email !== '') {
			if (!Validator.isEmail(data.email)) errors.email = "Email tidak valid";
		}

		if (data.money !== '') {
			if (data.money < 20000) {
				errors.money = "Minimum top up Rp 20.000";
			}else if (data.money > 10000000) {
				errors.money = "Maksimum top up Rp 10.000.000";
			}
		}
		
		return errors;
	}

	handleChangePo = (e) => {
		const clipboard = e.clipboardData;
		const text 		= clipboard.getData('Text');
		this.setState({ data: { ...this.state.data, noPo: text }});
	}

	handleDeletePo = () => this.setState({ data: { ...this.state.data, noPo: '' }})
	handleChangeVendor = (e, data) => this.setState({ data: { ...this.state.data, vendorname: data.value }})

	render(){
		const { loading, errors, data } = this.state;
		
		return(
			<React.Fragment>
				<p style={{marginBottom: '-1em'}}>*Input nomor PO hanya bisa menggunakan (ctrl + v)</p>
				<Segment>
					 { errors.global && <Message negative>
						<Message.Header>Oppps!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
					<Form loading={loading} onSubmit={this.onSubmit}>
				     	<Form.Group widths='equal'>
				     		{ this.state.data.noPo === '' ? <Form.Input 
						    	type="text"
						    	name="noPo"
						    	id="noPo"
						    	label='Nomor PO' 
						    	placeholder='Masukan nomor PO' 
						    	value={data.noPo}
						    	error={errors.noPo}
						    	autoComplete="off"
						    	onPaste={this.handleChangePo}
						    /> : <Form.Input 
						    	type="text"
						    	name="noPo"
						    	id="noPo"
						    	label='Nomor PO' 
						    	placeholder='Masukan nomor PO' 
						    	value={data.noPo}
						    	error={errors.noPo}
						    	autoComplete="off"
						    	onPaste={this.handleChangePo}
						    	icon={<Icon name='times' link onClick={this.handleDeletePo}/>}
						    /> }

						    <Form.Input 
						    	type="text"
						    	name="email"
						    	id="email"
						    	label='Email' 
						    	placeholder='Masukan Email PIC' 
						    	value={data.email}
						    	onChange={this.onChange}
						    	error={errors.email}
						    	autoComplete="off"
						    />
					    </Form.Group>
					    <Form.Group widths='equal'>
					    	<Form.Field error={!!errors.vendorname}>
					    		<label>Nama perusahaan</label>
						    	<Dropdown 
						    	 	value={data.vendorname}
						    	 	options={this.props.refCompany} 
						    	 	selection 
						    	 	onChange={this.handleChangeVendor}
						    	 />
						    	 { errors.vendorname && <span style={{color: "#ae5856"}}>{errors.vendorname}</span>}
					    	</Form.Field>
						    <Form.Input 
						    	type="text"
						    	name="pic"
						    	id="pic"
						    	label='Nama PIC' 
						    	placeholder='Masukan nama pic' 
						    	value={data.pic}
						    	onChange={this.onChange}
						    	error={errors.pic}
						    	autoComplete="off"
						    />
					    </Form.Group>
					    <Form.Field>
					    	<Form.Input 
						    	type="text"
						    	name="desc"
						    	id="desc"
						    	label='Deskripsi' 
						    	placeholder='Masukan deskripsi' 
						    	value={data.desc}
						    	onChange={this.onChange}
						    	error={errors.desc}
						    	autoComplete="off"
						    />
					    </Form.Field>
					    <Form.Group widths='equal'>
						    <Form.Field error={!!errors.tglStart}>
						    	<label>Periode</label>
						    	<DatesRangeInput
						          name="datesRange"
						          placeholder="Mulai - sampai"
						          iconPosition="left"
						          closeOnMouseLeave={false}
						          closable={true}
						          value={data.datesRange}
						          onChange={this.handleChange}
						          dateFormat="YYYY/MM/DD"
						          autoComplete="off"
						          error={!!errors.datesRange}
						        />
						        { errors.tglStart && <span style={{color: "#ae5856"}}>{errors.tglStart}</span>}
						    </Form.Field>
						    <Form.Input 
						    	type="text"
						    	name="money"
						    	id="money"
						    	label='Jumlah Uang' 
						    	placeholder='Masukan jumlah uang' 
						    	value={data.moneyView}
						    	onChange={this.onChangeMoney}
						    	error={errors.money}
						    	autoComplete='off'
						    />
					    </Form.Group>
					    <Button secondary>Tambah</Button>
					 </Form>
				</Segment>
			</React.Fragment>
		);
	}
}

FormEntriPo.propTypes = {
	email: PropTypes.string.isRequired,
	entriPo: PropTypes.func.isRequired,
	entriSuccess: PropTypes.func.isRequired,
	emailAsli: PropTypes.string.isRequired,
	refCompany: PropTypes.array.isRequired
}

export default connect(null, { entriPo })(FormEntriPo);