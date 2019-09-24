import React from "react";
import Navbar from "../menu/Navbar";
import { Segment, Header, Icon, Divider } from "semantic-ui-react";

class ListInvoicePage extends React.Component {
	render(){
		return(
			<Navbar>
				<Segment.Group raised>
				    <Segment>
					    <Header as='h2'>
						    <Icon name='file' />
						    <Header.Content>Laporan Invoice</Header.Content>
						</Header>
						<Divider clearing />
					</Segment>
				</Segment.Group>
			</Navbar>
		);
	}
}

export default ListInvoicePage;