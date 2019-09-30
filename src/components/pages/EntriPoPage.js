import React from "react";
import Navbar from "../menu/Navbar";
import { Segment, Header, Form, Button, Icon, Divider, Message } from "semantic-ui-react";
import {
  DateInput
} from 'semantic-ui-calendar-react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { entriPo } from "../../actions/order";
import HasilEntriPo from "../list/HasilEntriPo";

class EntriPoPage extends React.Component {
	state = {
		data: {
			desc: '',
			tglStart: '',
			tglDone: '',
			money: '',
			noPo: '',
			username: this.props.username,
			email: '',
			vendorname: '',
			pic: ''
		},
		loading: false,
		errors: {}
	}

	onChange = e => this.setState({ 
		data: { ...this.state.data, [e.target.name]: e.target.value }
	})

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this.props.entriPo(this.state.data)
				.then(() => this.setState({ loading: false }) )
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.desc) errors.desc = "Deskripsi harap di isi";
		if (!data.tglStart) errors.tglStart = "Tanggal mulai harap di isi";
		if (!data.tglDone) errors.tglDone = "Tanggal selesai harap di isi";
		if (!data.money) errors.money = "Jumlah uang harap di isi";
		if (!data.noPo) errors.noPo = "Nomor PO tidak boleh kosong";
		if (!data.email) errors.email = "Email harap di isi";
		if (!data.vendorname) errors.vendorname = "Email harap di isi";
		if (!data.pic) errors.pic = "Nama p.i.c harap di isi";
		
		return errors;
	}

	handleChange = (event, {name, value}) => this.setState({ data: { ...this.state.data, [name]: value} });

	render(){
		const { data, errors, loading } = this.state;

		return(
			<Navbar>
				<Segment.Group raised>
				    <Segment>
					    <Header as='h2'>
						    <Icon name='address card outline' />
						    <Header.Content>Entri PO</Header.Content>
						</Header>
					    <Divider clearing />
					     <Form loading={loading} onSubmit={this.onSubmit}>
					     	<Form.Group widths='equal'>
							    <Form.Input 
							    	type="text"
							    	name="noPo"
							    	id="noPo"
							    	label='Nomor PO' 
							    	placeholder='Masukan nomor PO' 
							    	value={data.noPo}
							    	onChange={this.onChange}
							    	error={errors.noPo}
							    	autoComplete="off"
							    />
							    <Form.Input 
							    	type="text"
							    	name="email"
							    	id="email"
							    	label='Email VIC' 
							    	placeholder='Masukan Email VIC' 
							    	value={data.email}
							    	onChange={this.onChange}
							    	error={errors.email}
							    	autoComplete="off"
							    />
						    </Form.Group>
						    <Form.Group widths='equal'>
						    	<Form.Input 
							    	type="text"
							    	name="vendorname"
							    	id="vendorname"
							    	label='Nama Vendor' 
							    	placeholder='Masukan nama vendor' 
							    	value={data.vendorname}
							    	onChange={this.onChange}
							    	error={errors.vendorname}
							    	autoComplete="off"
							    />
							    <Form.Input 
							    	type="text"
							    	name="pic"
							    	id="pic"
							    	label='PIC' 
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
							    <Form.Field>
							    	<label>Tanggal Mulai</label>
								    <DateInput
							          name="tglStart"
							          id="tglStart"
							          placeholder="Masukan tanggal selesai YYYY-MM-DD"
							          value={data.tglStart}
							          iconPosition="left"
							          onChange={this.handleChange}
							          autoComplete="off"
							          closable
							          dateFormat="YYYY-MM-DD"
							          error={!!errors.tglStart}
							        />
							    </Form.Field>
							    <Form.Field>
							    	<label>Tanggal Selesai</label>
								    <DateInput
							          name="tglDone"
							          id="tglDone"
							          placeholder="Masukan tanggal selesai YYYY-MM-DD"
							          value={data.tglDone}
							          iconPosition="left"
							          onChange={this.handleChange}
							          autoComplete="off"
							          closable
							          dateFormat="YYYY-MM-DD"
							          error={!!errors.tglDone}
							        />
							    </Form.Field>
							    <Form.Input 
							    	type="number"
							    	name="money"
							    	id="money"
							    	label='Jumlah Uang' 
							    	placeholder='Masukan jumlah uang' 
							    	value={data.money}
							    	onChange={this.onChange}
							    	error={errors.money}
							    />
						    </Form.Group>
						    <Button secondary>Tambah</Button>
						 </Form>

						 { errors.global && <Message negative>
							<Message.Header>Maaf!</Message.Header>
							<p>{errors.global}</p>
						</Message> }

						<Divider />
						<HasilEntriPo listdata={this.props.hasilentri} />
					 </Segment>
				</Segment.Group>
			</Navbar>
		);
	}
}

EntriPoPage.propTypes = {
	entriPo: PropTypes.func.isRequired,
	hasilentri: PropTypes.array.isRequired,
	username: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired
}

function mapStateToProps(state){
	return{
		hasilentri: state.order.entripo,
		username: state.user.userid,
		email: state.user.username
	}
}

export default connect(mapStateToProps, { entriPo })(EntriPoPage);