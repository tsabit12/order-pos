import React from "react";
import PropTypes from "prop-types";
import { Message, Form, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
	state = {
		data: {
			username: '',
			password: ''
		},
		loading: false,
		errors: {}
	}

	onChange = e => this.setState({ 
		data: { ...this.state.data, [e.target.name]: e.target.value }
	})

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
				.catch(err => this.setState({ loading: false, errors: err.response.data.errors }));
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.username) errors.username = "Username masih kosong";
		if (!data.password) errors.password = "Password tidak boleh kosong";

		return errors;
	}

	render(){
		const { data, errors, loading } = this.state;
		return( 
			<React.Fragment>
				{ errors.global && <Message negative>
						<Message.Header>Maaf!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
				<Message
			      attached
			      positive
			      header='Halaman Login'
			      content='Silahkan login terlebih dahulu'
			    />
			    <Form className='attached fluid segment' onSubmit={this.onSubmit} loading={loading}>
			    	<Form.Field error={!!errors.username}>
				        <Form.Input
				          fluid
				          type="text"
				          name="username"
				          id="username"
				          label='Username'
				          value={data.username}
				          onChange={this.onChange}
				          placeholder='Enter username'
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
			      <Button color='blue' type='submit'>Login</Button>
		      	  <Button as={Link} to="/signup" color='red' icon labelPosition='right'>
  				  	Daftar
			      	<Icon name='right arrow' />
			   	  </Button>
			    </Form>
			</React.Fragment>
		);
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
}

export default LoginForm;