import React from "react";
import PropTypes from "prop-types";
import { Message, Form, Button, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Validator from "validator";

class LoginForm extends React.Component {
	state = {
		data: {
			username: '',
			password: ''
		},
		loading: false,
		errors: {}
	}

	escapeRegExp = (string, name) => {
		if (name === 'password') {
			return string;
		}else{
			return string.replace(/[~`/*'"+?^${}<>()|[\]\\]/g, '');
		}
	}

	onChange = e => {
		const str 	= e.target.value;
		const name 	= e.target.name;
		const value = this.escapeRegExp(str, name); 
		this.setState({ 
			data: { ...this.state.data, [e.target.name]: value }
		})
	} 

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
				.catch(err => {
					if (err.response.data.errors) {
						this.setState({ loading: false, errors: err.response.data.errors });
					}else{
						this.setState({ loading: false, errors: { global: 'Terdapat kesalahan, mohon cobalagi nanti'} });
					}
				});
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.username) errors.username = "Username masih kosong";
		if (!data.password) errors.password = "Password tidak boleh kosong";
		if (data.username !== '') {
			if (!Validator.isEmail(data.username)) errors.username = "Email tidak valid";
		}

		return errors;
	}

	render(){
		const { data, errors, loading } = this.state;
		return( 
			<React.Fragment>
				{ errors.global && <Message negative>
						<Message.Header>Oppps!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
			    <Form onSubmit={this.onSubmit} loading={loading} size='large'>
			    	<Segment stacked>
				    	<Form.Field error={!!errors.username}>
					        <Form.Input
					          fluid
					          type="text"
					          name="username"
					          id="username"
					          label='Email'
					          value={data.username}
					          onChange={this.onChange}
					          placeholder='Masukan email'
					          error={errors.username}
					        />
				        </Form.Field>
				        <Form.Field error={!!errors.password}>
					        <Form.Input
					          fluid
					          type="password"
					          name="password"
					          id="password"
					          label='Password'
					          value={data.password}
					          onChange={this.onChange}
					          placeholder='Enter password'
					          error={errors.password}
					        />
				        </Form.Field>
				      <Button fluid color='blue' type='submit'>Login</Button>
				      <div style={{paddingTop: '8px'}}>
				      	<Link to="/forgot_password">Lupa katasandi</Link>
				      </div>
			      	</Segment>
		     	</Form>
		     	<Message>
			        Belum memiliki akun? Registrasi&nbsp;<Link to="/signup">disini</Link>
			    </Message>
			</React.Fragment>
		);
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
}

export default LoginForm;