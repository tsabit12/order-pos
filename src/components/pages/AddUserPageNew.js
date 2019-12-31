import React from "react";
import Navbar from "../menu/Navbar";
import { Icon, Input, Form, Message, Button, Divider, Header } from 'semantic-ui-react'
import '../css/styles.css';
import api from "../../api";

class AddUserPageNew extends React.Component{
	state = {
		nippos: '',
		errors: {},
		loading: false,
		response: {},
		loadingTambah: false
	}
	
	onChange = (e) => this.setState({ [e.target.name]: e.target.value })

	onSubmit = () => {
		const errors = this.validate(this.state.nippos);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true, response: {} });
			api.user.searchNippos(this.state.nippos)
				.then(res => {
					this.setState({ loading: false, response: res });
				}).catch(err => {
					this.setState({ loading: false, errors: err.response.data.errors });
				});
		}
	}

	validate = (nippos) => {
		const errors = {};
		if (!nippos) errors.nippos = "Nippos harap diisi";
		return errors;
	}

	onChangeResponse = (e) => this.setState({ response: { ...this.state.response, [e.target.name]: e.target.value }})

	onTambah = () => {
		const errors = this.validateKoreksi(this.state.response);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			// console.log(this.state.response);
			this.setState({ loadingTambah: true });
			const { response, nippos } = this.state;
			api.user.add(response, nippos)
				.then(res => this.props.history.push("/user"))
				.catch(err => this.setState({ loadingTambah: false, errors: err.response.data.errors }))
		}
	}

	validateKoreksi = (response) => {
		const errors = {};
		if (!response.Nomor_HP) errors.Nomor_HP = "Nomor handphone petugas harap dilengkapi";
		if (!response.email) errors.email = "Email petugas harap dilengkapi";
		return errors;
	}

	render(){
		const { errors, loading, response, loadingTambah } = this.state;

		return(
			<Navbar>
				<Form onSubmit={() => this.onSubmit()}>
					<div style={{float: 'right'}} className='input-search'>
						<Form.Field error={!!errors.nippos}>
							<Input
							    icon={
							    	<Icon 
							    		name={ loading ? 'circle notched' : 'search' }
							    		inverted 
							    		circular 
							    		link 
							    		onClick={() => this.onSubmit()}
							    		loading={loading}
							    	/>
							    }
							    placeholder='Masukan nippos'
							    fluid
							    name='nippos'
							    id='nippos'
							    value={this.state.nippos}
							    onChange={this.onChange}
							    autoComplete='off'
							    disabled={loading}
							/>
							{ errors.nippos && <span style={{color: 'red'}}>{errors.nippos}</span> }
						</Form.Field>
					</div>
				</Form>
				<div style={{clear: 'both'}} />
				{ errors.global && <Message negative>
				    <Message.Header>Opppss!</Message.Header>
				    <p>{errors.global}</p>
				  </Message> }
				{ Object.keys(response).length >= 1 &&
					<div style={{marginTop: '10px'}}>
					    <Message
					      attached
					      header='Data ditemukan!'
					      content={`Berikut adalah data user dengan nippos = ${this.state.nippos}, klik tombol tambah dibawah untuk menambah petugas`}
					    />
					    <Form className='attached fluid segment' onSubmit={this.onTambah} loading={loadingTambah}>
					      <Form.Group widths='equal'>
					        <Form.Input
					          fluid
					          label='Nama'
					          placeholder='First Name'
					          type='text'
					          value={response.nama}
					          readOnly={true}
					        />
					        <Form.Input
					          fluid
					          label='Nopend'
					          type='text'
					          value={response.nomor_dirian}
					          readOnly={true}
					        />
						    <Form.Input 
						      	label='Jabatan' 
						      	placeholder='Username' 
						      	type='text' 
						      	value={response.jabatan}
						      	readOnly={true}
						    />
					      </Form.Group>
					      <Divider />
					      	<Header size='tiny' style={{textAlign: 'center'}}>Koreksi data petugas dibawah ini</Header>
					      <Divider />
					      { /* username by default nik */}
					      <Form.Group widths='equal'>
						      <Form.Input
						      	label='Email'
						      	name='email'
						      	value={response.email}
						      	placeholder='Masukan email'
						      	onChange={this.onChangeResponse}
						      	error={errors.email}
						      />
						      <Form.Input 
						      	name='Nomor_HP'
						      	placeholder='Masukan nomor hp yang bisa dihubungi'
						      	autoComplete='off'
						      	value={response.Nomor_HP}
						      	onChange={this.onChangeResponse}
						      	label='Nomor HP'
						      	error={errors.Nomor_HP}
						      />
					      </Form.Group>
					      <Button color='blue'>Tambah</Button>
					    </Form>
				  </div> }
			</Navbar>
		);
	}
}

export default AddUserPageNew;