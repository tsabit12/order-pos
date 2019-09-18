import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Icon, Divider, Message, Grid } from "semantic-ui-react";
import Navbar from "../menu/Navbar";
import ListLimit from "../list/ListLimit";
import { getPurchase } from "../../actions/purchase";

class DashboardPage extends React.Component{
	state = { 
		loading: false
	}
	componentDidMount(){
		this.setState({ loading: true });
		const data = {
			level: this.props.level,
			userid: this.props.userid
		};

		this.props.getPurchase(data).then(() => this.setState({ loading: false }));
	}

	render(){
		const { listLimit, level } = this.props;
		const { loading } = this.state;
		return(
			<Navbar>
				<Grid>
					<Grid.Column mobile={16} tablet={16} computer={listLimit.length > 0 && level === '02' ? 12 : 16}>
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
						{ listLimit.length > 0 && level === '02' ? <Grid.Column mobile={16} tablet={16} computer={4}>
							<ListLimit 
								listdata={listLimit} 
								loading={loading}
							/>
						</Grid.Column> : <React.Fragment /> }
				</Grid>
			</Navbar>
		);
	}
}

DashboardPage.propTypes = {
	username: PropTypes.string.isRequired,
	getPurchase: PropTypes.func.isRequired,
	listLimit: PropTypes.array.isRequired,
	level: PropTypes.string.isRequired,
	userid: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		username: state.user.nama,
		listLimit: state.purchase.filter(list => Math.round(list.persentase) <= 20),
		level: state.user.level,
		userid: state.user.userid
	}
}

export default connect(mapStateToProps, { getPurchase })(DashboardPage);