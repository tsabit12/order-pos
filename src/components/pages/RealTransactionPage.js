import React from "react";
import Navbar from "../menu/Navbar";
import { Segment, Header, Divider, Icon, Form, Button } from "semantic-ui-react";
import axios from "axios";

class RealTransactionPage extends React.Component {
	state = {
		loading: false,
		extid: '',
		errors: {},
		data: []
	}

	onChange = e => this.setState({ extid: e.target.value })

	onSubmit = () => {
		const errors = this.validate(this.state.extid);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			const { extid } = this.state;
			this.setState({ loading: true });
			axios.post('/lacak/realtransaction', { extid })
				.then(res => res.data.result)
				.then(result => {
					this.setState({ loading: false });
					console.log(result);
				})
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
		}
	}

	validate = (extid) => {
		const errors = {};

		if (!extid) errors.extid = "External id masih kosong";

		return errors
	}

	render(){
		const { loading, extid, errors } = this.state;
		return(
			<Navbar>
				<Segment.Group raised>
				    <Segment>
					    <Header as='h2'>
						    <Icon name='money bill alternate' />
						    <Header.Content>Get Real Transaction</Header.Content>
						</Header>
					    <Divider clearing />
					     <Form loading={loading} onSubmit={this.onSubmit}>
						    <Form.Input 
						    	type="text"
						    	name="extid"
						    	id="extid"
						    	label='Ecxternal id' 
						    	placeholder='Masukan external id' 
						    	value={extid}
						    	onChange={this.onChange}
						    	error={errors.extid}
						    />
						    <Button secondary>Cari</Button>
						 </Form>
					 </Segment>
				</Segment.Group>
			</Navbar>
		);
	}
}


export default RealTransactionPage;