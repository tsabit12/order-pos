import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from "semantic-ui-react";

const ListInvoice = ({ listdata, cetak }) => {
	return(
		<React.Fragment>
			{ listdata.map(data => 
		      	<Table.Row key={data.no_invoice}>
			        <Table.Cell>{data.no_invoice}</Table.Cell>
			        <Table.Cell>{data.namakantor}</Table.Cell>
			        <Table.Cell>{ data.detail.map((det, i) => <p key={i}>{det.uraian}</p>)}</Table.Cell>
			        <Table.Cell>{ data.detail.map((det, i) => <p key={i}>{det.kuantiti}</p>)}</Table.Cell>
			        <Table.Cell>{ data.detail.map((det, i) => <p key={i}>{det.bsu}</p>)}</Table.Cell>
			        <Table.Cell><Button icon='file pdf' primary onClick={() => cetak(data.no_invoice)}/></Table.Cell>
		      	</Table.Row>)}
		</React.Fragment>
	);
}

ListInvoice.propTypes = {
	listdata: PropTypes.array.isRequired,
	cetak: PropTypes.func.isRequired
}

export default ListInvoice;