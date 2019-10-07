import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";

const Admin = () => (
	<React.Fragment>
		<Menu.Item as={NavLink} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
		<Dropdown item simple text='User'>
			<Dropdown.Menu>
		        <Dropdown.Item as={NavLink} to="/user">Data User</Dropdown.Item>
		        <Dropdown.Item as={NavLink} to="/user/add">Kelola User</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	</React.Fragment>
);

export default Admin;