import React from "react";
import { Grid, Form, Segment, Message, Button, Icon } from "semantic-ui-react";
import Validator from "validator";
import api from "../../api";
import { Link } from "react-router-dom";

const MessageSucces = () => (
	 <Message icon>
	    <Icon name='check' />
	    <Message.Content>
	      <Message.Header>Email berhasil dikirim</Message.Header>
	      Silahkan cek email anda untuk melakukan reset password. Pesan hanya berlaku selama <strong>24 jam</strong> dari sekarang. <br/>
	      Klik <Link to="/login">disini</Link> untuk kembali login
	    </Message.Content>
	</Message>
);

class ForgotPasswordPage extends React.Component {
	state = {
		email: '',
		loading: false,
		errors: {},
		success: false
	}

	onChange = (e) => this.setState({ email: e.target.value })

	onSubmit = () => {
		const errors = this.validate(this.state.email);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			api.user.forgotPassword(this.state.email)
				.then(() => this.setState({ loading: false, success: true, errors: {} }))
				.catch(err => this.setState({ loading: false, success: false, errors: err.response.data.errors }))
		}
	}

	validate = (email) => {
		const errors = {};
		if (!email) errors.email = "Alamat email harap diisi";
		if (email !== '') {
			if (!Validator.isEmail(email)) errors.email = "Alamat email tidak valid";
		}
		return errors;
	}

	render(){
		const { email, errors, loading, success } = this.state;
		return(
			<Grid centered style={{ height: '50vh' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 700 }}>
					{ success ? <MessageSucces /> : <React.Fragment>
						<Message
						    header='Lupa Katasandi?'
						    content='Silahkan masukan email anda di bawah ini. Link untuk mengganti katasandi anda, akan kami kirimkan melalui email.'
						/>
						<Form size='large' onSubmit={this.onSubmit} loading={loading}>
							<Segment stacked>
								{ errors.global && <Message negative>
									<Message.Header>Oppps!</Message.Header>
									<p>{errors.global}</p>
								</Message> }
								<Form.Field>
									<Form.Input 
										name='email'
										id='email'
										label='Email'
										placeholder='Masukan alamat email anda'
										value={email}
										onChange={this.onChange}
										error={errors.email}
									/>
								</Form.Field>
								<Button fluid primary>Vertifikasi</Button>
							</Segment>
						</Form>
					</React.Fragment> }
				</Grid.Column>
			</Grid>
		);
	}
}

export default ForgotPasswordPage;