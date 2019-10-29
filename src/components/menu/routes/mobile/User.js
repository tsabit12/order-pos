import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const User = () => (
	<React.Fragment>
        <Menu.Item style={{textAlign: 'left'}}>
          <Menu.Header>Purchase Order</Menu.Header>
          <Menu.Menu>
            <Menu.Item
            	style={{textAlign:"left"}}
              	name='Topup'
              	as={NavLink}
              	to="/topup"
            />
          </Menu.Menu>
        </Menu.Item>

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
            <Menu.Item
            	style={{textAlign:"left"}}
              	name='Real Transaction'
              	as={NavLink}
              	to="/transaction"
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
	        </Menu.Menu>
        </Menu.Item>
	</React.Fragment>
);

export default User;