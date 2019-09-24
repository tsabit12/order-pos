import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";
import Logo from "../../logoposindonesia2.png";

const NavbarDekstop = ({ isAuthenticated, logout, level }) => (
	<Menu fixed="top" inverted>
		<Menu.Item>
			<Image size="tiny" floated="left" src={Logo} />
		</Menu.Item>
		{ level === '02' && <React.Fragment>
			<Menu.Item as={Link} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
			<Menu.Item as={Link} to="/order" title="Add Posting">Order</Menu.Item>
			<Menu.Item as={Link} to="/po" title="Lacak Kiriman">Entri PO</Menu.Item>
			<Dropdown item simple text='Laporan'>
				<Dropdown.Menu>
		          <Dropdown.Item as={Link} to="/list_po">List Purchase Order</Dropdown.Item>   
		        </Dropdown.Menu>
			</Dropdown>
			<Dropdown item simple text='Menu Lain'>
		        <Dropdown.Menu>
		          <Dropdown.Item as={Link} to="/topup">Topup</Dropdown.Item>
		          <Dropdown.Item as={Link} to="/pickup">Request Pickup</Dropdown.Item>
		          <Dropdown.Item as={Link} to="/lacak">Lacak Kiriman</Dropdown.Item>
		          <Dropdown.Divider />
		          <Dropdown.Item as={Link} to="/transaction">Get Real Transaction</Dropdown.Item>              
		        </Dropdown.Menu>
		    </Dropdown>
		</React.Fragment>  }
		{ level === '01' &&  <React.Fragment>
			<Menu.Item as={Link} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
			<Menu.Item as={Link} to="/assigment">Assigment</Menu.Item>
			<Dropdown item simple text='Invoice'>
				<Dropdown.Menu>
			        <Dropdown.Item as={Link} to="/invoice">Cetak Invoice</Dropdown.Item>
			        <Dropdown.Item as={Link} to="/invoice/laporan">Laporan Invoice</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<Menu.Item as={Link} to="/handover">Handover</Menu.Item>
			<Menu.Item as={Link} to="/petugas">User</Menu.Item>
		</React.Fragment> }

		<Menu.Menu position="right">
			{ isAuthenticated && <Menu.Item as="a" title="Logout" onClick={() => logout() }>Logout</Menu.Item> }
			{ !isAuthenticated && <React.Fragment>
				<Menu.Item as={Link} to="/login" title="Login">Login</Menu.Item> 
				<Menu.Item as={Link} to="/signup" title="Signup">Signup</Menu.Item> 
			</React.Fragment>}
		</Menu.Menu> 
	</Menu>
);

NavbarDekstop.propTypes = {
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	return{
		level: state.user.level,
		isAuthenticated: !!state.user.token
	}
}


export default connect(mapStateToProps, { logout: actions.logout })(NavbarDekstop);