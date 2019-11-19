import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../menu/Navbar";
import { Button, Message, Divider } from "semantic-ui-react";
// import ListPetugasPickup from "../list/ListPetugasPickup";
import { setProgressBar } from "../../actions/progress";
import { fetchPetugasPickup, addPetugas } from "../../actions/petugas";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const Empty = () => (
	<Message
	    warning
	    header='Kosong'
	    content='Data assigment tidak ditemukan'
	/>
);

class PetugasPickupPage extends React.Component {

	componentDidMount(){
		const { nopend } = this.props;
		this.props.setProgressBar(true);
		this.props.fetchPetugasPickup(nopend)
			.then(() => this.props.setProgressBar(false))
	}

	validate = (data) => {
		const errors = {};
		if (!data.namapetugas) errors.namapetugas = "Nama petugas harap di isi";
		if (!data.nippos) errors.nippos = "Nippos tidak boleh kosong";
		if (!data.status) errors.status = "Status harap di pilih";
		return errors;
	}

	convertStatus = (status) => {
		if (status === '00') {
			return 'Aktif';
		}else{
			return 'Tidak Aktif';
		}
	}

	render(){
		const { listPetugas } = this.props;
		const columns = [{
			Header: 'No',
			Cell: row => (
				<p>{row.index+1}</p>
			)
		  },{
		    Header: 'NIPPOS',
		    accessor: 'id_petugas' // String-based value accessors!
		  }, {
		    Header: 'NAMA',
		    accessor: 'nama_petugas'
		  }, {
		    Header: 'TANGGAL INSERT',
		    accessor: 'tgl'
		  }, {
		  	Header: 'STATUS',
		  	Cell: row => (
		  		<p>{this.convertStatus(row.original.status)}</p>
		  	)
		}];

		return(
			<Navbar>
				<Button primary as={Link} to="/pickup/petugas/tambah">Tambah Petugas</Button>
				<Divider />
				{ listPetugas.length === 0 ? <Empty /> : 
					<ReactTable
					    data={listPetugas}
					    columns={columns}
					    defaultPageSize={10}
					    style={{textAlign:"center"}}
					/> }
			</Navbar>
		);
	}
}

PetugasPickupPage.propTypes = {
	setProgressBar: PropTypes.func.isRequired,
	nopend: PropTypes.string.isRequired,
	fetchPetugasPickup: PropTypes.func.isRequired,
	addPetugas: PropTypes.func.isRequired,
	listPetugas: PropTypes.array.isRequired
}

function mapStateProps(state) {
	return{
		nopend: state.user.nopend,
		listPetugas: state.petugas.pickup
	}
}

export default connect(mapStateProps, { setProgressBar, fetchPetugasPickup, addPetugas })(PetugasPickupPage);