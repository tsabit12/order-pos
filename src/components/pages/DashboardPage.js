import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Icon, Divider, Message } from "semantic-ui-react";
import Navbar from "../menu/Navbar";

class DashboardPage extends React.Component{
	state = {
		square : {
			width: 140,
			height: 140
		}
	}

	render(){
		return(
			<Navbar>
				<Segment.Group raised>
					<Segment>
						<Header as='h2'>
						    <Icon name='home' />
						    <Header.Content>Dashboard</Header.Content>
						</Header>
						<Divider clearing />
						 <Message
						    icon='user'
						    header={'Selamat datang '+this.props.username}
						    content='Get the best news in your e-mail every day.'
						/>
					</Segment>
				</Segment.Group>
			</Navbar>
		);
	}
}

DashboardPage.propTypes = {
	username: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		username: state.user.nama
	}
}

export default connect(mapStateToProps, null)(DashboardPage);