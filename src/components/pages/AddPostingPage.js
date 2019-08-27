import React from "react";
import { Segment, Header } from "semantic-ui-react";
import Navbar from "../menu/Navbar";

class AddPostingPage extends React.Component {
	render(){
		return(
			<Navbar>
			 <Segment.Group raised>
			    <Segment>
			    	<Header as='h3'>Halaman Add Posting</Header>
			    </Segment>
			    <Segment>Middle</Segment>
			    <Segment>Right</Segment>
			  </Segment.Group>
			</Navbar>
		);
	}
}

export default AddPostingPage;