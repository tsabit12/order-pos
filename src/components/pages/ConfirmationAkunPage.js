import React from "react";
import PropTypes from "prop-types";
import decode from "jwt-decode";
import { Container, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { confirmation } from "../../actions/auth";

class ConfirmationAkunPage extends React.Component{
	state = {
		loading: true,
		success: false
	}

	componentDidMount(){
		const { token } = this.props.match.params;
		const payload = decode(token);
		this.props.confirmation(payload)
			.then(() => this.setState({ loading: false, success: true }))
			.catch(() => this.setState({ loading: false, success: false }));
	}

	render(){
		const { loading, success } = this.state;
		return(
			<Container>
				<div style={{paddingTop: '4%'}}>
					{ loading && !success &&  <Message icon>
					    <Icon name='circle notched' loading />
					    <Message.Content>
					      <Message.Header>Mohon tunggu sebentar</Message.Header>
					      Kami sedang memvalidasi akun anda
					    </Message.Content>
					  </Message> }

					{ !loading && !success && <Message icon negative>
					    <Icon name='times' />
					    <Message.Content>
					      <Message.Header>Terdapat kesalahan</Message.Header>
					      	Mohon maaf untuk sementara kami tidak dapat memvalidasi akun anda, silahkan cobalagi nanti
					    </Message.Content>
					  </Message> }

					{ !loading && success && <Message icon positive>
					    <Icon name='check' />
					    <Message.Content>
					      <Message.Header>Sukses</Message.Header>
					      	Akun anda berhasil dikonfirmasi, klik <Link to="/dashboard">disini</Link> untuk menuju ke halaman dashboard
					    </Message.Content>
					  </Message> }
				</div>
			</Container>
		);
	}
}


ConfirmationAkunPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	confirmation: PropTypes.func.isRequired
}

export default connect(null, { confirmation })(ConfirmationAkunPage);