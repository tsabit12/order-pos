import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Icon, Divider, Message, Grid } from "semantic-ui-react";
import Navbar from "../menu/Navbar";
import ListLimit from "../list/ListLimit";
import { getLimtPo } from "../../actions/dashboard";

class DashboardPage extends React.Component{

	componentDidMount(){
		this.props.getLimtPo();
	}

	render(){
		const { listLimit } = this.props;
		return(
			<Navbar>
				<Grid>
					<Grid.Column mobile={16} tablet={16} computer={12}>
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
					</Grid.Column>
					<ListLimit listdata={listLimit} />
				</Grid>
			</Navbar>
		);
	}
}

DashboardPage.propTypes = {
	username: PropTypes.string.isRequired,
	getLimtPo: PropTypes.func.isRequired,
	listLimit: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		username: state.user.nama,
		listLimit: state.dashboard.limit
	}
}

export default connect(mapStateToProps, { getLimtPo })(DashboardPage);