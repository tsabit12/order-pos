import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSelesaiAntar } from "../../actions/laporan";
import { setProgressBar } from "../../actions/progress";
import { Header, Divider, Message, Table } from "semantic-ui-react";

const countDay = (tglStart, tglEnd) => {
	const oneDay 		= 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const firstDate 	= new Date(tglStart);
	const secondDate 	= new Date(tglEnd);
	const diffDays 		= Math.round(Math.abs((firstDate - secondDate) / oneDay));
	return diffDays;
}

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
		        <Table.HeaderCell>Nomor Resi</Table.HeaderCell>
		        <Table.HeaderCell>Id Order</Table.HeaderCell>
		        <Table.HeaderCell style={{textAlign: 'right'}}>Bsu Order</Table.HeaderCell>
		        <Table.HeaderCell style={{textAlign: 'right'}}>Real Trans</Table.HeaderCell>
		        <Table.HeaderCell>Perihal</Table.HeaderCell>
		        <Table.HeaderCell>Tanggal Order</Table.HeaderCell>
		        <Table.HeaderCell>Tanggal Antaran</Table.HeaderCell>
		        <Table.HeaderCell>Jangka Waktu</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>
		    <Table.Body>
		    	{ listdata.map((x, i) => <Table.Row key={i}>
		    		<Table.Cell>{no++}</Table.Cell>
		    		<Table.Cell>{x.no_resi}</Table.Cell>
		    		<Table.Cell>{x.no_barcode}</Table.Cell>
		    		<Table.Cell style={{textAlign: 'right'}}>{numberWithCommas(x.bsu_order)}</Table.Cell>
		    		<Table.Cell style={{textAlign: 'right'}}>{numberWithCommas(x.real_trans)}</Table.Cell>
		    		<Table.Cell>{x.contentdesc}</Table.Cell>
		    		<Table.Cell>{x.tgl_order}</Table.Cell>
		    		<Table.Cell>{x.tgl_antaran}</Table.Cell>
		    		<Table.Cell>{countDay(x.tgl_order, x.tgl_antaran)} hari</Table.Cell>
		    	</Table.Row>)}
		    </Table.Body>
		</Table>
	);
}

class SelesaiAntarPage extends React.Component{
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
		this.props.getSelesaiAntar(userid)
			.then(() => this.props.setProgressBar(false))
			.catch(err => {
				this.props.setProgressBar(false);
				this.setState({ errors: err.response.data.errors })
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
				    content='Selesai Antar'
				    subheader='Berikut data order dengan status selesai antar'
				  />
				  <Divider />
				{ errors.global && <Message negative>
					<Message.Header>Oppps!</Message.Header>
					<p>{errors.global}</p>
				</Message> }

				{ data.length > 0 && !errors.global && <ListData listdata={data} /> }
			</Navbar>
		);
	}
}

SelesaiAntarPage.propTypes = {
	auth: PropTypes.object.isRequired,
	listdata: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		auth: state.user,
		listdata: state.laporan.selesaiAntar
	}
}

export default connect(mapStateToProps, { getSelesaiAntar, setProgressBar })(SelesaiAntarPage);