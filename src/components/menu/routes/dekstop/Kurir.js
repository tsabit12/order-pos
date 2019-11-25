import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Kurir = () => (
	<React.Fragment>
		<Menu.Item as={NavLink} to="/assigment">Assignment</Menu.Item> 
		<Menu.Item as={NavLink} to="/handover">Handover</Menu.Item> 
		<Menu.Item as={NavLink} to="/pickup/petugas">Petugas</Menu.Item> 
	</React.Fragment>
);

export default Kurir;