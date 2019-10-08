import React from "react";
import PropTypes from "prop-types";
import Navbar from "../menu/Navbar";
import ListData from "../po/ListData";
import { connect } from "react-redux";
import { fetchListpo } from "../../actions/purchase";
import { setProgressBar } from "../../actions/progress";

class PageListPo extends React.Component {
	state = {
		loading: false
	}

	componentDidMount(){
		this.props.setProgressBar(true);
		const { userid } = this.props.user;
		this.props.fetchListpo(userid).then(() => this.props.setProgressBar(false));
	}

	getDetailOrder = (idpo) => {
		this.setState({ loading: true });
	}

	render(){
		return(
			<Navbar>
				<ListData detailOrder={this.getDetailOrder} />
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

export default connect(mapStateProps, { fetchListpo, setProgressBar })(PageListPo);