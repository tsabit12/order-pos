import React from "react";
import Navbar from "../menu/Navbar";
import { Input, Grid, Divider, Form, Message } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../InlineError";
import axios from "axios";
import FormEntriPo from "../forms/FormEntriPo"

class EntriPoPage extends React.Component {
	state = {
		data: {
			email: '',
			userid: ''
		},
		loading: false,
		success: false,
		message: false,
		errors: {}
	}

	handleInputChange = (e) => this.setState({ data: {...this.state.data, email: e.target.value }})
	
	handleClick = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			axios.post(`${process.env.REACT_APP_API}/entriPo/getEmail`, {
				email: this.state.data.email
			}).then(res => {
				const { userid } = res.data;
				this.setState({ loading: false, success: true, data: {...this.state.data, userid: userid} });
			})
			.catch(err => this.setState({ errors: err.response.data.errors, loading: false, success: false }))
		}
	}

	validate = (data) => {
		const errors = {};
		if (!Validator.isEmail(data.email)) errors.email = "Email tidak valid";
		return errors;
	}

	selesai = () => this.setState({ success: false, message: true });

	render(){
		const { data, loading, errors, success, message } = this.state;

		return(
			<Navbar>
				<Grid>
				   <Grid.Column mobile={16} tablet={8} computer={8} floated='right'>
				   <Form onSubmit={this.handleClick}>
				       	<Input 
			    			action={{
			    				loading: loading,
					        	icon: 'search', 
					        	color: 'red',
					        	onClick: () => this.handleClick(),
					    	}} 
					    	fluid
					    	error={!!errors.email}
					    	value={data.email}
							onChange={this.handleInputChange}
							placeholder='Masukan email mitra...'
						/>
						{ errors.email && <InlineError text={errors.email} /> }
					</Form>
			      </Grid.Column>
				</Grid>
				<Divider />
				{ success && <FormEntriPo email={data.userid} entriSuccess={this.selesai} />}
				{ message && <Message
				    icon='check'
				    header='Sukses'
				    content='Purchase order berhasil di buat'
				  /> }
			</Navbar>
		);
	}
}

export default EntriPoPage;