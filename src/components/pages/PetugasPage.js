import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPetugas } from "../../actions/petugas";
import { setProgressBar } from "../../actions/progress";
import ListPetugas from "../list/ListPetugas";

class PetugasPage extends React.Component {

	componentDidMount(){
		this.props.setProgressBar(true);
		this.props.fetchPetugas().then(() => this.props.setProgressBar(false));
	}

	render(){
		return(
			<Navbar>
				<ListPetugas listdata={this.props.petugas} />
			</Navbar>
		);
	}
}

PetugasPage.propTypes = {
	fetchPetugas: PropTypes.func.isRequired,
	petugas: PropTypes.array.isRequired
}

function mapStateProps(state){
	return {
		petugas: state.petugas.petugas
	}
}

export default connect(mapStateProps, { fetchPetugas, setProgressBar })(PetugasPage);