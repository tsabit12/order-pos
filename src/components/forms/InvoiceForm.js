import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import InlineError from "../InlineError";
import PropTypes from "prop-types";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import api from "../../api";

class InvoiceForm extends React.Component {
	state = {
		data: {
			datesRange: '',
			nopend: this.props.nopend,
			nopo: ''
		},
		errors: {},
		loading: false,
		options: [],
		response: []
	}

	onChange = (e, { value }) => this.setState({ data: {...this.state.data, kantor: value} })

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			// this.props.submit(this.state.data)
			// 	.then(() => this.setState({ loading: false, errors: {}, success: true }))
			// 	.catch(err => {
			// 		this.setState({ errors: err.response.data.errors, loading: false });
			// 		//reset success when error
			// 		this.props.remove();
			// 	})
			api.invoice.getData(this.state.data)
				.then(res => console.log(res))
				.catch(err => {
					this.setState({ loading: false, errors: err.response.data.errors });
				});
		}
	}

	validate = (data) => {
		const errors = {};
		const dateRangReg = /([12]\d{3}\/(0[1-9]|1[0-2]))\/((0[1-9]|[12]\d|3[01])) - ([12]\d{3}\/(0[1-9]|1[0-2]))\/((0[1-9]|[12]\d|3[01]))/;
		if (!data.datesRange) errors.datesRange = "Periode harap di isi";
		if (!data.nopo) errors.nopo = "Nomor purchase order tidak boleh kosong";
		if (data.datesRange !== '') {
			if (!data.datesRange.match(dateRangReg) || data.datesRange.length !== 23) errors.datesRange = "Date format yang valid adalah YYYY/MM/DD - YYYY/MM/DD";
		}
		return errors;
	}

	handleChangeDate = (e, {name, value}) => this.setState({ data: { ...this.state.data, [name]: value }})

	onChangePo = (e) => this.setState({ data: { ...this.state.data, nopo: e.target.value }})

	render(){
		const { data, errors, loading } = this.state;

		return(
			<Form loading={loading} onSubmit={this.onSubmit}>
				{ errors.global && <Message negative>
						<Message.Header>Terdapat kesalahan!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
				<Form.Group widths='equal'>
					<Form.Field>
						<label>Periode</label>
						<DatesRangeInput
				          name="datesRange"
				          placeholder="From - To"
				          iconPosition="left"
				          closeOnMouseLeave={false}
				          closable={true}
				          value={data.datesRange}
				          onChange={this.handleChangeDate}
				          dateFormat="YYYY/MM/DD"
				          autoComplete="off"
				          error={!!errors.datesRange}
				        />
				        { errors.datesRange && <InlineError text={errors.datesRange} /> }
					</Form.Field>
					<Form.Field error={!!errors.nopo}>
						<Form.Input 
							label='Nomor Purchase Order'
							name='nopo'
							id='nopo'
							type='text'
							placeholder='Masukan nomor purchase order'
							autoComplete='off'
							value={data.nopo}
							onChange={this.onChangePo}
						/>
						{ errors.nopo && <InlineError text={errors.nopo} /> }
					</Form.Field>
				</Form.Group>
				<Button secondary fluid>Cari</Button>
			</Form>
		);
	}
}

InvoiceForm.propTypes = {
	submit: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
}

export default InvoiceForm;