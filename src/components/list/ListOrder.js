import React from "react";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const DataOrder = ({ list }) => {
	var no = 1;
	return(
		<Table singleLine>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>NO</Table.HeaderCell>
		        <Table.HeaderCell>ID ORDER</Table.HeaderCell>
		        <Table.HeaderCell>SERVICE ID</Table.HeaderCell>
		        <Table.HeaderCell>PERIHAL</Table.HeaderCell>
		        <Table.HeaderCell>BIAYA</Table.HeaderCell>
		        <Table.HeaderCell>BIAYA REAL</Table.HeaderCell>
		        <Table.HeaderCell>TANGGAL ORDER</Table.HeaderCell>
		        <Table.HeaderCell>STATUS</Table.HeaderCell>
		      </Table.Row>
		      </Table.Header>
		      
		      <Table.Body>
		      	{ list.map(x => <Table.Row key={x.id_order}>
		      		<Table.Cell>{no++}</Table.Cell>
		      		<Table.Cell>{x.id_order}</Table.Cell>
		      		<Table.Cell>{x.service_id}</Table.Cell>
		      		<Table.Cell>{x.contentdesc}</Table.Cell>
		      		<Table.Cell>{numberWithCommas(x.fee)}</Table.Cell>
		      		<Table.Cell>{numberWithCommas(x.real_trans)}</Table.Cell>
		      		<Table.Cell>{x.tanggal_order}</Table.Cell>
		      		<Table.Cell>{x.keterangan}</Table.Cell>
		      	</Table.Row>)}
		      </Table.Body>
		</Table>
	);
}

const ListOrder = ({ tanggal, listorder }) => {
	return(
		<React.Fragment>
			{ listorder.length > 0 && <DataOrder list={listorder} />}
		</React.Fragment>
	);
}

function mapStateToProps(state, nextprops) {
	return{
		listorder: state.pouser.order.filter(x => x.tanggal_order === nextprops.tanggal)
	}
}

export default connect(mapStateToProps, null)(ListOrder);