import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";

const Admin = () => (
	<React.Fragment>
		<Menu.Item as={NavLink} to="/mapping">Mapping Kantor</Menu.Item>
		<Dropdown item simple text='User'>
			<Dropdown.Menu>
		        <Dropdown.Item as={NavLink} to="/user">Data User</Dropdown.Item>
		        <Dropdown.Item as={NavLink} to="/user/add">Kelola User</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	</React.Fragment>
);

export default Admin;