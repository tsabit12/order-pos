import React from "react";
import { Table } from "semantic-ui-react";

const ListKurir = ({ listdata }) => {
	const empty = (
		<Table.Row>
			<Table.Cell colSpan='7'>Data kosong</Table.Cell>
		</Table.Row>
	);

	const data = (
		<React.Fragment>
			{ listdata.map(list => <Table.Row key={list.userid}>
		        <Table.Cell>{list.wilayah}</Table.Cell>
		        <Table.Cell>{list.kprk}</Table.Cell>
		        <Table.Cell>{list.userid}</Table.Cell>
		        <Table.Cell>{list.nama}</Table.Cell>
		        <Table.Cell>{list.email}</Table.Cell>
		        <Table.Cell>{list.nohp}</Table.Cell>
		        <Table.Cell>{list.jumlah}</Table.Cell>
		        <Table.Cell>{list.deskripsi}</Table.Cell>
		      </Table.Row> )}
		</React.Fragment>
	);

	return(
		<Table celled>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>REGIONAL</Table.HeaderCell>
		        <Table.HeaderCell>KPRK</Table.HeaderCell>
		        <Table.HeaderCell>USERID</Table.HeaderCell>
		        <Table.HeaderCell>NAMA</Table.HeaderCell>
		        <Table.HeaderCell>EMAIL</Table.HeaderCell>
		        <Table.HeaderCell>NO HP</Table.HeaderCell>
		        <Table.HeaderCell>JUMLAH KANTOR</Table.HeaderCell>
		        <Table.HeaderCell>LEVEL</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>

		    <Table.Body>
		    	{ listdata.length === 0 ? empty : data }
		    </Table.Body>
		</Table>
	);
}

export default ListKurir;