import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Divider, Message, Form } from "semantic-ui-react";
import Navbar from "../menu/Navbar";
import OrderForm from "../forms/OrderForm";
import axios from "axios";
import { connect } from "react-redux";

class OrderPage extends React.Component {
	state = {
		value: '',
		username: this.props.username,
		succes: false,
		errors: {},
		loading: false,
		fee: [],
		open: false
	}

	handleClick = () => {
		const value = this.state.value;
		const { username } = this.state;
		this.setState({ loading: true });
		axios.post('/api_sampoerna/order/searchPO', { idpo: value, user: username })
			.then(res => res.data.idpo)
			.then(idpo => {
				this.setState({ succes: true, loading: false, errors: {} })
			})
			.catch(err => this.setState({ succes: false, errors: err.response.data.errors, loading: false }))
	}

	handleInputChange = (e) => this.setState({ value: e.target.value })

	submit = (data) => {
		const value = this.state.value;
		axios.post('/api_sampoerna/order/fee', {value, data})
			.then(res => res.data.fee)
			.then(fee => this.setState({ fee: fee, loading: false, errors: {}, open: true }))
			.catch(err => {
				this.setState({ errors: err.response.data.errors })
			})
	}

	render(){
		const { succes, errors, loading, fee } = this.state;
		return(
			<Navbar>
			 <Segment.Group raised>
			    <Segment>
			    	<Header as='h3' floated="left">Halaman Order</Header>
			    	<Header floated="right" as="h5">
			    		<Form loading={loading}>
				    		<Form.Field>
					    		<Form.Input 
					    			action={{
							        	icon: 'search', 
							        	color: 'red',
							        	onClick: () => this.handleClick(),
							    	}} 
							    	defaultValue={this.state.value}
		  							onChange={this.handleInputChange}
		    						placeholder='Cari id purchase order...'
		    					/>
	    					</Form.Field>
    					</Form>
			    	</Header>
			    	<Divider clearing />
			    	
			    	{ errors.global && <Message negative>
						<Message.Header>Maaf!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
			    	{ succes && <OrderForm submit={this.submit} loading={loading} fee={fee} open={this.state.open} idpo={this.state.value} /> }
			    	{ !succes && <p>Silahkan cari id purchase order pada kolom search di atas</p>}
			    </Segment>
			  </Segment.Group>
			</Navbar>
		);
	}
}

OrderPage.propTypes = {
	username: PropTypes.string.isRequired
}

function mapStateProps(state) {
	return {
		username: state.user.userid
	}
}

export default connect(mapStateProps, null)(OrderPage);