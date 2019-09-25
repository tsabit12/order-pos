import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";
import Logo from "../../logosampoerna.png";

const NavbarMobile = ({ children, onPusherClick, onToggle, visible, logout, level, isAuthenticated }) => (
	<Sidebar.Pushable>
		<Sidebar
			as={Menu}
			animation="overlay"
			icon="labeled"
			inverted
			style={{width: "208px"}}
			vertical
			visible={visible}>
			{ level === '02' && <React.Fragment>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/order">Order</Menu.Item>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/po">Entri PO</Menu.Item>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/topup">Topup</Menu.Item>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/pickup">Request Pickup</Menu.Item>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/lacak">Lacak Kiriman</Menu.Item>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/transaction">Real Transaction</Menu.Item>
			</React.Fragment> } 
			{ level === '01' && <React.Fragment>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/dashboard">Dashboard</Menu.Item>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/assigment">Assigment Pickup</Menu.Item>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/handover">Handover Pickup</Menu.Item>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/invoice">Invoice</Menu.Item>
				<Menu.Item style={{textAlign: 'left'}} as={Link} to="/petugas">User</Menu.Item>
			</React.Fragment> }
		</Sidebar>
		<Sidebar.Pusher
			dimmed={visible}
			onClick={onPusherClick}
			style={{ minHeight: "100vh" }}>
			<Menu fixed="top" inverted>
				<Menu.Item>
					<Image size="mini" floated="left" src={Logo} />
				</Menu.Item>
				{ isAuthenticated ? <React.Fragment>
					<Menu.Item onClick={onToggle}>
						<Icon name="sidebar"/>
					</Menu.Item>
					<Menu.Menu position="right">
						<Menu.Item as="a" title="Logout" onClick={() => logout() }>Logout</Menu.Item>
					</Menu.Menu>
				</React.Fragment> : <React.Fragment>
					<Menu.Menu position="right">
						<Menu.Item as={Link} to="/login" title="Login" >Login</Menu.Item>
						<Menu.Item as={Link} to="/signup" title="Signup" >Signup</Menu.Item>
					</Menu.Menu>
				</React.Fragment>}
			</Menu>
			{ children }
		</Sidebar.Pusher>
	</Sidebar.Pushable>
);

NavbarMobile.propTypes = {
	logout: PropTypes.func.isRequired,
	level: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	return{
		level: state.user.level,
		isAuthenticated: !!state.user.token
	}
}

export default connect(mapStateToProps, { logout: actions.logout })(NavbarMobile);