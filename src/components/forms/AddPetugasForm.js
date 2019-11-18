import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";


class AddPetugasForm extends React.Component {
	state = {
		data: {
			nama: this.props.petugas.nama,
			idpetugas: this.props.petugas.ID_Pegawai,
			kprk: this.props.petugas.Kprk,
			status: '00'
		},
		loading: false,
		errors: {}
	}

	onSubmit = () => {
		this.setState({ loading: true });
		this.props.submit(this.state.data)
			.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
	}

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