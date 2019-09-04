import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { Segment, Header, Icon, Divider, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchPetugas } from "../../actions/petugas";
import ListPetugas from "../list/ListPetugas";

class PetugasPage extends React.Component {
	state = {
		loading: false
	}

	componentDidMount(){
		this.setState({ loading: true });
		this.props.fetchPetugas().then(() => this.setState({loading: false }));
	}

	render(){
		const { loading } = this.state;
		return(
			<Navbar>
				<Segment.Group raised>
				    <Segment>
					    <Header as='h2'>
						    <Icon name='users' />
						    <Header.Content>User</Header.Content>
						</Header>
					    <Divider clearing />
					    { loading &&  <Message icon>
								    <Icon name='circle notched' loading />
								    <Message.Content>
								      <Message.Header>Just one second</Message.Header>
								      We are fetching that content for you.
								    </Message.Content>
								  </Message> }
						{ !loading && <ListPetugas listdata={this.props.petugas} />}
					</Segment>
				</Segment.Group>
			</Navbar>
		);
	}
}

PetugasPage.propTypes = {
	fetchPetugas: PropTypes.func.isRequired,
	petugas: PropTypes.array.isRequired
}

function mapStateProps(state){
	return {
		petugas: state.petugas
	}
}

export default connect(mapStateProps, { fetchPetugas })(PetugasPage);