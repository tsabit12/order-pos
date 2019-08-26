import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../forms/LoginForm";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

class LoginPage extends React.Component{

	submit = (data) => this.props.login(data).then(() => this.props.history.push("/dashboard"))
	
	render(){
		return(
			<Grid verticalAlign='middle' stackable columns={1} centered style={{ height: '90vh' }}>
			    <Grid.Column width={8}>
			        <LoginForm submit = {this.submit} /> 
			    </Grid.Column>
			</Grid>
		);
	}
}

LoginPage.propTypes = {
	login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage);