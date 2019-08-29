import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";
import Logo from "../../logo_sampoerna.jpg";

const NavbarMobile = ({ children, onPusherClick, onToggle, visible, logout }) => (
	<Sidebar.Pushable>
		<Sidebar
			as={Menu}
			animation="overlay"
			icon="labeled"
			inverted
			style={{width: "208px"}}
			vertical
			visible={visible}>
			<Menu.Item as={Link} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
			<Menu.Item as={Link} to="/order">Order</Menu.Item>
			<Menu.Item as={Link} to="/po">Entri PO</Menu.Item>
			<Menu.Item as={Link} to="/transaction">Real Transaction</Menu.Item>
			<Menu.Item as={Link} to="/lacak">Lacak</Menu.Item>
			<Menu.Item as={Link} to="/pickup">Request Pickup</Menu.Item>
			<Menu.Item as={Link} to="/assigment">Assigment Pickup</Menu.Item>
		</Sidebar>
		<Sidebar.Pusher
			dimmed={visible}
			onClick={onPusherClick}
			style={{ minHeight: "100vh" }}>
			<Menu fixed="top" inverted>
				<Menu.Item>
					<Image size="mini" src={Logo} />
				</Menu.Item>
				<Menu.Item onClick={onToggle}>
					<Icon name="sidebar"/>
				</Menu.Item>
				<Menu.Menu position="right">
					<Menu.Item as="a" title="Add Posting" onClick={() => logout() }>Logout</Menu.Item>
				</Menu.Menu>
			</Menu>
			{ children }
		</Sidebar.Pusher>
	</Sidebar.Pushable>
);

NavbarMobile.propTypes = {
	logout: PropTypes.func.isRequired
}

export default connect(null, { logout: actions.logout })(NavbarMobile);