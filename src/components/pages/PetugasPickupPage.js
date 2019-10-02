import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../menu/Navbar";
import { Button, Modal, Form, Select, Message } from "semantic-ui-react";
import ListPetugasPickup from "../list/ListPetugasPickup";
import { setProgressBar } from "../../actions/progress";
import { fetchPetugasPickup, addPetugas } from "../../actions/petugas";

class PetugasPickupPage extends React.Component {
	state = {
		data: {
			namapetugas: '',
			status: '00',
			nippos: '',
			nopend: this.props.nopend
		},
		open: false,
		options: [
			{ key: '00', text: 'Aktif', value: '00' },
			{ key: '02', text: 'Tidak Aktif', value: '02' }
		],
		loading: false,
		errors: {}
	}

	componentDidMount(){
		const { nopend } = this.props;
		this.props.setProgressBar(true);
		this.props.fetchPetugasPickup(nopend)
			.then(() => this.props.setProgressBar(false))
	}

	onChange = (e) => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value }})

	handleChange = (e, {value }) => this.setState({ data: {...this.state.data, status: value }})

	close = () => this.setState({ open: false })

	onClickTambah = () => this.setState({ open: true, namapetugas: '', status: '00', errors: {} })

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.addPetugas(this.state.data)
				.then(() => this.setState({ open: false, loading: false }))
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.namapetugas) errors.namapetugas = "Nama petugas harap di isi";
		if (!data.nippos) errors.nippos = "Nippos tidak boleh kosong";
		if (!data.status) errors.status = "Status harap di pilih";
		return errors;
	}

	render(){
		const { open, options, data, loading, errors } = this.state;

		return(
			<Navbar>
				<Modal size='small' open={open}>
			      <Modal.Header>Tambah Petugas Pickup</Modal.Header>
			      <Modal.Content>
			      	{ errors.global && <Message negative>
						<Message.Header>Maaf!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
			        <Form onSubmit={this.onSubmit} loading={loading}>
			        	<Form.Field>
			        		<Form.Input 
			        			label='Nippos'
			        			type='text'
			        			name='nippos'
			        			id='nippos'
			        			autoComplete='off'
			        			onChange={this.onChange}
			        			value={data.nippos}
			        			error={errors.nippos}
			        		/>
			        	</Form.Field>
			        	<Form.Field>
			        		<Form.Input 
			        			label='Nama Petugas'
			        			type='text'
			        			name='namapetugas'
			        			id='namapetugas'
			        			autoComplete='off'
			        			onChange={this.onChange}
			        			value={data.namapetugas}
			        			error={errors.namapetugas}
			        		/>
			        	</Form.Field>
			        	<Form.Field>
			        		<label>Status</label>
			        		<Select 
		            			name="status"
		            			id="status"
		            			placeholder='Pilih status' 
		            			options={options}
		            			defaultValue={data.status}
			            		onChange={this.handleChange} 
			            	/>
			        	</Form.Field>
			        </Form>
			      </Modal.Content>
			      <Modal.Actions>
			        <Button negative onClick={this.close}>No</Button>
			        <Button
			          positive
			          icon='checkmark'
			          labelPosition='right'
			          content='Yes'
			          onClick={this.onSubmit}
			        />
			      </Modal.Actions>
			    </Modal>
				<Button primary onClick={this.onClickTambah}>Tambah Petugas</Button>
				<ListPetugasPickup
					listdata={this.props.listPetugas}
				/>
			</Navbar>
		);
	}
}

PetugasPickupPage.propTypes = {
	setProgressBar: PropTypes.func.isRequired,
	nopend: PropTypes.string.isRequired,
	fetchPetugasPickup: PropTypes.func.isRequired,
	addPetugas: PropTypes.func.isRequired,
	listPetugas: PropTypes.array.isRequired
}

function mapStateProps(state) {
	return{
		nopend: state.user.nopend,
		listPetugas: state.petugas.pickup
	}
}

export default connect(mapStateProps, { setProgressBar, fetchPetugasPickup, addPetugas })(PetugasPickupPage);