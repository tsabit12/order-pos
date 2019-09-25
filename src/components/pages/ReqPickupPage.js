import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import ListReqPickup from "../list/ListReqPickup";
import { connect } from "react-redux";
import { fetchPickup, pickup } from "../../actions/handover";
import { getKantor } from "../../actions/order";
import { setProgressBar } from "../../actions/progress";
import { Segment, Header, Icon, Divider, Dimmer, Loader, Message, Modal, Button, Form, Checkbox } from "semantic-ui-react";


class ReqPickupPage extends React.Component{
	state = {
		loading: false,
		errors: {},
		open: false,
		data: {},
		errorsPin: {},
		value: ''
	}

	componentDidMount() {
		this.props.setProgressBar(true);
	    this.props.fetchPickup().then(() => this.props.setProgressBar(false));
	}

	submit = (data) => {
		this.setState({ open: true, data: data, value: '' });
		this.props.getKantor();
	}

	close = () => this.setState({ open: false })

	sumbitdata = () => {
		if (!this.state.value) {
			alert("Pilih salah satu");
		}else{
			this.setState({ loading: true});
			const datatosend = {data: this.state.data, kantor: this.state.value }
			this.props.pickup(datatosend)
			.then(() => this.setState({ open: false, loading: false }))
			.catch(err => this.setState({ loading: false, open: false, errors: err.response.data.errors }));
		}
	}
	
	handleChange = (e, { value }) => this.setState({ value })

	render(){
		const { errors, open } = this.state;
		const { datakantor } = this.props;
		
		return(
			<Navbar>
				<Modal size="tiny" open={open}>
		          <Modal.Header>Silahkan pilih kantor</Modal.Header>
		          <Modal.Content scrolling>
		            { datakantor.length === 0 ? <React.Fragment /> : 
		            	<Form>
		            		{datakantor.map(data => 
		            			<Form.Field key={data.kantorid}>
						          <Checkbox
						            radio
						            label={data.namakantor}
						            name='checkboxRadioGroup'
						            value={data.kantorid}
						            checked={this.state.value === data.kantorid}
						            onChange={this.handleChange}
						          />
						        </Form.Field>
		            		)}
		            	</Form>
		            }
		          </Modal.Content>
		          <Modal.Actions>
		            <Button negative onClick={this.close}>Tutup</Button>
		            <Button
		              onClick={this.sumbitdata}
		              positive
		              icon='checkmark'
		              labelPosition='right'
		              content='Pickup'
		            />
		          </Modal.Actions>
		        </Modal>
			    { errors.global && <Message negative>
					<Message.Header>Maaf!</Message.Header>
					<p>{errors.global}</p>
				</Message> }
				<Header as='h2'>
				    <Icon name='envelope' />
				    <Header.Content>Request Pickup</Header.Content>
				</Header>
				<Divider/>
				<Dimmer active={this.state.loading} inverted>
			        <Loader inverted size='medium'>Loading</Loader>
			    </Dimmer>
			    <Segment>
					<ListReqPickup updateOrder={this.submit} />
				</Segment>
			</Navbar>
		);
	}
}

ReqPickupPage.propTypes = {
	fetchPickup: PropTypes.func.isRequired,
	pickup: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		datakantor: state.order.kantor
	}
}

export default connect(mapStateToProps, { fetchPickup, pickup, getKantor, setProgressBar })(ReqPickupPage);