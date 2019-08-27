import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";

const NavbarDekstop = ({ isAuthenticated, logout }) => (
	<Menu fixed="top" inverted>
		<Menu.Item>
			<Image size="mini" src="https://react.semantic-ui.com/logo.png" />
		</Menu.Item>
		<Menu.Item as={Link} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
		<Menu.Item as={Link} to="/order" title="Add Posting">Order</Menu.Item>
		<Menu.Item as={Link} to="/lacak" title="Lacak Kiriman">Lacak</Menu.Item>
		 <Dropdown item simple text='Menu Lain'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/addposting">Add Posting</Dropdown.Item>
              <Dropdown.Item as={Link} to="/handover">Hand Over Pickup</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
		<Menu.Menu position="right">
		<Menu.Item as="a" title="Add Posting" onClick={() => logout() }>Logout</Menu.Item>
		</Menu.Menu> 
	</Menu>
);

NavbarDekstop.propTypes = {
	logout: PropTypes.func.isRequired
}


export default connect(null, { logout: actions.logout })(NavbarDekstop);