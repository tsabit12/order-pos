import React from "react";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLaporanHandover } from "../../actions/laporan";
import { Message, Header, Divider, Table } from "semantic-ui-react";
import { setProgressBar } from "../../actions/progress";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ListHandover = ({ list }) => {
	var no = 1;
	return(
		<Table singleLine>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>No</Table.HeaderCell>
		        <Table.HeaderCell>Nomor PO</Table.HeaderCell>
		        <Table.HeaderCell>Nomor Pickup</Table.HeaderCell>
		        <Table.HeaderCell>Tanggal Assign</Table.HeaderCell>
		        <Table.HeaderCell>Id Order</Table.HeaderCell>
		        <Table.HeaderCell>Perihal</Table.HeaderCell>
		        <Table.HeaderCell>PIN</Table.HeaderCell>
		        <Table.HeaderCell style={{textAlign: 'right'}}>BSU Order</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>
		    <Table.Body>
		    	{ list.map((x, i) => <Table.Row key={i}> 
		    		<Table.Cell>{no++}</Table.Cell>
		    		<Table.Cell>{x.id_po}</Table.Cell>
		    		<Table.Cell>{x.no_pickup}</Table.Cell>
		    		<Table.Cell>{x.tgl_assigment}</Table.Cell>
		    		<Table.Cell>{x.id_order}</Table.Cell>
		    		<Table.Cell>{x.contentdesc}</Table.Cell>
		    		<Table.Cell>{x.pin}</Table.Cell>
		    		<Table.Cell style={{textAlign: 'right'}}>{numberWithCommas(x.bsu_order)}</Table.Cell>
		    	</Table.Row>)}
		    </Table.Body>
		</Table>
	);
}

class LaporanHandoverPage extends React.Component{
	state = {
		errors: {},
		data: []
	}

	componentDidMount(){
		this.props.setProgressBar(true);
		const { listdata } = this.props;
		if (listdata.length > 0) {
			this.setState({ data: listdata });
		}

		const { userid } = this.props.auth;
		this.props.getLaporanHandover(userid)
			.then(() => this.props.setProgressBar(false))
			.catch(err => {
				this.props.setProgressBar(false);	
				this.setState({ errors: err.response.data.errors });
			});
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
				    content='Handover'
				    subheader='Laporan handover'
				/>
				<Divider />
				{ errors.global && <Message negative>
					<Message.Header>Oppps!</Message.Header>
					<p>{errors.global}</p>
				</Message> }
				{ data.length > 0 && !errors.global && <ListHandover list={data} /> }
			</Navbar>
		);
	}
}

LaporanHandoverPage.propTypes = {
	auth: PropTypes.object.isRequired,
	listdata: PropTypes.array.isRequired,
	getLaporanHandover: PropTypes.func.isRequired,
	setProgressBar: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		auth: state.user,
		listdata: state.laporan.handover
	}
}

export default connect(mapStateToProps, { getLaporanHandover, setProgressBar })(LaporanHandoverPage);