import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import ListHandOver from "../list/ListHandOver";
import { connect } from "react-redux";
import { fetchHandOver, pickup } from "../../actions/handover";
import { Segment, Header, Icon, Divider, Dimmer, Loader, Message, Modal, Form, Button } from "semantic-ui-react";


class HandoverPage extends React.Component{
	state = {
		loading: false,
		errors: {},
		open: false,
		pin: '',
		data: {},
		errorsPin: {}
	}

	componentDidMount() {
	    this.props.fetchHandOver();
	}

	submit = (data) => {
		this.setState({ open: true, data: data, pin: '' });
	}

	onChange = (e) => this.setState({ pin: e.target.value})

	close = () => this.setState({ open: false })

	sumbitdata = () => {
		const errorsPin = this.validate(this.state.pin);
		this.setState({ errorsPin })
		if (Object.keys(errorsPin).length === 0) {
			this.setState({ loading: true, open: false });
			const datatosend = { data: this.state.data, pin: this.state.pin }
			console.log(datatosend);
			this.props.pickup(datatosend)
			.then(() => this.setState({ loading: false }))
			.catch(err => this.setState({ loading: false, errors: err.response.data.errors }));
		}
	}

	validate = (pin) => {
		const errors = {};
		if (pin === ""){
			errors.pin = "Masukan pin";
		}

		return errors;
	}

	render(){
		const { errors, errorsPin } = this.state;
		console.log(this.state.data);
		return(
			<Navbar>
				<Modal size="mini" open={this.state.open} onClose={this.close}>
		          <Modal.Header>PIN</Modal.Header>
		          <Modal.Content>
		           	<Form>
		           		<Form.Field>
		           			<Form.Input 
		           				name="pin"
		           				id="pin"
		           				type="password"
		           				value={this.state.pin}
		           				onChange={this.onChange}
		           				palceholder= "Masukan pin"
		           				error={ errorsPin.pin }
		           			/>
		           		</Form.Field>
		           	</Form>
		          </Modal.Content>
		          <Modal.Actions>
		            <Button negative onClick={this.close}>Tutup</Button>
		            <Button secondary onClick={this.sumbitdata}>Submit</Button>
		          </Modal.Actions>
		        </Modal>
				<Segment padded>
				    { errors.global && <Message negative>
						<Message.Header>Maaf!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
					<Header as='h2'>
					    <Icon name='american sign language interpreting' />
					    <Header.Content>Hand Over Pickup</Header.Content>
					</Header>
					<Divider/>
					<Dimmer active={this.state.loading} inverted>
				        <Loader inverted size='medium'>Loading</Loader>
				    </Dimmer>
					<ListHandOver updateOrder={this.submit} />
				</Segment>
			</Navbar>
		);
	}
}

HandoverPage.propTypes = {
	fetchHandOver: PropTypes.func.isRequired,
	pickup: PropTypes.func.isRequired
}

export default connect(null, { fetchHandOver, pickup })(HandoverPage);