import React from "react";
import PropTypes from "prop-types";
import { Message, Table } from "semantic-ui-react";
import { connect } from "react-redux";

const items = [
  'You can now have cover images on blog pages',
  'Drafts will now auto-save while writing',
]

const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ListData = ({ listdata }) => {

	var no = 1;

	const empty = (
		<Table.Row>
			<Table.Cell>Data kosong</Table.Cell>
		</Table.Row>
	);

	const data = (
		<React.Fragment>
		{ listdata.map(list => <Table.Row key={list.id_po}>
				<Table.Cell>{no++}</Table.Cell>
				<Table.Cell>{list.id_po}</Table.Cell>
				<Table.Cell>{list.tgl_awal}</Table.Cell>
				<Table.Cell>{list.tgl_akhir}</Table.Cell>
				<Table.Cell style={{textAlign: 'right'}}>{list.jml_topup}</Table.Cell>
				<Table.Cell style={{textAlign: 'right'}}>{list.jumlah_order}</Table.Cell>
				<Table.Cell style={{textAlign: 'right'}}>{numberWithCommas(list.bsu_order)}</Table.Cell>
				<Table.Cell style={{textAlign: 'right'}}>{numberWithCommas(list.bsu)}</Table.Cell>
			</Table.Row>)}
		</React.Fragment>
	);

	return(
		<React.Fragment>
			<Message>
			    <Message.Header>New Site Features</Message.Header>
			    <Message.List items={items} />
			</Message>
			<Table celled>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>No</Table.HeaderCell>
			        <Table.HeaderCell>Nomor Po</Table.HeaderCell>
			        <Table.HeaderCell>Mulai</Table.HeaderCell>
			        <Table.HeaderCell>Sampai</Table.HeaderCell>
			        <Table.HeaderCell style={{textAlign: 'right'}}>Jumlah Topup</Table.HeaderCell>
			        <Table.HeaderCell style={{textAlign: 'right'}}>Jumlah Order</Table.HeaderCell>
			        <Table.HeaderCell style={{textAlign: 'right'}}>Terpakai</Table.HeaderCell>
			        <Table.HeaderCell style={{textAlign: 'right'}}>Sisa Saldo</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>
			    <Table.Body>
			    	{ listdata.length === 0 ? empty : data }
			    </Table.Body>
			</Table>
		</React.Fragment>
	);
}

ListData.propTypes = {
	listdata: PropTypes.array.isRequired
}

function  mapStateToProps(state) {
	return{
		listdata: state.pouser.po
	}	
}

export default connect(mapStateToProps, null)(ListData);