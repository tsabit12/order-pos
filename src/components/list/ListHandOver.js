import React from "react";
import PropTypes from "prop-types";
import { Table, Message } from "semantic-ui-react";

export default function ListHandOver({ listdata, nomorpickup }){
	return(
		<React.Fragment>
			<Message positive>
			    <Message.Header>Sukses</Message.Header>
			    Handover berhasil di proses, berikut data order berdasarkan nomor pickup {nomorpickup}
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
			      		<Table.Cell>{data.namakantor}</Table.Cell>
			      		<Table.Cell>{data.city}</Table.Cell>
			      </Table.Row>)}
			    </Table.Body>
			  </Table>
		</React.Fragment>
	);
}


ListHandOver.propTypes = {
	listdata: PropTypes.array.isRequired,
	nomorpickup: PropTypes.string.isRequired
}