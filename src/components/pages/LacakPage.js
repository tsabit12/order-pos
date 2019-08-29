import React from "react";
import Navbar from "../menu/Navbar";
import { Segment, Header, Divider, Input, Form, Message, Card } from "semantic-ui-react";
import InlineError from "../InlineError";
import ListTrace from "../list/ListTrace";
import axios from "axios";

class LacakPage extends React.Component {
	state = {
		barcode: '',
		errors: {},
		loading: false,
		trace: []
	}

	handleClick = () => {
		const errors = this.validate(this.state.barcode);
		this.setState({ errors, loading: true });
		const { barcode } = this.state;
		axios.post('/api_sampoerna/lacak', { barcode })
			.then(res => res.data.result)
			.then(data => {
				this.setState({ errors: {}, trace: data, loading: false });
			})
			.catch(err => this.setState({ errors: err.response.data.errors, loading: false, trace: [] }))
	}

	handleInputChange = (e) => this.setState({ barcode: e.target.value })

	validate = (barcode) => {
		const errors = {};

		if (!barcode) errors.barcode = "Masukan kode barcode disini";

		return errors;
	}



	render(){
		const { errors, barcode, trace } = this.state;

		return(
			<Navbar>
				 <Segment.Group raised>
					    <Segment>
						    <Header as='h3' floated="left">Lacak Kiriman</Header>
						    <Header floated="right" as="h5">
							    <Form loading={this.state.loading}>
							    	<Form.Field error={!!errors.barcode}>
							    		<Input 
							    			action={{
									        	icon: 'search', 
									        	color: 'red',
									        	onClick: () => this.handleClick(),
									    	}} 
									    	defaultValue={barcode}
											onChange={this.handleInputChange}
											placeholder='Masukan kode barcode...'
										/>
									{ errors.barcode && <InlineError text={errors.barcode} /> }
									</Form.Field>
								</Form>
						    </Header>
						    <Divider clearing />
						    { errors.global && <Message negative>
								<Message.Header>Maaf!</Message.Header>
								<p>{errors.global}</p>
							</Message> }
							{ trace.length === 0 ? <p>Masukan kode barcode pada kolom pencarian di atas</p> : <div className="ui container"><Segment><Card.Group centered> {trace.map((data, i) => <ListTrace key={i} listdata={data} />)} </Card.Group></Segment></div> }
						 </Segment>
				</Segment.Group>
			</Navbar>
		);
	}
}



export default LacakPage;