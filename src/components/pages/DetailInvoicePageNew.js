import React from "react";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import { setProgressBar } from "../../actions/progress";
import { getDetail } from "../../actions/invoice";
import PropTypes from "prop-types";
import { Message, Table, Breadcrumb, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import api from "../../api";
import FileDownload from "js-file-download";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const DataDetail = ({ list, pdf, loadingPdf, excel, loadingExcel }) => {
	var no = 1;
	const totalAll 	= list.reduce((a, b) => +a + +b.fee, 0);
	return(
		<React.Fragment>
			<div>
				<Button 
					icon 
					primary 
					size='small' 
					onClick={() => pdf()}
					loading={loadingPdf}
					disabled={loadingPdf}
				>
					<Icon name='download' /> PDF
				</Button>
				<Button 
					icon 
					positive 
					size='small'
					onClick={() => excel()}
					loading={loadingExcel}
					disabled={loadingExcel}
				>
					<Icon name='download' /> Excel
				</Button>
			</div>
			<div style={{paddingTop: '12px'}}>
				<span style={{color: 'red'}}>PPN, PPNHTNB dll ada di dalam format pdf atau excel setelah anda download</span>
			</div>
			<Table singleLine style={{marginTop: '1px'}}>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>No</Table.HeaderCell>
			        <Table.HeaderCell>Nomor Pickup</Table.HeaderCell>
			        <Table.HeaderCell>External Id</Table.HeaderCell>
			        <Table.HeaderCell>Deskripsi Kiriman</Table.HeaderCell>
			        <Table.HeaderCell>Pengirim</Table.HeaderCell>
			        <Table.HeaderCell>Penerima</Table.HeaderCell>
			        <Table.HeaderCell textAlign='right'>Fee</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>
			    <Table.Body>
			    	{list.map(x => <Table.Row key={x.id_order}>
			    		<Table.Cell>{no++}</Table.Cell>
			    		<Table.Cell>{x.no_pickup}</Table.Cell>
			    		<Table.Cell>{x.id_order}</Table.Cell>
			    		<Table.Cell>{x.contentdesc}</Table.Cell>
			    		<Table.Cell>
			    			{x.nm_pengirim} <br/>
			    			{x.city} / {x.address1}
			    		</Table.Cell>
			    		<Table.Cell>
			    			{x.nm_penerima} <br/>
			    			{x.prov} / {x.kab} / {x.kec}
			    		</Table.Cell>
			    		<Table.Cell textAlign='right'>{numberWithCommas(x.fee)}</Table.Cell>
			    	</Table.Row>)}
			    </Table.Body>
			    <Table.Footer>
			    	<Table.Row>
			    		<Table.HeaderCell colSpan='6' style={{fontWeight: 'bold'}}>Total</Table.HeaderCell>
			    		<Table.HeaderCell textAlign='right' style={{fontWeight: 'bold'}}>{numberWithCommas(totalAll)}</Table.HeaderCell>
			    	</Table.Row>
			    </Table.Footer>
			</Table>
		</React.Fragment>
	);
}

class DetailInvoicePageNew extends React.Component{
	state = {
		errors: {},
		loadingPdf: false,
		loadingExcel: false
	}

	componentDidMount(){
		const { id } = this.props.match.params;
		this.props.setProgressBar(true);
		this.props.getDetail(id)
			.then(() => this.props.setProgressBar(false))
			.catch(err => {
				this.props.setProgressBar(false);
				this.setState({ errors: err.response.data.errors });
			})
	}

	onDownloadPdf = () => {
		const { id } = this.props.match.params;
		this.setState({ loadingPdf: true });
		api.invoice.downloadDetail(id)
			.then(res => {
				let blob = new Blob([res], { type: 'application/pdf' }),
			  	url = window.URL.createObjectURL(blob);
			  	window.open(url); 
			  	this.setState({ loadingPdf: false });
			})
			.catch(err => {
				this.setState({ loadingPdf: false });	
				console.log(err.response.status);
			});
	}

	onDownloadExcel = () => {
		const { id } = this.props.match.params;
		this.setState({ loadingExcel: true });
		api.invoice.downloadDetailExcel(id)
			.then(res => {
				FileDownload(res, `detailInvoice_${id}.xls`);
				this.setState({ loadingExcel: false });
			})
			.catch(err => {
				console.log(err);
				this.setState({ loadingExcel: false });
			})
	}

	render(){
		const { errors } = this.state;
		const { listdetail } = this.props;
		//const test = Object.keys(listdetail).filter(x => x === this.props.match.params.id);
		return(
			<Navbar>
				{ errors.global && <Message negative>
					<Message.Header>Oppps!</Message.Header>
					<p>{errors.global}</p>
				</Message> }
				<Message visible>
					<Breadcrumb>
					    <Breadcrumb.Section as={Link} to="/laporan_invoice">Invoice</Breadcrumb.Section>
					    <Breadcrumb.Divider />
					    <Breadcrumb.Section link>Detail</Breadcrumb.Section>
					    <Breadcrumb.Divider />
					    <Breadcrumb.Section active>{this.props.match.params.id}</Breadcrumb.Section>
					</Breadcrumb>
				</Message>
				{ listdetail.length > 0 && 
					<DataDetail 
						list={listdetail} 
						pdf={this.onDownloadPdf}
						loadingPdf={this.state.loadingPdf}
						excel={this.onDownloadExcel}
						loadingExcel={this.state.loadingExcel}
					/> }
			</Navbar>
		);
	}
}

DetailInvoicePageNew.propTypes = {
	setProgressBar: PropTypes.func.isRequired,
	getDetail: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	listdetail: PropTypes.array.isRequired
}

function mapStateToProps(state, nextProps) {
	const { id } = nextProps.match.params;
	return{
		listdetail: state.invoice.detail[id] ? state.invoice.detail[id] : []
	}
}

export default connect(mapStateToProps, { setProgressBar, getDetail })(DetailInvoicePageNew);