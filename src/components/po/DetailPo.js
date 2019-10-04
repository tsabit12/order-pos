import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setProgressBar } from "../../actions/progress";
import Navbar from "../menu/Navbar";
import api from "../../api";
import { Card, Table } from "semantic-ui-react";

class DetailPo extends React.Component {
	state = {
		idpo: this.props.match.params.id,
		data: {}
	}

	componentDidMount(){
		this.props.setProgressBar(true);
		api.po.getDetailPo(this.state.idpo)
			.then(res => {
				this.setState({ data: res });
				this.props.setProgressBar(false);	
			})
			.catch(() => {
				this.setState({ data: {} });
				this.props.setProgressBar(false);	
			})
	}

	numberWithCommas = (number) => {
    	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	render(){
		const { data } = this.state;
		return(
			<Navbar>
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
							        <Table.HeaderCell>ID ORDER</Table.HeaderCell>
							        <Table.HeaderCell>NAMA PENERIMA</Table.HeaderCell>
							        <Table.HeaderCell>ALAMAT</Table.HeaderCell>
							        <Table.HeaderCell>NOMOR PICKUP</Table.HeaderCell>
							        <Table.HeaderCell>BIAYA ORDER</Table.HeaderCell>
							        <Table.HeaderCell>BIAYA REAL</Table.HeaderCell>
							        <Table.HeaderCell>TANGGAL ORDER</Table.HeaderCell>
							      </Table.Row>
							    </Table.Header>
							    <Table.Body>
								    { Object.keys(data).length === 0 ? <Table.Row>
								    	<Table.Cell colSpan='7'>Kosong</Table.Cell>
								    </Table.Row> : <React.Fragment>
								    	{ data.detail.map(list => <Table.Row key={list.id_order}>
								    		<Table.Cell>{list.id_order}</Table.Cell>
								    		<Table.Cell>{list.nama}</Table.Cell>
								    		<Table.Cell>{list.kab} / {list.alamat}</Table.Cell>
								    		<Table.Cell>{list.no_pickup}</Table.Cell>
								    		<Table.Cell>{this.numberWithCommas(list.bsu_order)}</Table.Cell>
								    		<Table.Cell>{this.numberWithCommas(list.fee)}</Table.Cell>
								    		<Table.Cell>{list.tgl_order}</Table.Cell>
								    	</Table.Row>)}
								    </React.Fragment> }
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