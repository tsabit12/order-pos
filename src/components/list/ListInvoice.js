import React from "react";
import PropTypes from "prop-types";
import { Table, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ListInvoice = ({ listdata, cetak }) => {
	
	const numberWithCommas = (number) => {
    	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	return(
		<React.Fragment>
			{ listdata.map(data => 
		      	<Table.Row key={data.no_invoice}>
			        <Table.Cell>{data.no_invoice}</Table.Cell>
			        <Table.Cell>{data.namakantor}</Table.Cell>
			        <Table.Cell>{ data.detail.map((det, i) => <p key={i}>{det.uraian}</p>)}</Table.Cell>
			        <Table.Cell>{ data.detail.map((det, i) => <p key={i}>{det.kuantiti}</p>)}</Table.Cell>
			        <Table.Cell style={{ textAlign: 'right'}}>{ data.detail.map((det, i) => <p key={i}>{numberWithCommas(det.bsu)}</p>)}</Table.Cell>
			        <Table.Cell style={{ textAlign: 'center'}}>
			        	<Popup content='Cetak' trigger={<Button icon='file pdf' primary onClick={() => cetak(data.no_invoice)}/>} />
			        	<Popup content='Lihat detail' trigger={<Button as={Link} to={"/detail_invoice/"+data.no_invoice} primary icon='location arrow'/>} />
			        </Table.Cell>
		      	</Table.Row>)}
		</React.Fragment>
	);
}

ListInvoice.propTypes = {
	listdata: PropTypes.array.isRequired,
	cetak: PropTypes.func.isRequired
}

export default ListInvoice;