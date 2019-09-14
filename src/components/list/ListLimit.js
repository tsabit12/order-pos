import React from "react";
import { Message, Grid } from "semantic-ui-react";

const ListLimit = ({ listdata }) => 
	<Grid.Column mobile={16} tablet={16} computer={4}>
	    <Message info>
			<Message.Header>Saldo Purchase Order</Message.Header>
			<Message.List>
				{ listdata.map(data => <Message.Item>{data.id_po}  ({Math.round(data.persen)} %)</Message.Item>)}
			</Message.List>
		</Message>
	</Grid.Column>;

export default ListLimit;