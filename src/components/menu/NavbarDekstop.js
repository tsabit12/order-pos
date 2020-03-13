import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Menu, Image, Dropdown, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";
import Logo from "../../logosampoerna.jpg";
import User from "./routes/dekstop/User";
import Kurir from "./routes/dekstop/Kurir";
import Admin from "./routes/dekstop/Admin";
import Ae from "./routes/dekstop/Ae";

const NavbarDekstop = ({ isAuthenticated, logout, user }) => {

	const trigger = (
	  <span>
	    <Icon name='user' /> {user.nama}
	  </span>
	);



	return(
		<Menu fixed="top" inverted>
			<Menu.Item>
				<Image size="mini" floated="left" src={Logo} />
			</Menu.Item>
			{ isAuthenticated && <Menu.Item as={NavLink} to="/dashboard" title="dashboard">Dashboard</Menu.Item> }
			{ user.level === '02' && user.confirmed && <User/> }
			{ user.level === '01' && user.confirmed && <Kurir /> } 
			{ user.level === '03' && user.confirmed && <Admin /> }
			{ user.level === '04' && user.confirmed && <Ae /> }
			{ user.level === '05' && <Menu.Item as={NavLink} to="/pickuper">Pickup</Menu.Item> }

			<Menu.Menu position="right">
				{ isAuthenticated && <Menu.Item>
					<Dropdown trigger={trigger}>
						<Dropdown.Menu>
							<Dropdown.Item disabled><strong>{user.username}</strong></Dropdown.Item>
							<Dropdown.Divider />
								{ user.confirmed && <Dropdown.Item as={NavLink} to="/changepassword">Ganti Password</Dropdown.Item>}
							<Dropdown.Item onClick={() => logout() }>Sign Out</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown> 
				</Menu.Item> }
				{ !isAuthenticated && <React.Fragment>
					<Menu.Item as={Link} to="/login" title="Login">Login</Menu.Item> 
					<Menu.Item as={Link} to="/signup" title="Signup">Signup</Menu.Item> 
				</React.Fragment>}
			</Menu.Menu> 
		</Menu>
	);
} 

NavbarDekstop.propTypes = {
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.user,
		isAuthenticated: !!state.user.token
	}
}


export default connect(mapStateToProps, { logout: actions.logout })(NavbarDekstop);