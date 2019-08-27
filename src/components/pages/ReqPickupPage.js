import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import ListReqPickup from "../list/ListReqPickup";
import { connect } from "react-redux";
import { fetchPickup, pickup } from "../../actions/handover";
import { Segment, Header, Icon, Divider, Dimmer, Loader, Message } from "semantic-ui-react";


class ReqPickupPage extends React.Component{
	state = {
		loading: false,
		errors: {},
		open: false,
		data: {},
		errorsPin: {}
	}

	componentDidMount() {
	    this.props.fetchPickup();
	}

	submit = (data) => {
		this.setState({ loading: true });
		const datatosend = { data: data }
		this.props.pickup(datatosend)
		.then(() => this.setState({ loading: false }))
		.catch(err => this.setState({ loading: false, errors: err.response.data.errors }));
	}

	close = () => this.setState({ open: false })

	// sumbitdata = () => {
	// 	this.setState({ loading: true});
	// 	this.props.pickup(datatosend)
	// 	.then(() => this.setState({ loading: false }))
	// 	.catch(err => this.setState({ loading: false, errors: err.response.data.errors }));
	// }

	render(){
		const { errors } = this.state;
		
		return(
			<Navbar>
				<Segment padded>
				    { errors.global && <Message negative>
						<Message.Header>Maaf!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
					<Header as='h2'>
					    <Icon name='envelope' />
					    <Header.Content>Request Pickup</Header.Content>
					</Header>
					<Divider/>
					<Dimmer active={this.state.loading} inverted>
				        <Loader inverted size='medium'>Loading</Loader>
				    </Dimmer>
					<ListReqPickup updateOrder={this.submit} />
				</Segment>
			</Navbar>
		);
	}
}

ReqPickupPage.propTypes = {
	fetchPickup: PropTypes.func.isRequired,
	pickup: PropTypes.func.isRequired
}

export default connect(null, { fetchPickup, pickup })(ReqPickupPage);