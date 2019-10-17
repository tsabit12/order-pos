import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Ae = () => (
	<React.Fragment>
		<Menu.Item as={NavLink} to="/po">Entri PO</Menu.Item>
		<Menu.Item as={NavLink} to="/invoice">Cetak Invoice</Menu.Item>
		<Menu.Item as={NavLink} to="/laporan_invoice">Laporan Invoice</Menu.Item>
	</React.Fragment>
);

export default Ae;