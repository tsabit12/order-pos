import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Ae = () => (
	<React.Fragment>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/dashboard">Dashboard</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/po">Entri PO</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/invoice">Cetak Invoice</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/laporan_invoice">Laporan Invoice</Menu.Item>
	</React.Fragment>
);

export default Ae;