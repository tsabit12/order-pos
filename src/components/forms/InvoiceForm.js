import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import InlineError from "../InlineError";
import PropTypes from "prop-types";
import { DatesRangeInput } from "semantic-ui-calendar-react";

class InvoiceForm extends React.Component {
	state = {
		data: {
			datesRange: '',
			nopend: this.props.nopend
		},
		errors: {},
		loading: false,
		options: []
	}

	onChange = (e, { value }) => this.setState({ data: {...this.state.data, kantor: value} })

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
				.then(() => this.setState({ loading: false, errors: {}, success: true }))
				.catch(err => {
					this.setState({ errors: err.response.data.errors, loading: false });
					//reset success when error
					this.props.remove();
				})
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.datesRange) errors.datesRange = "Periode harap di isi";
		return errors;
	}

	handleChangeDate = (e, {name, value}) => this.setState({ data: { ...this.state.data, [name]: value }})

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
				</Form.Group>
				<Button secondary fluid>Cetak</Button>
			</Form>
		);
	}
}

InvoiceForm.propTypes = {
	submit: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
}

export default InvoiceForm;