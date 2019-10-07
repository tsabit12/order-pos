import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Ae = () => (
	<React.Fragment>
		<Menu.Item as={NavLink} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
		<Menu.Item as={NavLink} to="/po" title="dashboard">Entri PO</Menu.Item>
		<Menu.Item as={NavLink} to="/invoice" title="dashboard">Cetak Invoice</Menu.Item>
	</React.Fragment>
);

export default Ae;