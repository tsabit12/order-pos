import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

const convertStatus = (status) => {
	if (status === '00') {
		return 'Aktif';
	}else{
		return 'Tidak Aktif';
	}
}

const ListPetugasPickup = ({ listdata }) => {
	var no = 1;

	const empty = (
		<Table.Body>
			<Table.Row>
				<Table.Cell colSpan='5'>Data petugas pickup kosong</Table.Cell>
			</Table.Row>
		</Table.Body>
	);

	const datanya = (
		<Table.Body>
			{ listdata.map(data => <Table.Row key={data.id_petugas}>
					<Table.Cell>{no++}</Table.Cell>
					<Table.Cell>{data.id_petugas}</Table.Cell>
					<Table.Cell>{data.nama_petugas}</Table.Cell>
					<Table.Cell>{data.tgl}</Table.Cell>
					<Table.Cell>{convertStatus(data.status)}</Table.Cell>
				</Table.Row>)}
		</Table.Body>
	);
	return(
		<Table celled>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>NO</Table.HeaderCell>
		        <Table.HeaderCell>NIPPOS</Table.HeaderCell>
		        <Table.HeaderCell>NAMA</Table.HeaderCell>
		        <Table.HeaderCell>TANGGAL INSERT</Table.HeaderCell>
		        <Table.HeaderCell>STATUS</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>
		    { listdata.length === 0 ? empty : datanya }
		</Table>
	);
}

ListPetugasPickup.propTypes = {
	listdata: PropTypes.array.isRequired
}

export default ListPetugasPickup;