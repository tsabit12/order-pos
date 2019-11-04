import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../forms/LoginForm";
import { Grid, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import Logo from "../../logoposindonesia2.png";

class LoginPage extends React.Component{

	submit = (data) => this.props.login(data).then(() => this.props.history.push("/dashboard"))
	
	render(){
		return(
			<div>
				<Grid centered style={{ height: '100vh' }} verticalAlign='middle'>
				    <Grid.Column style={{ maxWidth: 450 }}>
				        <Image src={Logo} size='small' circular style={{paddingBottom: '17px', left: '-12px'}} centered />
				      <LoginForm submit = {this.submit} /> 
				   	</Grid.Column>
				</Grid>
			</div>
		);
	}
}

LoginPage.propTypes = {
	login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage);