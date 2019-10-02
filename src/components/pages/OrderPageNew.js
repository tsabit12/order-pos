import React from "react";
import Navbar from "../menu/Navbar";
import StepOrder from "../order/StepOrder";
import CariPoForm from "../order/CariPoForm";
import SenderForm from "../order/SenderForm";
import ReceiverForm from "../order/ReceiverForm";
import FeeForm from "../order/FeeForm";
import { Message, Button } from "semantic-ui-react";
import axios from "axios";

class OrderPageNew extends React.Component {
	state = {
		step: 1,
		errors: {
			po: {},
			fee: {}
		},
		loading: false,
		data: {
			nomorPo: '',
			sender: {},
			receiver: {}
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
		window.scrollTo(0, 0);
		const { nomorPo, user } = data;
		this.setState({ loading: true, data: { ...this.state.data, nomorPo: nomorPo } });
		axios.post(`${process.env.REACT_APP_API}/order/searchPO`, { idpo: nomorPo, user: user })
			.then(results => {
				this.setState({ 
					loading: false, 
					step: 2, 
					errors: {...this.state.errors, po: {} },
					data: { ...this.state.data, sender: results.data }
				})
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
		axios.post(`${process.env.REACT_APP_API}/orderPost`, { other: data, fee: datafee })
		.then(res => {
			this.setState({ errors: {...this.state.errors, fee: {} }, loading: false, open: false, step: 5, idorder: res.data.orderId })
		})
		.catch(err => this.setState({ errors: { ...this.state.errors, fee: err.response.data.errors, loading: false, open: true }}))
	}

	backFromFinish = () => {
		this.setState({ step: 2, data: { ...this.state.data, receiver:{} }});
	}

	render(){
		const { step, errors, loading, data } = this.state;
		
		return(
			<Navbar>
				<Message
				    header='Halaman Order'
				    content='Silahkan lengkapi tahap-tahap dibawah ini untuk melakukan order'
				/>
				<StepOrder step={step} />
				{ step === 1 && <CariPoForm submitPO={this.onClickPO} errors={ errors.po } loading={loading} nomorPo={data.nomorPo}/> }
				{ step === 2 && <SenderForm submitSender={this.submitSender} onClickBack={this.onClickBack} dataSender={data.sender}/> }
				{ step === 3 && <ReceiverForm 
					onClickBack={this.onClickBack} 
					submitReceiver={this.submitReceiver} 
					dataReceiver={data.receiver}
					dataOptions={this.state.dataOptions}
				/> }
				{ step === 4 && <FeeForm 
					onClickBack={this.onClickBack} 
					dataReceiver={data.receiver} 
					dataSender={data.sender} 
					onClickFee={this.submitFee} 
					openModal={this.state.open}
					loading={loading}
					errors={errors.fee}
				/> }
				{ step === 5 && <React.Fragment>
					<Message
				    	icon='check'
				    	header='Proses order sukses'
				    	content={'Order berhasil, berikut adalah nomor order anda ' +this.state.idorder+'. Klik tombol dibawah untuk melakukan order dengan PO yang sama'}
					/>
					<Button color='red' fluid onClick={this.backFromFinish}>Tambah</Button>
				</React.Fragment> }
			</Navbar>
		);
	}
}

export default OrderPageNew;