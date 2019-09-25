import React from "react";
import PropTypes from "prop-types";
import Navbar from "../menu/Navbar";
import { Segment, Header, Icon, Divider } from "semantic-ui-react";
import { getInvoice } from "../../actions/purchase";
import { setProgressBar } from "../../actions/progress";
import { connect } from "react-redux";
import ListInvoice from "../list/ListInvoice";

class ListInvoicePage extends React.Component {
	state = {
		errors: {}
	}
	componentDidMount(){
		this.props.setProgressBar(true);
		this.props.getInvoice()
			.then(() => {
				this.props.setProgressBar(false);
				this.setState({ errors: {} });
			}).catch(err => {
				this.props.setProgressBar(false);
				this.setState({ errors: err.response.data.errors });
			});
	}

	render(){
		return(
			<Navbar>
				<Segment.Group raised>
				    <Segment>
					    <Header as='h3'>
						    <Icon name='file' />
						    <Header.Content>Laporan Invoice</Header.Content>
						</Header>
						<Divider clearing />
						<ListInvoice />
					</Segment>
				</Segment.Group>
			</Navbar>
		);
	}
}

ListInvoicePage.propTypes = {
	getInvoice: PropTypes.func.isRequired,
	setProgressBar: PropTypes.func.isRequired
}

export default connect(null, { getInvoice, setProgressBar })(ListInvoicePage);