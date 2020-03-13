import React, { createRef } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Sidebar, Menu, Icon, Image, Segment, Sticky, Ref, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";
import Logo from "../../logosampoerna.jpg";

import User from "./routes/mobile/User";
import Kurir from "./routes/mobile/Kurir";
import Admin from "./routes/mobile/Admin";
import Ae from "./routes/mobile/Ae";

const contextRef = createRef();

const NavbarMobile = ({ children, onPusherClick, onToggle, visible, logout, user, isAuthenticated }) => {

	const trigger = (
	  <span>
	    <Icon name='user' />
	  </span>
	);

	return(
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
						<Menu.Item>
							<Dropdown trigger={trigger}>
								<Dropdown.Menu>
									<Dropdown.Item disabled><strong>{user.username}</strong></Dropdown.Item>
										{ user.confirmed && <Dropdown.Item as={NavLink} to="/changepassword">Ganti Password</Dropdown.Item>}
									<Dropdown.Item onClick={() => logout() }>Sign Out</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Menu.Item>
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
							<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/dashboard">Dashboard</Menu.Item>
							{ user.level === '01' && user.confirmed && <Kurir /> }
							{ user.level === '02' && user.confirmed && <User /> } 
							{ user.level === '03' && user.confirmed && <Admin /> } 
							{ user.level === '04' && user.confirmed && <Ae /> } 
							{ user.level === '05' && user.confirmed && <Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/pickuper">Pickup</Menu.Item> } 
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

}

NavbarMobile.propTypes = {
	logout: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.user,
		isAuthenticated: !!state.user.token
	}
}

export default connect(mapStateToProps, { logout: actions.logout })(NavbarMobile);