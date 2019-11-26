import React from "react";
import Navbar from "../menu/Navbar";
import { Form, Message } from "semantic-ui-react";
import api from "../../api";
import EntriPickupForm from "../forms/EntriPickupForm";

class EntriPickupPage extends React.Component{
	state = {
		extId: '',
		errors: {},
		loading: false,
		data: {},
		success: false,
		successUpdate: false
	}

	escapeRegExp = (string) => {
		return string.replace(/[~`/*'"+?^${}<>()|[\]\\]/g, '');
	}

	onChange = (e) => {
		const val = this.escapeRegExp(e.target.value);
		this.setState({ extId: val });
	}

	onSubmit = () => {
		const errors = this.validate(this.state.extId);
		this.setState({ errors, successUpdate: false });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			api.kurir.getExternalId(this.state.extId)
				.then(res => this.setState({ loading: false, errors: {}, data: res, success: true }))
				.catch(err => this.setState({ loading: false, errors: err.response.data.errors, success: false }))
		}
	}

	validate = (extId) => {
		const errors = {};
		if (!extId) errors.extId = "External id harap diisi";
		return errors;
	}

	submitBiaya = (data) => api.kurir.updateBiaya(data).then(() => this.setState({ data: {}, successUpdate: true }))  

	render(){
		const { errors, loading, success, data, successUpdate } = this.state;
		const styleLoading = loading ? 'ui icon button red loading' : 'ui icon button red';
		return(
			<Navbar>
				<Form onSubmit={this.onSubmit}>
					<Form.Field error={!!errors.extId}>
						<div className='ui action labeled input'>
							<div className="ui label label">External Id</div>
							<input 
								type="text" 
								placeholder="Search..." 
								name='extId'
								value={this.state.extId}
								onChange={this.onChange}
								autoComplete="off"
							/>
							<button className={styleLoading}>
								<i aria-hidden="true" className="search icon"></i>
							</button>
						</div>
						{ errors.extId && <span style={{ color: "#ae5856"}}>{errors.extId}</span>}
					</Form.Field>
				</Form>
				{ successUpdate && <Message positive>
					<Message.Header>Sukses!</Message.Header>
					<p>Entri biaya pickup berhasil diproses</p>
				</Message> }
				{ success && Object.keys(data).length > 0 && <EntriPickupForm detail={data} submit={this.submitBiaya} /> }
			</Navbar>
		);
	}
}

export default EntriPickupPage;