import React from "react";
import PropTypes from "prop-types";
import Navbar from "../menu/Navbar";
import { Segment, Header, Icon, Divider } from "semantic-ui-react";
import ListData from "../po/ListData";
import { connect } from "react-redux";
import { fetchListpo } from "../../actions/purchase";

class PageListPo extends React.Component {
	state = {
		info: []
	}

	componentDidMount(){
		const { userid } = this.props.user;
		this.props.fetchListpo(userid);
	}

	render(){
		return(
			<Navbar>
				<Segment.Group raised>
				    <Segment>
				    	<Header as='h2'>
						    <Icon name='book' />
						    <Header.Content>List purchase order</Header.Content>
						</Header>
						<Divider clearing />
						<ListData />
			    	</Segment>
		    	</Segment.Group>
			</Navbar>
		);
	}
}

PageListPo.propTypes = {
	user: PropTypes.object.isRequired,
	fetchListpo: PropTypes.func.isRequired
}

function mapStateProps(state) {
	return{
		user: state.user
	}
}

export default connect(mapStateProps, { fetchListpo })(PageListPo);