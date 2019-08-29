import React from "react";
import PropTypes from "prop-types";
import { Table, Button, Modal, Popup, Form, Select, Message, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";
import InlineError from "../InlineError";

class ListAssigment extends React.Component{
	state = {
		open: false,
		nopickup: '',
		idpetugas: '',
		dataPetugas: [],
		errors: {},
		lading: false
	}

	handleClick = (data) => {
	    this.setState({ open: true, nopickup: data });
	    axios.post('/api_sampoerna/order/getPetugasPickup')
	    	.then(res => res.data.result)
	    	.then(result => {
	    		this.setState({ dataPetugas: result })
	    	})
	}

	close = () => this.setState({ open: false })

	onChange = e => this.setState({ [e.target.name]: e.target.value })

	handleChange = (e, { value }) => this.setState({ idpetugas: value })

	onSubmit = () => {
		const errors = this.validate(this.state);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			const data = {
				nopickup: this.state.nopickup,
				idpetugas: this.state.idpetugas
			};
			this.props.submit(data)
				.then(() => this.setState({ open: false, loading: false, errors: {} }))
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.idpetugas) errors.idpetugas = "Pilih petugas pickup";
		return errors;
	}

	render(){
		const { listdata } = this.props;
		const { dataPetugas, errors } = this.state;
		
		return( 
			<React.Fragment>
				<Modal size="small" centered={false} open={this.state.open}>
		          <Modal.Header>Assigment pickup dengan nomor pickup adalah <strong>{this.state.nopickup}</strong> ?</Modal.Header>
		          <Dimmer active={this.state.loading} inverted>
				        <Loader inverted size='medium'>Loading</Loader>
				  </Dimmer>
		          <Modal.Content>
		          	{ errors.global && <Message negative>
						<Message.Header>Maaf!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
		            <Form>
		            	<Form.Field>
		            		<label>Petugas Pickup</label>
		            		<Select 
		            			name="idpetugas"
		            			id="idpetugas"
		            			placeholder='Pilih petugas pickup' 
		            			options={dataPetugas.map(data => ({
		            				key: data.id_petugas,
		            				value: data.id_petugas,
		            				text: data.kprk+' - '+data.nama_petugas
			            			}))
			            		}
			            		onChange={this.handleChange} 
			            		error={errors.idpetugas}
			            	/>
			            	{ errors.idpetugas && <InlineError text={errors.idpetugas} /> }
		            	</Form.Field>
		            </Form>
		          </Modal.Content>
		          <Modal.Actions>
		            <Button negative onClick={this.close}>Tutup</Button>
		            <Button primary onClick={this.onSubmit}>Assigment</Button>
		          </Modal.Actions>
		        </Modal>
				<Table singleLine>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>NOMOR PICKUP</Table.HeaderCell>
				        <Table.HeaderCell>TANGGAL ORDER</Table.HeaderCell>
				        <Table.HeaderCell>KANTOR</Table.HeaderCell>
				        <Table.HeaderCell>KOTA</Table.HeaderCell>
				        <Table.HeaderCell>ACTION</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>
				    <Table.Body>
			      	{ listdata.length === 0 ? 
			      		<Table.Row>
			      			<Table.Cell />
			      			<Table.Cell colSpan='5'>Data tidak ditemukan</Table.Cell>
			      		</Table.Row> : 
			      		listdata.map(order => 
			  			<Table.Row key={order.no_pickup}>			      			
					        <Table.Cell>{order.no_pickup}</Table.Cell>
					        <Table.Cell>{order.tgl_order}</Table.Cell>
					        <Table.Cell>{order.nama_kantor}</Table.Cell>
					        <Table.Cell>{order.kota}</Table.Cell>
					        <Table.Cell>
					        	<Popup content='Assigment' trigger={
					        		<Button secondary icon='check' onClick={() => this.handleClick(order.no_pickup)} />
					        	} />
					        </Table.Cell>
			      		</Table.Row>) }
				    </Table.Body>
			  </Table>
			</React.Fragment>
		);
	}
}

ListAssigment.propTypes = {
	listdata: PropTypes.array.isRequired,
	submit: PropTypes.func.isRequired
}

export default ListAssigment;