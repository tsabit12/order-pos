import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";
import Logo from "../../logosampoerna.png";
import User from "./routes/dekstop/User";
import Kurir from "./routes/dekstop/Kurir";
import Admin from "./routes/dekstop/Admin";

const NavbarDekstop = ({ isAuthenticated, logout, level }) => (
	<Menu fixed="top" inverted>
		<Menu.Item>
			<Image size="mini" floated="left" src={Logo} />
		</Menu.Item>
		{ level === '02' && <User/> }
		{ level === '01' && <Kurir /> } 
		{ level === '03' && <Admin /> }

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