import React from "react";
import { Form, Grid, Segment, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import decode from "jwt-decode";
import passwordValidator from "password-validator";

class ChangePasswordForgotForms extends React.Component{
	state = {
		data: {
			password: '',
			passwordConf: '',
			userid: ''
		},
		errors: {}
	}

	componentDidMount(){
		const payload 	= decode(this.props.token);
		this.setState({ data: {...this.state.data, userid: payload.userid }});;
	}

	onChange = (e) => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value }})

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
		}
	}

	validate = (data) => {
		const errors = {};
		const schema = new passwordValidator();
		if (!data.password) errors.password = "Password tidak boleh kosong";
		if (data.password !== '') {
			if (!schema.is().min(6).validate(data.password)){
				errors.password = "Password minimal 6 karakter";	
			}else if(!schema.has().not().spaces().validate(data.password)){
				errors.password = "Password tidak boleh memakai spasi";
			}
		}

		if (!data.passwordConf) errors.passwordConf = "Konfirmasi password anda";
		if (data.passwordConf !== '') {
			if (data.password !== data.passwordConf) errors.passwordConf = "Password tidak valid";
		}

		return errors;
	}

	render(){
		const { data, errors, loading } = this.state;
		return(
			<Grid centered style={{ height: '100vh' }} verticalAlign='middle'>
			    <Grid.Column style={{ maxWidth: 450 }}>
			    	{ errors.global && <Message negative>
						<Message.Header>Oppps!</Message.Header>
							<p>{errors.global}</p>
					</Message> }
			      	<Form size='large' onSubmit={this.onSubmit} loading={loading}>
			      		<Segment stacked>
					        <Form.Field>
						        <Form.Input
						          fluid
						          type="password"
						          name="password"
						          id="password"
						          value={data.password}
						          onChange={this.onChange}
						          label='Password'
						          placeholder='Masukan password baru'
						          error={errors.password}
						        />
					        </Form.Field>
					        <Form.Field>
						        <Form.Input
						          fluid
						          type="password"
						          name="passwordConf"
						          id="passwordConf"
						          label='Konfirmasi Password'
						          value={data.passwordConf}
						          onChange={this.onChange}
						          placeholder='Konfirmasi password anda'
						          error={errors.passwordConf}
						        />
					        </Form.Field>
					      <Button fluid color='blue' type='submit'>Ganti Password</Button>
					    </Segment>
			      	</Form>
			   	</Grid.Column>
			</Grid>
		);
	}
}

ChangePasswordForgotForms.propTypes = {
	token: PropTypes.string.isRequired,
	submit: PropTypes.func.isRequired
}

export default ChangePasswordForgotForms;