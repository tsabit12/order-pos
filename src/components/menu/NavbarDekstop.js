import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";
import Logo from "../../logo_sampoerna.jpg";

const NavbarDekstop = ({ isAuthenticated, logout }) => (
	<Menu fixed="top" inverted>
		<Menu.Item>
			<Image size="mini" src={Logo} />
		</Menu.Item>
		<Menu.Item as={Link} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
		<Menu.Item as={Link} to="/order" title="Add Posting">Order</Menu.Item>
		<Menu.Item as={Link} to="/po" title="Lacak Kiriman">Entri PO</Menu.Item>
		 <Dropdown item simple text='Menu Lain'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/transaction">Get Real Transaction</Dropdown.Item>              
              <Dropdown.Item as={Link} to="/lacak">Lacak Kiriman</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/pickup">Request Pickup</Dropdown.Item>
              <Dropdown.Item as={Link} to="/assigment">Assigment Pickup</Dropdown.Item>
              <Dropdown.Item as={Link} to="/handover">Handover Pickup</Dropdown.Item>
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