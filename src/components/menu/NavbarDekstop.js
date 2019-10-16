import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Menu, Image, Dropdown, Icon, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import  * as actions from "../../actions/auth";
import Logo from "../../logosampoerna.png";
import User from "./routes/dekstop/User";
import Kurir from "./routes/dekstop/Kurir";
import Admin from "./routes/dekstop/Admin";
import Ae from "./routes/dekstop/Ae";
import { removeNotif } from "../../actions/notifikasi";


const NavbarDekstop = ({ isAuthenticated, logout, user, notif, topup, show, removeNotif }) => {

	const trigger = (
	  <span>
	  	{ notif && show && user.level === '04' && <Label circular color='red' empty /> }
	    <Icon name='user' /> {user.nama}
	  </span>
	);



	return(
		<Menu fixed="top" inverted>
			<Menu.Item>
				<Image size="mini" floated="left" src={Logo} />
			</Menu.Item>
			{ user.level === '02' && <User/> }
			{ user.level === '01' && <Kurir /> } 
			{ user.level === '03' && <Admin /> }
			{ user.level === '04' && <Ae /> }

			<Menu.Menu position="right">
				{ isAuthenticated && <Menu.Item>
					<Dropdown trigger={trigger} onClick={() => removeNotif() }>
						<Dropdown.Menu>
							<Dropdown.Item disabled><strong>{user.username}</strong></Dropdown.Item>
							<Dropdown.Divider />
							{ user.level === '04' && <React.Fragment>
								<Dropdown.Item as={NavLink} to="/notifikasi/topup" >
									Topup &nbsp;
									{ notif && <Label color='red' circular size='mini'>{topup.total}</Label> }
								</Dropdown.Item>
							</React.Fragment> }							
						
							<Dropdown.Item>Ganti Password</Dropdown.Item>
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
	user: PropTypes.object.isRequired,
	notif: PropTypes.bool.isRequired,
	show: PropTypes.bool.isRequired,
	topup: PropTypes.object.isRequired,
	removeNotif: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.user,
		isAuthenticated: !!state.user.token,
		notif: !!state.notifikasi.topup.total,
		show: state.notifikasi.show,
		topup: state.notifikasi.topup
	}
}


export default connect(mapStateToProps, { logout: actions.logout, removeNotif })(NavbarDekstop);