import React from "react";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormHandOver from "../forms/FormHandOver";
import api from "../../api";

class HandOverPage extends React.Component {
	submit = (data) => api.order.get_handover(data)

	render(){
		const { nopend } = this.props;
		// console.log(data);
		return(
			<Navbar>
				<FormHandOver 
					submit={this.submit} 
					nopend={nopend} 
				/>
			</Navbar>
		);
	}
}

HandOverPage.propTypes = {
	nopend: PropTypes.string.isRequired
}

function mapStateToProps(state){
	return {
		nopend: state.user.nopend
	}
}


export default connect(mapStateToProps, null)(HandOverPage);