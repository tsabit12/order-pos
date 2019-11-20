import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchLapAssigment } from "../../actions/laporan";
import { Message, Table, Header, Divider } from "semantic-ui-react";
import { setProgressBar } from "../../actions/progress";


const ListAssigment = ({ listdata }) => {
	var no = 1;
	return(
		<Table singleLine>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>No</Table.HeaderCell>
		        <Table.HeaderCell>Nomor Pickup</Table.HeaderCell>
		        <Table.HeaderCell>Tanggal Assign</Table.HeaderCell>
		        <Table.HeaderCell>Id Order</Table.HeaderCell>
		        <Table.HeaderCell>Perihal</Table.HeaderCell>
		        <Table.HeaderCell>Dipickup</Table.HeaderCell>
		        <Table.HeaderCell>Kantor Pickup</Table.HeaderCell>
		        <Table.HeaderCell>Petugas Pickup</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>
		    <Table.Body>
		    	{ listdata.map((x, i) => <Table.Row key={i}>
		    			<Table.Cell>{no++}</Table.Cell>
		    			<Table.Cell>{x.no_pickup}</Table.Cell>
		    			<Table.Cell>{x.tgl_assigment}</Table.Cell>
		    			<Table.Cell>{x.id_order}</Table.Cell>
		    			<Table.Cell>{x.contentdesc}</Table.Cell>
		    			<Table.Cell>{x.namakantor}</Table.Cell>
		    			<Table.Cell>{x.NamaKtr}</Table.Cell>
		    			<Table.Cell>{x.nama_petugas}</Table.Cell>
		    		</Table.Row>)}
		    	<Table.Row>
			    </Table.Row>
		    </Table.Body>
		</Table>
	);
}

class LaporanAssigmentPage extends React.Component{
	state = {
		errors: {},
		data: []
	}

	componentDidMount(){
		const { userid } = this.props.auth;
		const { assigments } = this.props;
		
		if (assigments.length > 0) {
			this.setState({ data: assigments });
		}

		this.props.setProgressBar(true);
		this.props.fetchLapAssigment(userid)
			.then(() => this.props.setProgressBar(false))
			.catch(err => {
				this.setState({ errors: err.response.data.errors });
				this.props.setProgressBar(false);
			})
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		if (nextProps.assigments) {
			const { assigments } = nextProps;
			this.setState({ data: assigments });
		}
	}

	render(){
		const { errors, data } = this.state;

		return(
			<Navbar>
				 <Header
				    as='h2'
				    content='Assigment'
				    subheader='Berikut adalah data order yang sudah di assign'
				  />
				  <Divider />
				{ errors.global && <Message negative>
					<Message.Header>Oppps!</Message.Header>
					<p>{errors.global}</p>
				</Message> }

				{ data.length > 0 && !errors.global && <ListAssigment listdata={data} /> }
			</Navbar>
		);
	}
}

LaporanAssigmentPage.propTypes = {
	fetchLapAssigment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	assigments: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		auth: state.user,
		assigments: state.laporan.assigment
	}
}

export default connect(mapStateToProps, { fetchLapAssigment, setProgressBar })(LaporanAssigmentPage);