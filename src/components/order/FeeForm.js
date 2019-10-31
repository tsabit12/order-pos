import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Message, Icon, Modal, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";
import ListFee from "../list/ListFee";

class FeeForm extends React.Component {
	state = {
		step: 5,
		shipperzipcode: this.props.dataSender.senderPos,
		receiverzipcode: this.props.dataReceiver.receiverPos,
		valuegoods: this.props.dataDeskripsi.valuegoods,
		itemtypeid: this.props.dataDeskripsi.itemtypeid,
		weight: this.props.dataDeskripsi.weight,
		height: this.props.dataDeskripsi.height,
		length: this.props.dataDeskripsi.length,
		width: this.props.dataDeskripsi.width,
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
		axios.post(`${process.env.REACT_APP_API}/getFee`, {
			  shipperzipcode: this.state.shipperzipcode,
			  receiverzipcode: this.state.receiverzipcode,
			  weight: this.state.weight,
			  valuegoods: this.state.valuegoods,
			  itemtypeid: this.state.itemtypeid,
			  width: this.state.width,
			  height: this.state.height,
			  length: this.state.length
		})
		.then(res => res.data.result)
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
				fee: `${fee}`, //convert to string
				feeTax: `${feeTax}`,
				insurance: `${insurance}`,
				insuranceTax: `${insuranceTax}`,
				itemValue: `${itemValue}`
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
						<Message.Header>Oppps!</Message.Header>
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
				    <Message.Header>Oppps!</Message.Header>
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
	dataDeskripsi: PropTypes.object.isRequired,
	onClickFee: PropTypes.func.isRequired,
	openModal: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	errors: PropTypes.object.isRequired
}

export default FeeForm;