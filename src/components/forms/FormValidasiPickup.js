import React from "react";
import { Table, Button, Icon, Modal, Form, Message } from "semantic-ui-react";
import update from 'react-addons-update';
import PropTypes from "prop-types";
import axios from "axios";
import api from "../../api";

const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const RenderFormContent = ({ choosed, onChange, cancel, onValidasi, error }) => {
	return(
		<Form>
			<Form.Group widths='equal'>
				<Form.Field>
					<Form.Input 
						label='Panjang'
						name='panjang'
						value={choosed.panjang}
						onChange={(e) => onChange(e)}
						autoComplete='off'
						error={error.panjang}
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input 
						label='Lebar'
						name='lebar'
						value={choosed.lebar}
						onChange={(e) => onChange(e)}
						autoComplete='off'
						error={error.lebar}
					/>
				</Form.Field>
				<Form.Field>
					<Form.Input 
						label='Tinggi'
						name='tinggi'
						value={choosed.tinggi}
						onChange={(e) => onChange(e)}
						autoComplete='off'
						error={error.tinggi}
					/>
				</Form.Field>
			</Form.Group>
			<Form.Field>
				<Form.Input 
					label='Berat'
					name='berat'
					value={choosed.berat}
					onChange={(e) => onChange(e)}
					error={error.berat}
					autoComplete='off'
				/>
			</Form.Field>
			<Button.Group fluid>
				<Button color='green' onClick={() => onValidasi()}>Validasi</Button>
				<Button color='red' onClick={() => cancel()}>Batal</Button>
			</Button.Group>
		</Form>
	);
}

class FormValidasiPickup extends React.Component{
	//need to changes props
	state = {
		hasOrder: [],
		show: false,
		choosed: null,
		errors: {},
		fee: []
	}

	componentDidMount(){
		this.setState({ hasOrder: this.props.list });
	}

	onShow = (idOrder) => this.setState({ show: true, choosed: idOrder, errors: {} })

	handleChange = (e) => {
		const index = this.state.hasOrder.findIndex(x => x.id_order === this.state.choosed);
		this.setState({
		  hasOrder: update(this.state.hasOrder, {[index]: {[e.target.name]: {$set: e.target.value}}})
		})
	}

	onCancel = () => {
		const index 	= this.state.hasOrder.findIndex(x => x.id_order === this.state.choosed);
		const list 		= this.props.list.find(x => x.id_order === this.state.choosed);
		this.setState({
		  	hasOrder: 
			  	update(this.state.hasOrder, {[index]: {
			  		berat: {$set: list.berat},
			  		tinggi: {$set: list.tinggi},
			  		panjang: {$set: list.panjang},
			  		lebar: {$set: list.lebar}
			  	}}),
			show: false,
			choosed: null,
			fee: []
		})
	}

