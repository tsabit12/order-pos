import React from "react";
import SignupForm from "../forms/SignupForm";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";

class SignupPage extends React.Component{

	submit = (data) => this.props.signup(data).then(() => this.props.history.push("/dashboard"))

	render(){
		return(
			<Grid centered style={{ height: '100vh' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
			        <SignupForm submit={this.submit} /> 
			    </Grid.Column>
			</Grid>
		);
	}
}

export default connect(null, { signup })(SignupPage);