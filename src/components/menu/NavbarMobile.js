import React, { createRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon, Image, Segment, Sticky, Ref } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";
import Logo from "../../logosampoerna.png";

import User from "./routes/mobile/User";
import Kurir from "./routes/mobile/Kurir";
import Admin from "./routes/mobile/Admin";
import Ae from "./routes/mobile/Ae";

const contextRef = createRef();

const NavbarMobile = ({ children, onPusherClick, onToggle, visible, logout, level, isAuthenticated }) => (
	<React.Fragment>
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
		<br/>
		<br/>
		<Ref innerRef={contextRef}>
			<Sidebar.Pushable as={Segment} style={{left: '-1px', transform: "none"}}>
				<Sticky context={contextRef}>
					<Sidebar
						as={Menu}
						animation="overlay"
						icon="labeled"
						style={{width: "208px"}}
						inverted
						vertical
						visible={visible}>
						{ level === '01' && <Kurir /> }
						{ level === '02' && <User /> } 
						{ level === '03' && <Admin /> } 
						{ level === '04' && <Ae /> } 
					</Sidebar>
				</Sticky>
				<Sidebar.Pusher
					style={{ minHeight: '84.6vh' }}
					dimmed={visible}
					onClick={onPusherClick}>
					{ children }
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		</Ref>
	</React.Fragment>
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