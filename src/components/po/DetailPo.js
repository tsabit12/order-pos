import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setProgressBar } from "../../actions/progress";
import Navbar from "../menu/Navbar";
import api from "../../api";
import { Card, Table, Message } from "semantic-ui-react";

class DetailPo extends React.Component {
	state = {
		idpo: this.props.match.params.id,
		data: {},
		errors: {}
	}

	componentDidMount(){
		this.props.setProgressBar(true);
		api.po.getDetailPo(this.state.idpo)
			.then(res => {
				this.setState({ data: res });
				this.props.setProgressBar(false);	
			})
			.catch(err => {
				this.setState({ data: {}, errors: err.response.data.errors });
				this.props.setProgressBar(false);	
			})
	}

	numberWithCommas = (number) => {
    	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	render(){
		const { data, errors } = this.state;
		var no = 1;
		var totalFee = 0;
		
		return(
			<Navbar>
				{ errors.global && <Message negative>
					<Message.Header>Terdapat kesalahan</Message.Header>
					<p>{errors.global}</p>
				</Message> }
				<Card fluid>
				    <Card.Content header='Detail Order' />
				    <Card.Content>
				    	<Card.Description>
				    		{ Object.keys(data).length > 0 && <table>
				    			<tbody>
					    			<tr>
					    				<td>Nomor PO</td> 
					    				<td>: {data.id_po}</td>
					    			</tr>
					    			<tr>
					    				<td>Keterangan</td> 
					    				<td>: {data.keterangan}</td>
					    			</tr>
					    			<tr>
					    				<td>Saldo Tersisa</td> 
					    				<td>: {this.numberWithCommas(data.bsu)}</td>
					    			</tr>
				    			</tbody>
				    		</table> }
				    		<Table celled>
							    <Table.Header>
							      <Table.Row>
							        <Table.HeaderCell>NO</Table.HeaderCell>
							        <Table.HeaderCell>ID ORDER</Table.HeaderCell>
							        <Table.HeaderCell>DESKRIPSI</Table.HeaderCell>
							        <Table.HeaderCell>SERVICE ID</Table.HeaderCell>
							        <Table.HeaderCell>NOMOR PICKUP</Table.HeaderCell>
							        <Table.HeaderCell>TANGGAL ORDER</Table.HeaderCell>
							        <Table.HeaderCell style={{textAlign: 'right'}}>TOTAL FEE</Table.HeaderCell>
							      </Table.Row>
							    </Table.Header>
							    <Table.Body>
								    { Object.keys(data).length === 0 ? <Table.Row>
								    	<Table.Cell colSpan='7'>Kosong</Table.Cell>
								    </Table.Row> : <React.Fragment>
								    	{ data.detail.map(list => {
								    		totalFee = Number(totalFee) + Number(list.fee);
								    		return(
									    		<Table.Row key={list.id_order}>
										    		<Table.Cell>{no++}</Table.Cell>
										    		<Table.Cell>{list.id_order}</Table.Cell>
										    		<Table.Cell>{list.contentdesc}</Table.Cell>
										    		<Table.Cell>{list.service_id}</Table.Cell>
										    		<Table.Cell>{list.no_pickup}</Table.Cell>
										    		<Table.Cell>{list.tgl_order}</Table.Cell>
										    		<Table.Cell style={{textAlign: 'right'}}>{this.numberWithCommas(list.fee)}</Table.Cell>
										    	</Table.Row>
								    		);
								    	}) }
								    </React.Fragment> }

								    <Table.Row active>
								    	<Table.Cell colSpan='6'>TOTAL</Table.Cell>
								    	<Table.Cell style={{textAlign: 'right'}}>{this.numberWithCommas(totalFee)}</Table.Cell>
								    </Table.Row>
							    </Table.Body>
							</Table>
				    	</Card.Description>
				    </Card.Content>
				</Card>
			</Navbar>
		);
	}
}

DetailPo.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
}

export default connect(null, { setProgressBar })(DetailPo);