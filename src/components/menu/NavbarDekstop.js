import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";

const NavbarDekstop = ({ isAuthenticated, logout }) => (
	<Menu fixed="top" inverted>
		<Menu.Item>
			<Image size="mini" src="https://react.semantic-ui.com/logo.png" />
		</Menu.Item>
		<Menu.Item as={Link} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
		<Menu.Item as={Link} to="/addposting" title="Add Posting">Add Posting</Menu.Item>
		<Menu.Menu position="right">
		<Menu.Item as="a" title="Add Posting" onClick={() => logout() }>Logout</Menu.Item>
		</Menu.Menu> 
	</Menu>
);

NavbarDekstop.propTypes = {
	logout: PropTypes.func.isRequired
}


export default connect(null, { logout: actions.logout })(NavbarDekstop);