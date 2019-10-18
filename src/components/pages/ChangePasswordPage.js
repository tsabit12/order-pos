import React from "react";
import Navbar from "../menu/Navbar";
import { Grid, Form, Button, Message } from "semantic-ui-react";
import api from "../../api";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ChangePasswordPage extends React.Component {
	state = {
		data: {
			confpass: '',
			password: '',
			userid: this.props.userid
		},
		errors: {},
		loading: false,
		success: false
	}

	onChange = (e) => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value }})

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			api.user.ganti_password(this.state.data)
				.then(() => this.setState({ 
					loading: false, 
					success: true, 
					data: { password: '', confpass: ''}, 
					errors: {} 
				})).catch(() => this.setState({ 
					loading: false, 
					errors: {global: 'Terdapat kesalahan tidak dapat mengupdate password, silahkan cobalagi nanti'}, 
					success: false 
				}))
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.password) errors.password = "Password baru harap diisi";
		if (data.password !== data.confpass) errors.confpass = "Password tidak valid";
		return errors;
	}
	render(){
		const { data, errors, loading, success } = this.state;

		return(
			<Navbar>
				<Grid verticalAlign='middle' centered columns={1} style={{paddingTop: '40px'}}>
				    <Grid.Column mobile={16} tablet={12} computer={8}>
				    	{ errors.global && <Message negative>
							<Message.Header>Maaf!</Message.Header>
							<p>{errors.global}</p>
						</Message> }
						{ success && <Message positive>
							<Message.Header>Sukes!</Message.Header>
							<p>Password anda berhasil diganti</p>
						</Message> }
				    	<Message
				    	  style={{textAlign: 'center'}}
					      attached
					      header='Ganti Password'
					    />
				        <Form className='attached fluid segment' onSubmit={this.onSubmit} loading={loading}>
					    	<Form.Field>
						        <Form.Input
						          fluid
						          type="password"
						          name="password"
						          id="password"
						          label='Password Baru'
						          value={data.password}
						          onChange={this.onChange}
						          placeholder='Masukan password baru'
						          error={errors.password}
						        />
					        </Form.Field>
					        <Form.Field>
						        <Form.Input
						          fluid
						          type="password"
						          name="confpass"
						          id="confpass"
						          label='Konfirmasi Password'
						          onChange={this.onChange}
						          placeholder='Konfirmasi password anda'
						          error={errors.confpass}
						        />
					        </Form.Field>
					      <Button color='blue' type='submit'>Ganti password</Button>
				     	</Form>
				    </Grid.Column>
				</Grid>
			</Navbar>
		);
	}
}

ChangePasswordPage.propTypes = {
	userid: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		userid: state.user.userid
	}
}

export default connect(mapStateToProps,null)(ChangePasswordPage);