import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";


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
			<Menu.Item as={Link} to="/lacak">Lacak</Menu.Item>
			<Menu.Item as={Link} to="/addposting">Add Posting</Menu.Item>
			<Menu.Item as={Link} to="/handover">Hand Over Pickup</Menu.Item>
		</Sidebar>
		<Sidebar.Pusher
			dimmed={visible}
			onClick={onPusherClick}
			style={{ minHeight: "100vh" }}>
			<Menu fixed="top" inverted>
				<Menu.Item>
					<Image size="mini" src="https://react.semantic-ui.com/logo.png" />
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