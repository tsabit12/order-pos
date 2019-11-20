import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Divider, Message, Table } from "semantic-ui-react";
import { setProgressBar } from "../../actions/progress";
import { getLapPickup } from "../../actions/laporan";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ListData = ({ listdata }) => {
	var no = 1;
	return(
		<Table singleLine>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>No</Table.HeaderCell>
		        <Table.HeaderCell>ID Order</Table.HeaderCell>
		        <Table.HeaderCell>Nomor Request</Table.HeaderCell>
		        <Table.HeaderCell>Tanggal Order</Table.HeaderCell>
		        <Table.HeaderCell>Tanggal Request</Table.HeaderCell>
		        <Table.HeaderCell>Perihal</Table.HeaderCell>
		        <Table.HeaderCell style={{textAlign: 'right'}}>BSU Order</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>
		    <Table.Body>
		    	{ listdata.map((x, i) => <Table.Row key={i}>
		    			<Table.Cell>{no++}</Table.Cell>
		    			<Table.Cell>{x.id_order}</Table.Cell>
		    			<Table.Cell>{x.no_request}</Table.Cell>
		    			<Table.Cell>{x.tgl_order}</Table.Cell>
		    			<Table.Cell>{x.tgl_req}</Table.Cell>
		    			<Table.Cell>{x.contentdesc}</Table.Cell>
		    			<Table.Cell style={{textAlign: 'right'}}>{numberWithCommas(x.bsu_order)}</Table.Cell>
		    		</Table.Row>)}
		    	<Table.Row>
			    </Table.Row>
		    </Table.Body>
		</Table>
	);
}

class LaporanPickupPage extends React.Component{
	state = {
		errors: {},
		data: []
	}

	componentDidMount(){
		const { userid } = this.props.auth;
		const { listdata } = this.props;
		if (listdata.length > 0) {
			this.setState({ data: listdata });
		}

		this.props.setProgressBar(true);
		this.props.getLapPickup(userid)
			.then(() => this.props.setProgressBar(false))
			.catch(err => {
				this.props.setProgressBar(false);
				this.setState({ errors: err.response.data.errors });
			})
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		if (nextProps.listdata) {
			this.setState({ data: nextProps.listdata });
		}
	}

	render(){
		const { errors, data } = this.state;
		return(
			<Navbar>
				 <Header
				    as='h2'
				    content='Laporan Pickup'
				    subheader='Berikut adalah data order dengan status request pickup'
				  />
				  <Divider />
				  { errors.global && <Message negative>
						<Message.Header>Oppps!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
				{ data.length > 0 && !errors.global && <ListData listdata={data} />}
			</Navbar>
		);	
	}
}

LaporanPickupPage.propTypes = {
	auth: PropTypes.object.isRequired,
	listdata: PropTypes.array.isRequired,
	getLapPickup: PropTypes.func.isRequired,
	setProgressBar: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		auth: state.user,
		listdata: state.laporan.reqPickup
	}
}


export default connect(mapStateToProps, { setProgressBar, getLapPickup })(LaporanPickupPage);