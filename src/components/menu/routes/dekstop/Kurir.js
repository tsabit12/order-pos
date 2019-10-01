import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";

const Kurir = () => (
	<React.Fragment>
		<Menu.Item as={NavLink} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
		<Menu.Item as={NavLink} to="/assigment">Assigment</Menu.Item>
		<Dropdown item simple text='Invoice'>
			<Dropdown.Menu>
		        <Dropdown.Item as={NavLink} to="/invoice">Cetak Invoice</Dropdown.Item>
		        <Dropdown.Item as={NavLink} to="/invoice/laporan">Laporan Invoice</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
		<Menu.Item as={NavLink} to="/handover">Handover</Menu.Item>
		<Menu.Item as={NavLink} to="/petugas">User</Menu.Item>
	</React.Fragment>
);

export default Kurir;