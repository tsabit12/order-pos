import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Icon, Dimmer, Loader, Divider } from "semantic-ui-react";
import { fetchAssigment, addAssigment } from "../../actions/order";
import ListAssigment from "../list/ListAssigment";

class AssigmentPage extends React.Component{
	state = {
		loading: false,
		success: false
	}

	componentDidMount(){
		this.props.fetchAssigment();
	}

	submit = (data) => this.props.addAssigment(data);

	render(){
		return(
			<Navbar>
				<Segment padded>
					<Header as='h2'>
					    <Icon name='phone volume' />
					    <Header.Content>Assigment Pickup</Header.Content>
					</Header>
					<Divider/>
					<Dimmer active={this.state.loading} inverted>
				        <Loader inverted size='medium'>Loading</Loader>
				    </Dimmer>
				    <ListAssigment 
				    	listdata={this.props.listdata} 
				    	submit={this.submit}
				    />
				</Segment>
			</Navbar>
		);
	}
}

AssigmentPage.propTypes = {
	fetchAssigment: PropTypes.func.isRequired,
	listdata: PropTypes.array.isRequired,
	addAssigment: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		listdata: state.order.assigment
	}
}

export default connect(mapStateToProps, { fetchAssigment, addAssigment })(AssigmentPage);