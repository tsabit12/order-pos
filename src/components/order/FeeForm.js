import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Message, Icon, Modal, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";
import ListFee from "../list/ListFee";

const config = {
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer 74f5dbde-b920-3504-a41a-7691bf264d36',
		'Accept': 'application/json'
	}
}

class FeeForm extends React.Component {
	state = {
		step: 4,
		shipperzipcode: this.props.dataSender.senderPos,
		receiverzipcode: this.props.dataReceiver.receiverPos,
		loading: true,
		success: false,
		fee: [],
		open: false,
		datafee: {},
		errors: {},
		active: false
	}

	componentDidMount(){
		this.getFee();
	}

	componentWillReceiveProps(nextProps){
		if (nextProps) {
			this.setState({ errors:  nextProps.errors, active: nextProps.loading })
		}
	}

	getFee = () => {
		this.setState({ loading: true });
		axios.post('https://api.posindonesia.co.id:8245/utilitas/1.0.1/getFee', {
			  customerid: "",
			  desttypeid: "1",
			  itemtypeid: "1",
			  shipperzipcode: this.state.shipperzipcode,
			  receiverzipcode: this.state.receiverzipcode,
			  weight: "1000",
			  length: "0",
			  width: "0",
			  height: "0",
			  diameter:"0",
			  valuegoods: "0"
		}, config)
		.then(res => res.data.rs_fee.r_fee)
		.then(result => {
			this.setState({ loading: false, success: true, fee: result });
		})
		.catch(err => this.setState({ loading: false, success: false }));
	}

	accept = (name, total, code, fee, feeTax, insurance, insuranceTax, itemValue) => {
		this.setState({ 
			open: true, 
			datafee: {...this.state.datafee, 
				serviceName: name, 
				totalFee: total, 
				serviceCode: code,
				fee: `${fee}`,
				feeTax: `${feeTax}`,
				insurance: insurance,
				insuranceTax: insuranceTax,
				itemValue: itemValue
			} 
		});
	}

	closeModal = () => {
		this.setState({ open: false });
	}

	submitFee = () => {
		this.setState({ active: true });
		this.props.onClickFee(this.state.datafee);
	}


	render(){
		const { step, loading, success, fee, open, errors } = this.state;
		return(
			<React.Fragment>
				<Modal size="mini" open={open}>
		          <Modal.Header>Apakah anda yakin ?</Modal.Header>
		          <Dimmer active={this.state.active} inverted>
			        <Loader inverted>Loading</Loader>
			      </Dimmer>
		          <Modal.Content>
		          	{ errors.global && <Message negative>
						<Message.Header>Maaf!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
		            <p>Paket yang anda pilih adalah <strong>{this.state.datafee.serviceName}</strong> dengan total biaya = {this.state.datafee.totalFee}</p>
		          </Modal.Content>
		          <Modal.Actions>
		            <Button negative onClick={this.closeModal}>Batal</Button>
		            <Button
		              positive
		              icon='checkmark'
		              labelPosition='right'
		              content='Ya'
		              onClick={this.submitFee}
		            />
		          </Modal.Actions>
		        </Modal>

				{ loading &&  <Message icon>
				    <Icon name='circle notched' loading />
				    <Message.Content>
				      <Message.Header>Loading</Message.Header>
				      Sedang memuat data tarif, mohon tunggu sebentar
				    </Message.Content>
				  </Message> }

				{ !loading && !success && <Message negative>
				    <Message.Header>Maaf Terdapat Kesalahan</Message.Header>
				    <p>Gagal memuat data tarif, klik <Link onClick={this.getFee}>disini</Link> untuk memuat ulang data</p>
				  </Message> }

				{ !loading && success && <ListFee listdata={fee} accept={this.accept} /> }
				<br/>
				<Button.Group fluid>
					<Button color='red' onClick={() => this.props.onClickBack(step) }>Kembali</Button>
				</Button.Group>
			</React.Fragment>
		);
	}
}

FeeForm.propTypes = {
	onClickBack: PropTypes.func.isRequired,
	dataReceiver: PropTypes.object.isRequired,
	dataSender: PropTypes.object.isRequired,
	onClickFee: PropTypes.func.isRequired,
	openModal: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	errors: PropTypes.object.isRequired
}

export default FeeForm;