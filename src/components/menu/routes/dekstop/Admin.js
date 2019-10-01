import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";

const Admin = () => (
	<React.Fragment>
		<Menu.Item as={NavLink} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
		<Dropdown item simple text='Kurir'>
			<Dropdown.Menu>
		        <Dropdown.Item as={NavLink} to="/kurir">Data Kurir</Dropdown.Item>
		        <Dropdown.Item as={NavLink} to="/kurir/kelola">Kelola Kurir</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	</React.Fragment>
);

export default Admin;