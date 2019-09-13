import React from "react";
import { Table, Button, Popup } from "semantic-ui-react";

export default function ListPetugas({ listdata }){
	
	return(
		<React.Fragment>
			{listdata.length === 0 ?  <React.Fragment /> : 
				<Table singleLine>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>USERNAME</Table.HeaderCell>
				        <Table.HeaderCell>KANTOR</Table.HeaderCell>
				        <Table.HeaderCell>TANGGAL DAFTAR</Table.HeaderCell>
				        <Table.HeaderCell>LEVEL</Table.HeaderCell>
				        <Table.HeaderCell>EMAIL</Table.HeaderCell>
				        <Table.HeaderCell>ACTION</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>

				    <Table.Body>
				      	{ listdata.map(data => <Table.Row key={data.userid}>
				      		<Table.Cell>{data.nama}</Table.Cell>
				      		<Table.Cell>{data.namakantor}</Table.Cell>
				      		<Table.Cell>{data.tgl_daftar}</Table.Cell>
				      		<Table.Cell>{data.deskripsi}</Table.Cell>
				      		<Table.Cell>{data.email}</Table.Cell>
				      		<Table.Cell>
					        	<Popup content='Verifikasi' trigger={
					        		<Button primary icon='check' onClick={() => this.handleClick(data.userid)} />
					        	} />
					        </Table.Cell>
				      	</Table.Row> )}
				    </Table.Body>
			   </Table>
			}
		</React.Fragment>
	);
}