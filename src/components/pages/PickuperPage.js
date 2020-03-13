import React from "react";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment, Message, Form, Button, Icon, Modal } from "semantic-ui-react";
import { setLoading } from "../../actions/tarif";
import api from "../../api";
import FormValidasiPickup from "../forms/FormValidasiPickup";

class PickuperPage extends React.Component{
	state = {
		data: {
			nopickup: '',
			pin: '',
			nopend: this.props.dataUser.nopend,
			userid: this.props.dataUser.userid
		},
		errors: {},
		hasOrder: [],
		open: false
	}

	onChange = (e) => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value }})

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.props.setLoading(true);
			api.petugas.validasiPickup(this.state.data)
				.then(res => {
					this.setState({ hasOrder: res });
					this.props.setLoading(false);
				}).catch(err => {
					this.props.setLoading(false);
					if (err.response.data.errors) {
						this.setState({ errors: err.response.data.errors });
					}else{
						this.setState({ errors: { global: 'Terdapat kesalahan, silahkan cobalagi'}});
					}
				})
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.nopickup) errors.nopickup = "Masukkan nomor pickup";
		if (!data.pin) errors.pin = "Masukkan pin";
		return errors;
	}

	onReset = () => this.setState({ hasOrder: [], data: { ...this.state.data, nopickup: '', pin: '' }, errors: {} })

	onDone = () => {
		this.props.setLoading(true);
		this.setState({ open: false });
		api.petugas.addPosting(this.state.data.nopickup)
			.then(res => {
				this.props.setLoading(false);
				this.setState({ 
					errors: {success: 'Proses pickup berhasil'},
					hasOrder: [],
					data: {
						...this.state.data,
						nopickup: '',
						pin: ''
					}
				})
			}).catch(err => {
				this.props.setLoading(false);
				window.scrollTo(0, 0);
				if (err.response.data.errors) {
					this.setState({ errors: err.response.data.errors });
				}else{
					this.setState({ errors: {global: 'Internal server error'} });
				}
			})
	}

	render(){
		const { data, errors, hasOrder } = this.state;
		return(
			<Navbar>
				<Message
				    icon='info circle'
				    header='Notifikasi'
				    content='Untuk melakukan validasi kiriman harap masukan nomor pickup beserta PINnya terlebih dahulu dibawah ini'
				/>
				<Segment>
					{ errors.global && <Message negative>
						<Message.Header>Oppps!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
					{ errors.success && <Message positive>
						<Message.Header>Sukses!</Message.Header>
						<p>{errors.success}</p>
					</Message> }
					<Form onSubmit={this.onSubmit}>
						<Form.Group widths='equal'>
							<Form.Field>
								<Form.Input 
									label='Nomor pickup'
									type='text'
									name='nopickup'
									value={data.nopickup}
									autoComplete='off'
									onChange={this.onChange}
									error={errors.nopickup}
									disabled={hasOrder.length > 0 && true }
								/>
							</Form.Field>
							<Form.Field>
								<Form.Input 
									label='PIN'
									type='password'
									name='pin'
									disabled={hasOrder.length > 0 && true }
									value={data.pin}
									autoComplete='off'
									onChange={this.onChange}
									error={errors.pin}
								/>
							</Form.Field>
						</Form.Group>
						<Button primary icon disabled={hasOrder.length > 0 && true}><Icon name='search' /> Cari</Button>
					</Form>
					{ hasOrder.length > 0 && 
						<React.Fragment>
							<FormValidasiPickup 
								list={hasOrder} 
								setLoading={(bool) => this.props.setLoading(bool)}
							/>
							<Button.Group fluid>
								<Button primary onClick={() => this.setState({ open: true, errors: {} })}>Selesai</Button>
								<Button color='red' onClick={this.onReset}>Reset</Button>
							</Button.Group>
						</React.Fragment> }
					<Modal size='mini' open={this.state.open} onClose={() => this.setState({ open: false })}>
			          <Modal.Header>Notifikasi</Modal.Header>
			          <Modal.Content>
			            <p>Apakah anda yakin data order sudah valid?</p>
			          </Modal.Content>
			          <Modal.Actions>
			            <Button negative onClick={() => this.setState({ open: false })}>Batal</Button>
			            <Button
			              positive
			              icon='checkmark'
			              labelPosition='right'
			              content='Ya'
			              onClick={this.onDone}
			            />
			          </Modal.Actions>
			        </Modal>	
				</Segment>
			</Navbar>
		);
	}
}

PickuperPage.propTypes = {
	setLoading: PropTypes.func.isRequired,
	dataUser: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		dataUser: state.user
	}
}

export default connect(mapStateToProps, { setLoading })(PickuperPage);