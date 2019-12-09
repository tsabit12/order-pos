import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Admin = () => (
	<React.Fragment>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/kurir">Data Kurir</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/mapping">Mapping Kantor</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/kurir/kelola">Kelola Kurir</Menu.Item>
	</React.Fragment>
);

export default Admin;