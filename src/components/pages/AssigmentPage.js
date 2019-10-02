import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Icon, Dimmer, Loader, Divider } from "semantic-ui-react";
import { fetchAssigment, addAssigment } from "../../actions/order";
import { setProgressBar } from "../../actions/progress";
import ListAssigment from "../list/ListAssigment";

class AssigmentPage extends React.Component{
	state = {
		loading: false,
		success: false
	}

	componentDidMount(){
		this.props.setProgressBar(true);
		this.props.fetchAssigment(this.props.nopend).then(() => this.props.setProgressBar(false));
	}

	submit = (data) => this.props.addAssigment(data, this.props.nama);

	render(){
		return(
			<Navbar>
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
			    	nopend={this.props.nopend}
			    />
			</Navbar>
		);
	}
}

AssigmentPage.propTypes = {
	fetchAssigment: PropTypes.func.isRequired,
	listdata: PropTypes.array.isRequired,
	addAssigment: PropTypes.func.isRequired,
	nama: PropTypes.string.isRequired,
	nopend: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		listdata: state.order.assigment,
		nama: state.user.nama,
		nopend: state.user.nopend
	}
}

export default connect(mapStateToProps, { fetchAssigment, addAssigment, setProgressBar })(AssigmentPage);