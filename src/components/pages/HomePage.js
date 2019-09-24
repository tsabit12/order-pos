import React from "react";
import Navbar from "../menu/Navbar";
import { Image, Header, Divider } from "semantic-ui-react";

const HomePage = () => (
	<Navbar>
		<div style={{paddingTop: '20px'}}>
			<Header as='h3'>
			    <Header.Content>Selamat Datang</Header.Content>
			</Header>
			<Divider />
			<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' alt='paragraph' />
			<br />
			<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' alt='paragraph' />
		</div>
	</Navbar>
);

export default HomePage;