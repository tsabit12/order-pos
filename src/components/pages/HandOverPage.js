import React from "react";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormHandOver from "../forms/FormHandOver";
import ListHandOver from "../list/ListHandOver";
import { getHandover } from "../../actions/handover";

class HandOverPage extends React.Component {
	state = {
		nomorpickup: ''
	}

	submit = (data) => this.props.getHandover(data).then(() => this.setState({ nomorpickup: data.nopickup }));

	render(){
		const { handoverisget, nopend } = this.props;
		return(
			<Navbar>
				<FormHandOver submit={this.submit} nopend={nopend} />
				{ handoverisget.length === 0 ? <React.Fragment /> : <ListHandOver listdata={this.props.handoverisget} nomorpickup={this.state.nomorpickup} /> }
			</Navbar>
		);
	}
}

HandOverPage.propTypes = {
	getHandover: PropTypes.func.isRequired,
	handoverisget: PropTypes.array.isRequired,
	nopend: PropTypes.string.isRequired
}

function mapStateToProps(state){
	return {
		handoverisget: state.gethandover,
		nopend: state.user.nopend
	}
}


export default connect(mapStateToProps, { getHandover })(HandOverPage);