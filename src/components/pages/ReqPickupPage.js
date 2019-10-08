import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import axios from "axios";
import ListReqPickup from "../list/ListReqPickup";
import { connect } from "react-redux";
import { fetchPickup, pickup } from "../../actions/handover";
import { setProgressBar } from "../../actions/progress";
import { Dimmer, Loader, Message, Modal, Button, Form, Dropdown, Checkbox } from "semantic-ui-react";

class ReqPickupPage extends React.Component{
	state = {
		loading: false,
		loadingModal: false,
		errors: {},
		open: false,
		data: {},
		value: '', //kantor
		nopend: this.props.nopend,
		officename: '',
		options: [],
		optionsNopend: [
			{ key: this.props.nopend, text: 'Default', value: this.props.nopend },
			{ key: 'lain', text: 'Lainnya', value: 'lain' },
		],
		loadingSearch: false,
		loadingSearch2: false,
		success: false,
		defaultoptions: true,
		checked: true,
		nopendMitra: this.props.nopendMitra,
		optionsMitra: [
			{ key: this.props.nopendMitra, text: this.props.nopendMitra, value: this.props.nopendMitra }
		]
	}

	componentDidMount() {
		this.props.setProgressBar(true);
		const { nopendMitra } = this.props;
	    this.props.fetchPickup(nopendMitra).then(() => this.props.setProgressBar(false));
	}

	submit = (data) => {
		this.setState({ loading: true });
		axios.post(`${process.env.REACT_APP_API}/kurir/getKantorName`, {
			nopend: this.props.nopend
		}).then(res => {
			this.setState({ 
				officename: this.props.nopend+' - '+res.data.namakantor, 
				open: true, data: data,
				loading: false, 
				value: '' //reset kantor when modal open
			});	
		}).catch(() => this.setState({ loading: false }));
	}

	close = () => this.setState({ open: false })

	sumbitdata = () => {
		const errors = this.validate(this.state.value);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loadingModal: true });
			//need to set value if default options is true
			const { defaultoptions }  = this.state;
			const datatosend = {
				data: this.state.data,
				kantorMitra: this.state.nopendMitra,
				kantorDefault: this.props.nopendMitra //always default by session
			};

			if (defaultoptions) {
				datatosend.kantor = this.state.nopend;
			}else{
				datatosend.kantor = this.state.value;
			}

			this.props.pickup(datatosend)
			.then(() => {
				window.scrollTo(0, 0);
				this.setState({ loadingModal: false, success: true, open: false, data: {}  })
			})
			.catch(err => this.setState({ loadingModal: false, errors: err.response.data.errors, success: false, open: false }));
		}
	}

	validate = (value) => {
		const errors = {};
		const { defaultoptions } = this.state;
		//only validate when default options is false
		if (!defaultoptions && !value) errors.kantor = "Kantor tidak boleh kosong";
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
					key: result.nopend,
					value: result.nopend,
					text: result.nopend+' - '+result.NamaKtr
				})
			});
			this.setState({ loadingSearch: false, options });
		})
		.catch(err => console.log(err));
	}

	onChangeKantor = (e, data) => this.setState({ value: data.value }) 

	onChangeOptions = (e, { value }) => {
		this.setState({ nopend: value });
		if (value === this.props.nopend) {
			this.setState({ defaultoptions: true });
		}else{
			this.setState({ defaultoptions: false });
		}
	}

	handleClick = () => {
		const { checked } = this.state;
		if (checked) {
			const optionsMitra = [];
			this.setState({ checked: false, nopendMitra: '', optionsMitra });
		}else{
			const optionsMitra = [{ key: this.props.nopendMitra, text: this.props.nopendMitra, value: this.props.nopendMitra }];
			this.setState({ checked: true, nopendMitra: this.props.nopendMitra, optionsMitra });
		}
	}

	onSearchChangeMitra = (e, data) => {
		clearTimeout(this.timer);
		this.setState({ nopendMitra: data.searchQuery });
		this.timer = setTimeout(this.fetchKantorMitra, 500);
	}

	fetchKantorMitra = () => {
		if (!this.state.nopendMitra) return;
		this.setState({ loadingSearch2: true });
		axios.post(`${process.env.REACT_APP_API}/Provinsi/getKantorMitra`, {
			kantor: this.state.nopendMitra
		})
		.then(res => res.data.result)
		.then(result => {
			const optionsMitra = [];
			result.forEach(result => {
				optionsMitra.push({
					key: result.nopend,
					value: result.nopend,
					text: result.nopend+' - '+result.NamaKtr
				})
			});
			this.setState({ loadingSearch2: false, optionsMitra });
		})
		.catch(err => console.log(err));
	}

	onChangeKantorMitra = (e, data) => this.setState({ nopendMitra: data.value }) 


	render(){
		const { errors, open, success, defaultoptions, checked } = this.state;
		
		return(
			<Navbar>
				<Modal size="tiny" open={open}>
		          <Modal.Header>Notifikasi</Modal.Header>
		          <Modal.Content>
		            <Form onSubmit={this.sumbitdata} loading={this.state.loadingModal}>
		            	<Form.Group widths='equal'>
		            		<Form.Field>
		            			<label>
		            				Diambil di kantor? &nbsp; &nbsp;  
		            				<Checkbox 
		            					label='Default' 
		            					checked={checked}
		            					onClick={this.handleClick}
		            				/>
		            			</label>
		            			<Dropdown
							        placeholder='Cari kantor..'
							        search
							        selection
							        fluid
							        allowAdditions
							        disabled={checked}
							        value={this.state.nopendMitra}
					    			options={this.state.optionsMitra}
					    			onSearchChange={this.onSearchChangeMitra}
					    			loading={this.state.loadingSearch2}
					    			onChange={this.onChangeKantorMitra}
							    />
		            		</Form.Field>
		            	</Form.Group>
		            	<Form.Group widths='equal'>
		            		<Form.Field>
		            			<label>Dipickup oleh?</label>
			            		<Dropdown
						            onChange={this.onChangeOptions}
						            options={this.state.optionsNopend}
						            placeholder='Choose an option'
						            selection
						            value={this.state.nopend}
						          />
			            	</Form.Field>
			            	<Form.Field>
			            		<label>&nbsp;</label>
			            		{ defaultoptions ? <Form.Input value={this.state.officename} /> : 
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
					    			error={!!errors.kantor}
							    /> }
			            	</Form.Field>
		            	</Form.Group>
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

		        { success && <Message positive>
					<Message.Header>Sukses!</Message.Header>
					<p>Request pickup berhasil di proses</p>
				</Message> }

			    { errors.global && <Message negative>
					<Message.Header>Maaf!</Message.Header>
					<p>{errors.global}</p>
				</Message> }
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
	pickup: PropTypes.func.isRequired,
	nopend: PropTypes.string.isRequired,
	nopendMitra: PropTypes.string.isRequired
}

function mapStateProps(state) {
	return{
		nopend: state.user.nopendPos,
		nopendMitra: state.user.nopend
	}
}

export default connect(mapStateProps, { fetchPickup, pickup, setProgressBar })(ReqPickupPage);