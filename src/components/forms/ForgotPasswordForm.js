import React from "react";
import PropTypes from "prop-types";
import api from "../../api";
import { Message, Icon, Container } from "semantic-ui-react";
import ChangePasswordForgotForms from "./ChangePasswordForgotForms";

const LoadingMessage = () => (
	<Message icon>
	    <Icon name='circle notched' loading />
	    <Message.Content>
	      <Message.Header>Validating token</Message.Header>
	      Mohon tunggu sebentar, ini tidak akan berlangsung lama.
	    </Message.Content>
	</Message>
);


const InvalidMessage = () => (
	<Message icon negative>
	    <Icon name='times' />
	    <Message.Content>
	      <Message.Header>Oppss</Message.Header>
	      Token tidak valid
	    </Message.Content>
	</Message>
);

class ForgotPasswordForm extends React.Component{
	state = {
		loading: true,
		success: false,
		errors: {}
	}

	componentDidMount(){
		const { token } = this.props.match.params;
		api.user.changePassword(token)
			.then(() => this.setState({ loading: false, success: true }))
			.catch(err => this.setState({ loading: false, success: false, errors: err.response.data.errors }))

	}

	onSubmit = (data) => api.user.gantiPassword(data).then(() => this.props.history.push("/login"))


	render(){
		const { loading, success } = this.state;
		return(
			<div style={{ paddingTop: '20px'}}>
				<Container>
					{ loading && <LoadingMessage /> }
					{ !loading && success && <ChangePasswordForgotForms token={this.props.match.params.token} submit={this.onSubmit} /> }
					{ !loading && !success && <InvalidMessage /> }
				</Container>
			</div>
		);
	}
}

ForgotPasswordForm.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
}


export default ForgotPasswordForm;