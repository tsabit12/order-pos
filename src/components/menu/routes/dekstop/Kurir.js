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
		<Dropdown item simple text='Menu Lain'>
			<Dropdown.Menu>
				<Dropdown.Item as={NavLink} to="/pickup/petugas">Petugas Pickup</Dropdown.Item>
				<Dropdown.Item as={NavLink} to="/petugas">User</Dropdown.Item>
				<Dropdown.Item as={NavLink} to="/handover">Handover</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	</React.Fragment>
);

export default Kurir;