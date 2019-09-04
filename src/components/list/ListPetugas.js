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
				        <Table.HeaderCell>KOTA</Table.HeaderCell>
				        <Table.HeaderCell>KANTOR</Table.HeaderCell>
				        <Table.HeaderCell>TANGGAL DAFTAR</Table.HeaderCell>
				        <Table.HeaderCell>LEVEL</Table.HeaderCell>
				        <Table.HeaderCell>STATUS</Table.HeaderCell>
				        <Table.HeaderCell>ACTION</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>

				    <Table.Body>
				      	{ listdata.map(data => <Table.Row key={data.username}>
				      		<Table.Cell>{data.username}</Table.Cell>
				      		<Table.Cell>{data.kota}</Table.Cell>
				      		<Table.Cell>{data.kantor}</Table.Cell>
				      		<Table.Cell>{data.tgl_daftar}</Table.Cell>
				      		<Table.Cell>{data.deskripsi}</Table.Cell>
				      		<Table.Cell>{data.status === '02' ? <p>Belum terverifikasi</p> : <p>Terverifikasi</p>}</Table.Cell>
				      		<Table.Cell>
					        	<Popup content='Verifikasi' trigger={
					        		<Button primary icon='check' onClick={() => this.handleClick(data.username)} />
					        	} />
					        </Table.Cell>
				      	</Table.Row> )}
				    </Table.Body>
			   </Table>
			}
		</React.Fragment>
	);
}