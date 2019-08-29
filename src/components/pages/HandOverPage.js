import React from "react";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment, Header, Divider, Icon } from "semantic-ui-react";
import FormHandOver from "../forms/FormHandOver";
import ListHandOver from "../list/ListHandOver";
import { getHandover } from "../../actions/handover";

class HandOverPage extends React.Component {

	submit = (data) => this.props.getHandover(data)

	render(){
		const { handoverisget } = this.props;
		return(
			<Navbar>
				<Segment.Group raised>
					<Segment>
						<Header as='h2'>
						    <Icon name='american sign language interpreting' />
						    <Header.Content>Handover Pickup</Header.Content>
						</Header>
						<Divider clearing />
						<FormHandOver submit={this.submit} />
					</Segment>
					{ handoverisget.length === 0 ? <React.Fragment /> : 
						<ListHandOver 
							listdata={this.props.handoverisget} 
						/> }
				</Segment.Group>
			</Navbar>
		);
	}
}

HandOverPage.propTypes = {
	getHandover: PropTypes.func.isRequired,
	handoverisget: PropTypes.array.isRequired
}

function mapStateToProps(state){
	return {
		handoverisget: state.gethandover
	}
}


export default connect(mapStateToProps, { getHandover })(HandOverPage);