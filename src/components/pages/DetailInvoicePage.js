import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setProgressBar } from "../../actions/progress";
import api from "../../api";
import { Table } from "semantic-ui-react";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TableDetail = ({ listdata, no }) => (
	<Table celled compact>
	    <Table.Header>
	      <Table.Row>
	        <Table.HeaderCell>NO</Table.HeaderCell>
	        <Table.HeaderCell>ID PEL</Table.HeaderCell>
	        <Table.HeaderCell>NO RESI</Table.HeaderCell>
	        <Table.HeaderCell>NAMA PENRIMA</Table.HeaderCell>
	        <Table.HeaderCell>ALAMAT</Table.HeaderCell>
	        <Table.HeaderCell>KOTA</Table.HeaderCell>
	        <Table.HeaderCell>KODEPOS</Table.HeaderCell>
	        <Table.HeaderCell>NAMA PENGIRIM</Table.HeaderCell>
	        <Table.HeaderCell>ALAMAT</Table.HeaderCell>
	        <Table.HeaderCell>KOTA</Table.HeaderCell>
	        <Table.HeaderCell>KODEPOS</Table.HeaderCell>
	        <Table.HeaderCell>BERAT</Table.HeaderCell>
	        <Table.HeaderCell>BEADASAR</Table.HeaderCell>
	        <Table.HeaderCell>PPN</Table.HeaderCell>
	        <Table.HeaderCell>HTNB</Table.HeaderCell>
	        <Table.HeaderCell>PPNHTNB</Table.HeaderCell>
	        <Table.HeaderCell>BEA LAIN</Table.HeaderCell>
	        <Table.HeaderCell>TOTALBEA</Table.HeaderCell>
	        <Table.HeaderCell>TANGGAL TRX</Table.HeaderCell>
	        <Table.HeaderCell>KANTOR KIRIM</Table.HeaderCell>
	        <Table.HeaderCell>NO BARCODE</Table.HeaderCell>
	        <Table.HeaderCell>TANGGAL ANTARAN</Table.HeaderCell>
	        <Table.HeaderCell>LOKASI</Table.HeaderCell>
	        <Table.HeaderCell>KODEPOS</Table.HeaderCell>
	        <Table.HeaderCell>STATUS</Table.HeaderCell>
	        <Table.HeaderCell>KETERANGAN</Table.HeaderCell>
	        <Table.HeaderCell>3LC</Table.HeaderCell>
	      </Table.Row>
	    </Table.Header>
	    <Table.Body>
	    	{ listdata.map((data, i) => <Table.Row key={i}>
	    			<Table.Cell>{no++}</Table.Cell>
	    			<Table.Cell>{data.customer_id}</Table.Cell>
	    			<Table.Cell>{data.no_resi}</Table.Cell>
	    			<Table.Cell>{data.nm_penerima}</Table.Cell>
	    			<Table.Cell>{data.alamat_penerima}</Table.Cell>
	    			<Table.Cell>{data.kab_penerima}</Table.Cell>
	    			<Table.Cell>{data.kodepos_penerima}</Table.Cell>
	    			<Table.Cell>{data.nm_pengirim}</Table.Cell>
	    			<Table.Cell>{data.alamat_pengirim}</Table.Cell>
	    			<Table.Cell>{data.kab_pengirim}</Table.Cell>
	    			<Table.Cell>{data.kodepos_pengirim}</Table.Cell>
	    			<Table.Cell>{data.berat}</Table.Cell>
	    			<Table.Cell>{numberWithCommas(data.beadasar)}</Table.Cell>
	    			<Table.Cell>{numberWithCommas(data.ppn)}</Table.Cell>
	    			<Table.Cell>{numberWithCommas(data.htnb)}</Table.Cell>
	    			<Table.Cell>{numberWithCommas(data.ppn_htnb)}</Table.Cell>
	    			<Table.Cell>{numberWithCommas(data.bea_lain)}</Table.Cell>
	    			<Table.Cell>{numberWithCommas(data.total_bea)}</Table.Cell>
	    			<Table.Cell>{data.tgl_transaksi}</Table.Cell>
	    			<Table.Cell>{data.kantor_kirim}</Table.Cell>
	    			<Table.Cell>{data.id_order}</Table.Cell>
	    			<Table.Cell>{data.tgl_antaran}</Table.Cell>
	    			<Table.Cell>{data.lokasi_antaran}</Table.Cell>
	    			<Table.Cell>{data.kodepos}</Table.Cell>
	    			<Table.Cell>{data.status_antar}</Table.Cell>
	    			<Table.Cell>{data.keterangan}</Table.Cell>
	    			<Table.Cell>{data.tlc}</Table.Cell>
	    		</Table.Row>)}
	    </Table.Body>
    </Table>
);


class DetailInvoicePage extends React.Component {
	state = {
		data: []
	}

	componentDidMount(){
		const { noinvoice } = this.props.match.params;
		this.props.setProgressBar(true);
		api.invoice.detail(noinvoice)
			.then(res => {
				this.setState({ data: res });
				this.props.setProgressBar(false);
			})
			.catch(() => this.props.setProgressBar(false))
	}

	render(){
		const { data } = this.state;
		console.log(data);
		return(
			<Navbar>
				<div style={{ display: 'block', overflow: 'auto'}}>
					<TableDetail listdata={data} no={1} />
				</div>
			</Navbar>
		);
	}
}

DetailInvoicePage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			noinvoice: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	setProgressBar: PropTypes.func.isRequired
}

export default connect(null, { setProgressBar })(DetailInvoicePage);