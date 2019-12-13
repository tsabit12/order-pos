import React from "react";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import { setProgressBar } from "../../actions/progress";
import { getDetail } from "../../actions/invoice";
import PropTypes from "prop-types";
import { Message, Table, Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const DataDetail = ({ list }) => {
	var no = 1;
	const totalAll 	= list.reduce((a, b) => +a + +b.fee, 0);
	return(
		<Table singleLine>
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
	);
}

class DetailInvoicePageNew extends React.Component{
	state = {
		errors: {}
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
				<Breadcrumb>
				    <Breadcrumb.Section as={Link} to="/laporan_invoice">Invoice</Breadcrumb.Section>
				    <Breadcrumb.Divider />
				    <Breadcrumb.Section link>Detail</Breadcrumb.Section>
				    <Breadcrumb.Divider />
				    <Breadcrumb.Section active>{this.props.match.params.id}</Breadcrumb.Section>
				</Breadcrumb>
				{ listdetail.length > 0 && <DataDetail list={listdetail} /> }
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