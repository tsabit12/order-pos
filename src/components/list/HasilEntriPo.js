import React from "react";
import PropTypes from "prop-types";
import { Message, Table } from "semantic-ui-react";

export default function HasilEntriPo ({ listdata }){
	
	const listtable = (
		<React.Fragment>
			<Message 
			 	visible
			 	 header='History hasil entri'
			 	 content="Refresh halaman.. history tidak akan muncul"
			 />
			<Table singleLine>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>Nomor PO</Table.HeaderCell>
			        <Table.HeaderCell>Deskripsi</Table.HeaderCell>
			        <Table.HeaderCell>Tanggal Mulai</Table.HeaderCell>
			        <Table.HeaderCell>Tanggal Selesai</Table.HeaderCell>
			        <Table.HeaderCell>Jumlah</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>

			    <Table.Body>
			      	{ listdata.map(data => <Table.Row key={data.id_po}>
			      		<Table.Cell>{data.id_po}</Table.Cell>
			      		<Table.Cell>{data.keterangan}</Table.Cell>
			      		<Table.Cell>{data.tgl_awal}</Table.Cell>
			      		<Table.Cell>{data.tgl_akhir}</Table.Cell>
			      		<Table.Cell>{data.bsu}</Table.Cell>
			      	</Table.Row> )}
			    </Table.Body>
			</Table>
		</React.Fragment>
	);

	return(
		<div>
			 { listdata.length === 0 ? <React.Fragment /> : listtable }
		</div>
	);
}

HasilEntriPo.propTypes = {
	listdata: PropTypes.array.isRequired
}
