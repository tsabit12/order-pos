import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../menu/Navbar";

const DashboardPage = ({ username }) => <Navbar>Hallo {username}</Navbar>;


DashboardPage.propTypes = {
	username: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		username: state.user.username
	}
}

export default connect(mapStateToProps, null)(DashboardPage);