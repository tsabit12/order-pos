import React from "react";
import Navbar from "../menu/Navbar";
import StepOrder from "../order/StepOrder";
import CariPoForm from "../order/CariPoForm";
import SenderForm from "../order/SenderForm";
import DeskripsiKiriman from "../order/DeskripsiKiriman";
import ReceiverForm from "../order/ReceiverForm";
import FeeForm from "../order/FeeForm";
import { Message, Button } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class OrderPage extends React.Component {
	state = {
		step: 1,
		errors: {
			po: {},
			fee: {}
		},
		loading: false,
		data: {
			nomorPo: '',
			sender: {
				senderPhone: ''
			},
			receiver: {
				receiverPhone: ''
			},
			deskripsi: {}
		},
		open: false,
		idorder: '',
		dataOptions: {
			options: [],
			optionsKab: [],
			optionsKec: [],
			optionPostal: []
		}
	}

	onClick = (step) => {
		this.setState({ step: step+1 });
	}

	onClickBack = (step) => {
		this.setState({ step: step-1 });
	}

	onClickPO = (data) => {
		const { nomorPo, user } = data;
		this.setState({ loading: true, data: { ...this.state.data, nomorPo: nomorPo } });
		axios.post(`${process.env.REACT_APP_API}/order/searchPO`, { idpo: nomorPo, user: user })
			.then(results => {
				this.setState({ 
					loading: false, 
					step: 2, 
					errors: {...this.state.errors, po: {} },
					data: { ...this.state.data, sender: results.data }
				});
				window.scrollTo(0, 0);
			})
			.catch(err => this.setState({ 
				errors: { ...this.state.errors, po: err.response.data.errors },
				loading: false,
				data: { ...this.state.data, sender: {} }
			}))
	}

	submitSender = (data, step) => {
		window.scrollTo(0, 0);
		this.setState({ data: { ...this.state.data, sender: data }, loading: false, step: step+1 });
	}

	submitReceiver = (data, step, dataOptions) => {
		window.scrollTo(0, 0);
		this.setState({ 
			step: step+1, 
			dataOptions: {
				...this.state.dataOptions, 
				options: dataOptions.options, 
				optionsKab: dataOptions.optionsKab, 
				optionsKec: dataOptions.optionsKec,
				optionPostal: dataOptions.optionPostal
			}, 
			data: { ...this.state.data, receiver: data } });
	}

	submitFee = (datafee) => {
		const { data } = this.state;
		const { userid } = this.props;
		axios.post(`${process.env.REACT_APP_API}/orderPost`, { other: data, fee: datafee, userid: userid })
		.then(res => {
			this.setState({ errors: {...this.state.errors, fee: {} }, loading: false, open: false, step: 6, idorder: res.data.orderId })
		})
		.catch(err => this.setState({ errors: { ...this.state.errors, fee: err.response.data.errors, loading: false, open: true }}))
	}

	backFromFinish = () => {
		this.setState({ step: 2, 
			data: { 
				...this.state.data, 
					receiver:{},
					deskripsi: {}
			},
			dataOptions: {
				...this.state.dataOptions,
					options: [],
					optionsKab: [],
					optionsKec: [],
					optionPostal: []
			}
		});
	}

	submitDesc = (step, data) => {
		this.setState({ step: step+1, data: {...this.state.data, deskripsi: data }});
	}

	render(){
		const { step, errors, loading, data } = this.state;
		
		return(
			<Navbar>
				<div style={{marginTop: '10px'}}>
					<StepOrder step={step} />
					{ step === 1 && <CariPoForm submitPO={this.onClickPO} errors={ errors.po } loading={loading} nomorPo={data.nomorPo}/> }
					{ step === 2 && <SenderForm submitSender={this.submitSender} onClickBack={this.onClickBack} dataSender={data.sender}/> }
					{ step === 3 && <ReceiverForm 
						onClickBack={this.onClickBack} 
						submitReceiver={this.submitReceiver} 
						dataReceiver={data.receiver}
						dataOptions={this.state.dataOptions}
					/> }
					{ step === 4 && <DeskripsiKiriman 
						dataDeskripsi={data.deskripsi} 
						onClickBack={this.onClickBack} 
						submitDesc={this.submitDesc}
					/> }
					{ step === 5 && <FeeForm 
						onClickBack={this.onClickBack} 
						dataReceiver={data.receiver} 
						dataSender={data.sender} 
						dataDeskripsi={data.deskripsi}
						onClickFee={this.submitFee} 
						openModal={this.state.open}
						loading={loading}
						errors={errors.fee}
					/> }
					{ step === 6 && <React.Fragment>
						<Message
					    	icon='check'
					    	header='Proses order sukses'
					    	content={'Order berhasil, berikut adalah nomor order anda ' +this.state.idorder+'. Klik tombol dibawah untuk melakukan order dengan PO yang sama'}
						/>
						<Button color='red' fluid onClick={this.backFromFinish}>Tambah</Button>
					</React.Fragment> }
				</div>
			</Navbar>
		);
	}
}

OrderPage.propTypes = {
	userid: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		userid: state.user.userid
	}
}

export default connect(mapStateToProps, null)(OrderPage);