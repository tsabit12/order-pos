import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from 'semantic-ui-react';



const ListInvoice = ({ listdata, cetak }) => {
	const numberWithCommas = (number) => {
	    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	} 

	return(
		<Table celled>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>Nomor PO</Table.HeaderCell>
		        <Table.HeaderCell>Atas Nama</Table.HeaderCell>
		        <Table.HeaderCell>Fee Order</Table.HeaderCell>
		        <Table.HeaderCell>Real Transaction</Table.HeaderCell>
		        <Table.HeaderCell>Jumlah Saldo</Table.HeaderCell>
		        <Table.HeaderCell>Persentase</Table.HeaderCell>
		        <Table.HeaderCell>Cetak</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>

		    <Table.Body>
		    	{ listdata.map(data => <Table.Row key={data.id_po}>
			        <Table.Cell>{data.id_po}</Table.Cell>
			        <Table.Cell>{data.nama}</Table.Cell>
			        <Table.Cell style={{textAlign: 'right'}}>{numberWithCommas(data.fee_order)}</Table.Cell>
			        <Table.Cell style={{textAlign: 'right'}}>{numberWithCommas(data.fee_realtrans)}</Table.Cell>
			        <Table.Cell style={{textAlign: 'right'}}>{numberWithCommas(data.saldo)}</Table.Cell>
			        <Table.Cell style={{textAlign: 'center'}}>{Math.round(data.persentase)}%</Table.Cell>
			        <Table.Cell>
			        	<Button secondary icon='file pdf' onClick={() => cetak(data.id_po)} />
			        </Table.Cell>
		      </Table.Row>)	}
		    </Table.Body>
		</Table>
	);
} 


ListInvoice.propTypes = {
	listdata: PropTypes.array.isRequired
}

export default ListInvoice;