import React from "react";
import PropTypes from "prop-types";
import { Segment, Table, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ListHandOver({ listdata }){
	return(
		<Segment>
			<Message positive>
			    <Message.Header>Sukses</Message.Header>
			    Silahkan klik <Link to="/download">disini</Link> untuk mendownload file pdf 
			</Message>
			<Table celled>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>ID ORDER</Table.HeaderCell>
			        <Table.HeaderCell>NAMA PENGIRIM</Table.HeaderCell>
			        <Table.HeaderCell>NAMA PENERIMA</Table.HeaderCell>
			        <Table.HeaderCell>TANGGAL ORDER</Table.HeaderCell>
			        <Table.HeaderCell>PETUGAS PICKUP</Table.HeaderCell>
			        <Table.HeaderCell>KANTOR</Table.HeaderCell>
			        <Table.HeaderCell>KOTA</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>

			    <Table.Body>
			      { listdata.map(data => <Table.Row key={data.id_order}>
			      		<Table.Cell>{data.id_order}</Table.Cell>
			      		<Table.Cell>{data.nm_pengirim}</Table.Cell>
			      		<Table.Cell>{data.nm_penerima}</Table.Cell>
			      		<Table.Cell>{data.tgl}</Table.Cell>
			      		<Table.Cell>{data.nama_petugas}</Table.Cell>
			      		<Table.Cell>{data.nama_kantor}</Table.Cell>
			      		<Table.Cell>{data.kota}</Table.Cell>
			      </Table.Row>)}
			    </Table.Body>
			  </Table>
		</Segment>
	);
}


ListHandOver.propTypes = {
	listdata: PropTypes.array.isRequired
}