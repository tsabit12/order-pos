import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Kurir = () => (
	<React.Fragment>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/dashboard">Dashboard</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/assigment">Assigment Pickup</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/invoice">Invoice</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/invoice/laporan">Laporan Invoice</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/handover">Handover Pickup</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/pickup/petugas">Petugas Pickup</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/petugas">User</Menu.Item>
	</React.Fragment>
);

export default Kurir;