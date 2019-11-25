import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";

const User = () => (
	<React.Fragment>
		<Menu.Item as={NavLink} to="/order" title="Add Posting">Order</Menu.Item>
		<Dropdown item simple text='Laporan'>
			<Dropdown.Menu>
	          <Dropdown.Item as={NavLink} to="/list_order">List Order</Dropdown.Item>
	          <Dropdown.Item as={NavLink} to="/list_po">List Purchase Order</Dropdown.Item>
	          <Dropdown.Item as={NavLink} to="/laporan/assignment">List Assignment</Dropdown.Item>
	          <Dropdown.Item as={NavLink} to="/laporan/handover">List Handover</Dropdown.Item>
	          <Dropdown.Item as={NavLink} to="/laporan/selesai_antar">Selesai Antar</Dropdown.Item>
	        </Dropdown.Menu>
		</Dropdown>
		<Dropdown item simple text='Menu Lain'>
	        <Dropdown.Menu>
	          <Dropdown.Item as={NavLink} to="/topup">Topup</Dropdown.Item>
	          <Dropdown.Item as={NavLink} to="/pickup">Request Pickup</Dropdown.Item>
	          <Dropdown.Item as={NavLink} to="/lacak">Lacak Kiriman</Dropdown.Item>
	        </Dropdown.Menu>
	    </Dropdown>
	</React.Fragment>
);

export default User;