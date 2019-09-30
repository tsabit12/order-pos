import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import axios from "axios";
import ListReqPickup from "../list/ListReqPickup";
import { connect } from "react-redux";
import { fetchPickup, pickup } from "../../actions/handover";
import { setProgressBar } from "../../actions/progress";
import { Header, Icon, Divider, Dimmer, Loader, Message, Modal, Button, Form, Dropdown } from "semantic-ui-react";


class ReqPickupPage extends React.Component{
	state = {
		loading: false,
		errors: {},
		open: false,
		data: {},
		errorsPin: {},
		value: '',
		options: [],
		loadingSearch: false,
		success: false
	}

	componentDidMount() {
		this.props.setProgressBar(true);
	    this.props.fetchPickup().then(() => this.props.setProgressBar(false));
	}

	submit = (data) => {
		this.setState({ open: true, data: data, value: '' });
	}

	close = () => this.setState({ open: false })

	sumbitdata = () => {
		const errors = this.validate(this.state.value);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true, open: false });
			const datatosend = { data: this.state.data, kantor: this.state.value }
			
			this.props.pickup(datatosend)
			.then(() => {
				window.scrollTo(0, 0);
				this.setState({ loading: false, success: true })
			})
			.catch(err => this.setState({ loading: false, errors: err.response.data.errors, success: false }));
		}
	}

	validate = (value) => {
		const errors = {};
		if (!value) errors.kantor = "Kantor harap dipilih";
		return errors;
	}
	
	handleChange = (e, { value }) => this.setState({ value })

	onSearchChange = (e, data) => {
		clearTimeout(this.timer);
		this.setState({ value: data.searchQuery });
		this.timer = setTimeout(this.fetchKantor, 500);
	}

	fetchKantor = () => {
		if (!this.state.value) return;
		this.setState({ loadingSearch: true });
		axios.post(`${process.env.REACT_APP_API}/Provinsi/getKantor`, {
			kantor: this.state.value
		})
		.then(res => res.data.result)
		.then(result => {
			const options = [];
			result.forEach(result => {
				options.push({
					key: result.kantorid,
					value: result.kantorid,
					text: result.namakantor
				})
			});
			this.setState({ loadingSearch: false, options });
		})
		.catch(err => console.log(err));
	}

	onChangeKantor = (e, data) => this.setState({ value: data.value }) 

	render(){
		const { errors, open, success } = this.state;
		
		return(
			<Navbar>
				<Modal size="tiny" open={open}>
		          <Modal.Header>Cari Kantor</Modal.Header>
		          <Modal.Content>
		            <Form onSubmit={this.sumbitdata}>
		            	<Form.Field error={!!errors.kantor}>
		            		<label>Kantor</label>
		            		<Dropdown
						        placeholder='Cari kantor pickup..'
						        search
						        selection
						        fluid
						        allowAdditions
						        value={this.state.value}
				    			onSearchChange={this.onSearchChange}
				    			loading={this.state.loadingSearch}
				    			options={this.state.options}
				    			onChange={this.onChangeKantor}
						    />
		            	</Form.Field>
		            </Form>
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
		        <Header as='h2'>
				    <Icon name='envelope' />
				    <Header.Content>Request Pickup</Header.Content>
				</Header>

		        { success && <Message positive>
					<Message.Header>Sukses!</Message.Header>
					<p>Request pickup berhasil di proses</p>
				</Message> }

			    { errors.global && <Message negative>
					<Message.Header>Maaf!</Message.Header>
					<p>{errors.global}</p>
				</Message> }

				<Divider/>
				<Dimmer active={this.state.loading} inverted>
			        <Loader inverted size='medium'>Loading</Loader>
			    </Dimmer>
				<ListReqPickup updateOrder={this.submit} />
			</Navbar>
		);
	}
}

ReqPickupPage.propTypes = {
	fetchPickup: PropTypes.func.isRequired,
	pickup: PropTypes.func.isRequired
}

export default connect(null, { fetchPickup, pickup, setProgressBar })(ReqPickupPage);