import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";
import Logo from "../../logosampoerna.png";

const NavbarMobile = ({ children, onPusherClick, onToggle, visible, logout, level }) => (
	<Sidebar.Pushable>
		<Sidebar
			as={Menu}
			animation="overlay"
			icon="labeled"
			inverted
			style={{width: "208px"}}
			vertical
			visible={visible}>
			{ level === '02' ? <React.Fragment>
				<Menu.Item as={Link} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
				<Menu.Item as={Link} to="/order">Order</Menu.Item>
				<Menu.Item as={Link} to="/po">Entri PO</Menu.Item>
				<Menu.Item as={Link} to="/transaction">Real Transaction</Menu.Item>
				<Menu.Item as={Link} to="/lacak">Lacak</Menu.Item>
				<Menu.Item as={Link} to="/pickup">Request Pickup</Menu.Item>
			</React.Fragment> : <React.Fragment>
				<Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
				<Menu.Item as={Link} to="/assigment">Assigment Pickup</Menu.Item>
				<Menu.Item as={Link} to="/handover">Handover Pickup</Menu.Item>
				<Menu.Item as={Link} to="/petugas">User</Menu.Item>
			</React.Fragment>
			}
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
	logout: PropTypes.func.isRequired,
	level: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		level: state.user.level
	}
}

export default connect(mapStateToProps, { logout: actions.logout })(NavbarMobile);