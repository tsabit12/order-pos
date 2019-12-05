import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const User = () => (
	<React.Fragment>
        <Menu.Item style={{textAlign:"left"}}>
          <Menu.Header>Order</Menu.Header>
          <Menu.Menu>
            <Menu.Item
            	style={{textAlign:"left"}}
            	name='Tambah'
            	as={NavLink}
            	to="/order"
            />
            <Menu.Item
            	style={{textAlign:"left"}}
            	name='Request Pickup'
            	as={NavLink}
            	to="/pickup"
            />
            <Menu.Item
            	style={{textAlign:"left"}}
              	name='Lacak Kiriman'
              	as={NavLink}
              	to="/lacak"
            />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item style={{textAlign:"left"}}>
          <Menu.Header>Laporan</Menu.Header>
	        <Menu.Menu>
	          	<Menu.Item
	            	style={{textAlign:"left"}}
	              	name='Order'
	              	as={NavLink}
	              	to="/list_order"
	            />
              <Menu.Item
                style={{textAlign:"left"}}
                name='Purchase Order'
                as={NavLink}
                to="/list_po"
              />
              <Menu.Item
                style={{textAlign:"left"}}
                name='Assignment'
                as={NavLink}
                to="/laporan/assignment"
              />
              <Menu.Item
                style={{textAlign:"left"}}
                name='Handover'
                as={NavLink}
                to="/laporan/handover"
              />
              <Menu.Item
                style={{textAlign:"left"}}
                name='Selesai Antar'
                as={NavLink}
                to="/laporan/selesai_antar"
              />
	        </Menu.Menu>
        </Menu.Item>
	</React.Fragment>
);

export default User;