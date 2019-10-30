import React from "react";
import Navbar from "../menu/Navbar";
import { Divider, Input, Form, Message } from "semantic-ui-react";
import InlineError from "../InlineError";
import axios from "axios";
import ListLacak from "../list/ListLacak";

class LacakPage extends React.Component {
	state = {
		barcode: '',
		errors: {},
		loading: false,
		trace: []
	}

	dynamicSort = (property) => {
	    var sortOrder = 1;
	    if(property[0] === "-") {
	        sortOrder = -1;
	        property = property.substr(1);
	    }

	    return function (a,b) {
	        /* next line works with strings and numbers, 
	         * and you may want to customize it to your needs
	         */
	        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	        return result * sortOrder;
	    }
	}

	handleClick = () => {
		const errors = this.validate(this.state.barcode);
		this.setState({ errors, loading: true });
		const { barcode } = this.state;
		axios.post(`${process.env.REACT_APP_API}/lacak`, { barcode })
			.then(res => res.data.result)
			.then(data => {
				//sort by enventdate desc
				data.sort(this.dynamicSort("-eventDate"));
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
			    <Divider clearing />
			    { errors.global && <Message negative>
					<Message.Header>Maaf!</Message.Header>
					<p>{errors.global}</p>
				</Message> }
				{ trace.length === 0 ? <p>Masukan kode barcode pada kolom pencarian di atas</p> :
					<ListLacak listdata={trace} /> }
			</Navbar>
		);
	}
}



export default LacakPage;