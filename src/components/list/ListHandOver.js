import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Checkbox, Icon, Table, Modal } from 'semantic-ui-react';

class ListHandOver extends React.Component {
	state = {
		data: [],
		open: false
	}

	handleChange = (e, data) => {
		if (data.checked) {
			this.setState({ data: [ ...this.state.data, data.id ]})
		}else{
			var array = [...this.state.data];
			var index = array.indexOf(data.id);
			if (index !== -1) {
			    array.splice(index, 1);
			    this.setState({data: array });
			}
		}
	}

	submit = () => {
		const data = this.state.data;
		if (data.length === 0) {
			this.setState({ open: true });
		}else{
			this.props.updateOrder(data);
		}
	}

	close = () => this.setState({ open: false })

	render(){
		const { listdata } = this.props;

		return(
			<React.Fragment>
				<Modal size="mini" open={this.state.open} onClose={this.close}>
		          <Modal.Header>Notifkasi</Modal.Header>
		          <Modal.Content>
		            <p>Harap centang salah satu</p>
		          </Modal.Content>
		          <Modal.Actions>
		            <Button negative onClick={this.close}>Tutup</Button>
		          </Modal.Actions>
		        </Modal>
				<Table compact celled definition>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>ACTION</Table.HeaderCell>
				        <Table.HeaderCell>ID ORDER</Table.HeaderCell>
				        <Table.HeaderCell>PENGIRIM NAMA/ALAMAT</Table.HeaderCell>
				        <Table.HeaderCell>PENERIMA NAMA/ALAMAT</Table.HeaderCell>
				        <Table.HeaderCell>TANNGAL ORDER</Table.HeaderCell>
				        <Table.HeaderCell>WAKTU ORDER</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>
				    <Table.Body>
			      	{ listdata.length === 0 ? 
			      		<Table.Row>
			      			<Table.Cell />
			      			<Table.Cell colSpan='5'>Data tidak ditemukan</Table.Cell>
			      		</Table.Row> : 
			      		listdata.map(order => 
			  			<Table.Row key={order.id_order}>
			      			<Table.Cell collapsing>
					          <Checkbox 
					          	slider  
					          	name={order.id_order}
					          	id={order.id_order}
					          	//checked = { this.state.data.id === order.id_order }
					          	onClick={this.handleChange}
					          />
					        </Table.Cell>		
					        <Table.Cell>{order.id_order}</Table.Cell>
					        <Table.Cell>{order.nama_p} / {order.alamat_p}</Table.Cell>
					        <Table.Cell>{order.nama_s} / {order.alamat_s}</Table.Cell>
					        <Table.Cell>{order.tgl_order}</Table.Cell>
					        <Table.Cell>{order.waktu}</Table.Cell>
			      		</Table.Row>) }
				    </Table.Body>
				    <Table.Footer fullWidth>
				      <Table.Row>
				        <Table.HeaderCell />
				        <Table.HeaderCell colSpan='5'>
				          <Button
				            floated='left'
				            icon
				            labelPosition='left'
				            primary
				            size='small'
				            onClick = {this.submit}
				          >
				            <Icon name='check' /> Pickup
				          </Button>
				        </Table.HeaderCell>
				      </Table.Row>
				    </Table.Footer>
			  </Table>
		  </React.Fragment>

		);
	}
}

ListHandOver.propTypes = {
	listdata: PropTypes.array.isRequired,
	updateOrder: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		listdata: state.handover
	}
}

export default connect(mapStateToProps)(ListHandOver);