import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";

class AddPetugasForm extends React.Component {
	state = {
		data: {
			nama: this.props.petugas.nama,
			idpetugas: this.props.petugas.ID_Pegawai,
			kprk: this.props.petugas.Kprk,
			status: '00',
			email: this.props.petugas.email
		},
		loading: false,
		errors: {}
	}

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.email) {
			errors.email = "Masukkan email petugas pickup";
		}else{
			if (!Validator.isEmail(data.email)) errors.email = "Email tidak valid";
		}
		return errors;
	}

	onChange = (e) => this.setState({ data: { ...this.state.data, email: e.target.value }});

	render(){
		const { data, loading, errors } = this.state;
		return(
			<React.Fragment>
				{ errors.global && <Message negative>
						<Message.Header>Oppps!</Message.Header>
						<p>{errors.global}</p>
				</Message> }
				<Form onSubmit={this.onSubmit} loading={loading}>
					<Form.Input 
						label='Nippos'
						placeholder='Nippos Petugas'
						value={data.idpetugas}
					/>
					<Form.Input 
						label='Nama'
						placeholder='Nama Petugas'
						value={data.nama}
					/>
					<Form.Input 
						label='Nopend'
						placeholder='Nopend petugas'
						value={data.kprk}
					/>
					<Form.Input 
						label='Email'
						placeholder='Email petugas'
						value={data.email}
						onChange={this.onChange}
						error={errors.email}
					/>
					<Button fluid primary>Tambah</Button>
				</Form>
			</React.Fragment>
		);
	}
}

AddPetugasForm.propTypes = {
	petugas: PropTypes.object.isRequired,
	submit: PropTypes.func.isRequired
}

export default AddPetugasForm;