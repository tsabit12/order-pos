import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class UserRoute extends React.Component{
	componentDidUpdate(prevProps) {
	    if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
	      window.scrollTo(0, 0)
	    }
	}

	render(){
		const { isAuthenticated, component: Component, ...rest } = this.props;
		return(
			<Route {...rest} 
				render={props => isAuthenticated ? 
				<Component {...props} /> : <Redirect to="/" /> } 
			/>
		);
	}
}

UserRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.user.token
	}
}

export default connect(mapStateToProps)(UserRoute);