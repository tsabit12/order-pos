import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const User = () => (
	<React.Fragment>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/dashboard" title="dashboard">Dashboard</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/order">Order</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/po">Entri PO</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/list_po">List PO</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/topup">Topup</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/pickup">Request Pickup</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/lacak">Lacak Kiriman</Menu.Item>
		<Menu.Item style={{textAlign: 'left'}} as={NavLink} to="/transaction">Real Transaction</Menu.Item>
	</React.Fragment>
);

export default User;