	getFee = () => {
		const choosed 	= this.state.hasOrder.find(x => x.id_order === this.state.choosed);
		const index 	= this.state.hasOrder.findIndex(x => x.id_order === this.state.choosed);
		const errors 	= this.validate(choosed);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.props.setLoading(true);
			this.setState({ fee: [] });
			axios.post(`${process.env.REACT_APP_API}/getFee`, {
				  shipperzipcode: choosed.kodepos_s,
				  receiverzipcode: choosed.kodepos_r,
				  weight: choosed.berat,
				  valuegoods: choosed.itemvalue,
				  itemtypeid: '1',
				  width: choosed.lebar,
				  height: choosed.tinggi,
				  length: this.state.panjang
			}).then(res => {
				const { result } 	= res.data;
				const resFee 		= result.find(x => x.serviceCode === choosed.service_id);
				const payload 		= {
					berat: choosed.berat,
					fee: resFee.fee,
					tinggi: choosed.tinggi,
					lebar: choosed.lebar,
					panjang: choosed.panjang,
					idorder: choosed.id_order,
					idpo: choosed.id_po,
					line: choosed.line_po
				};
				api.petugas.submitPickup(payload)
					.then(res => {
						this.props.setLoading(false);
						this.setState({
						  	hasOrder: update(this.state.hasOrder, {[index]: { fee: {$set: resFee.fee }} }),
						  	show: false,
						  	choosed: null
						})
					//failed update
					}).catch(err => {
						this.props.setLoading(false);
						if (err.response.data.errors) {
							this.setState({ errors: err.response.data.errors });
						}else{
							this.setState({ errors: {global: 'Terdapat kesalahan, silahkan cobalagi'}});
						}	
					})
			//failed get fee	
			}).catch(err => {
				this.props.setLoading(false);
				if (err.response.data.errors) {
					this.setState({ errors: err.response.data.errors });
				}else{
					this.setState({ errors: {global: 'Terdapat kesalahan, silahkan cobalagi'}})
				}
			})
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.berat) errors.berat = "Masukan berat";
		if (!data.tinggi) errors.tinggi = "Masukan tinggi";
		if (!data.lebar) errors.lebar = "Masukan lebar";
		if (!data.panjang) errors.panjang = "Masukan panjang";
		return errors;
	} 

	render(){
		const { hasOrder, choosed, errors } = this.state;
		return(
			<React.Fragment>
				{ hasOrder.length > 0 && <Table striped celled>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>Alamat Pengirim</Table.HeaderCell>
				        <Table.HeaderCell>Alamat Penerima</Table.HeaderCell>
				        <Table.HeaderCell>Berat</Table.HeaderCell>
				        <Table.HeaderCell>Lebar</Table.HeaderCell>
				        <Table.HeaderCell>Panjang</Table.HeaderCell>
				        <Table.HeaderCell>Tinggi</Table.HeaderCell>
				        <Table.HeaderCell>Fee</Table.HeaderCell>
				        <Table.HeaderCell textAlign='center'>Validasi</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>
				    <Table.Body>
				      	{ hasOrder.map((x, i) => <Table.Row key={i}>
				      			<Table.Cell>{`${x.alamat_s}, ${x.kec_s}, ${x.kab_s}, ${x.prov_s}`}</Table.Cell>
				      			<Table.Cell>{`${x.alamat_r}, ${x.kec_r}, ${x.kab_r}, ${x.prov_r}`}</Table.Cell>
				      			<Table.Cell>{x.berat}</Table.Cell>
				      			<Table.Cell>{x.lebar}</Table.Cell>
				      			<Table.Cell>{x.panjang}</Table.Cell>
				      			<Table.Cell>{x.tinggi}</Table.Cell>
				      			<Table.Cell>{numberWithCommas(x.fee)}</Table.Cell>
				      			<Table.Cell textAlign='center'>
				      				<Button 
				      					icon 
				      					color='green' 
				      					circular 
				      					onClick={() => this.onShow(x.id_order)}
				      				>
									    <Icon name='pencil' />
									</Button>
				      			</Table.Cell>
				      		</Table.Row> )}
				    </Table.Body>
				</Table> }
				{ choosed && <Modal size='small' open={this.state.show}>
			          <Modal.Header>Form Validasi</Modal.Header>
			          <Modal.Content>
			          	{ errors.global && <Message negative>
							<Message.Header>Oppps!</Message.Header>
							<p>{errors.global}</p>
						</Message> }
			            <RenderFormContent 
			            	choosed={hasOrder.find(x => x.id_order === choosed)}
			            	onChange={this.handleChange}
			            	cancel={this.onCancel}
			            	onValidasi={this.getFee}
			            	error={errors}
			            />
			          </Modal.Content>
			    </Modal> }
			</React.Fragment>
		);
	}
}

FormValidasiPickup.propTypes = {
	setLoading: PropTypes.func.isRequired,
	list: PropTypes.array.isRequired
}

export default FormValidasiPickup;