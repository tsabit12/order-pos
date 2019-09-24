import React from "react";
import { Form, Button, Dropdown, Message } from "semantic-ui-react";
import InlineError from "../InlineError";
import PropTypes from "prop-types";

class InvoiceForm extends React.Component {
	state = {
		data: {
			tanggal: '',
			kantor: ''
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
		if (!data.tanggal) errors.tanggal = "Periode order harap di isi";
		if (!data.kantor) errors.kantor = "Kantor belum dipilih";
		return errors;
	}

	handleChange = (e) => this.setState({ data: { ...this.state.data, tanggal: e.target.value } });


	render(){
		const { data, errors, loading } = this.state;
		const { datakantor } = this.props;

		return(
			<Form loading={loading} onSubmit={this.onSubmit}>
				{ errors.global && <Message negative>
						<Message.Header>Terdapat kesalahan!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
				<Form.Group widths='equal'>
					<Form.Field>
						<label>Periode</label>
						<Form.Input 
							name="tanggal"
							id="tanggal"
							placeholder="YYYY-MM"
							value={data.tanggal}
							onChange={this.handleChange}
							error={errors.tanggal}
						/>
					</Form.Field>
					<Form.Field>
						<label>Kantor</label>
						<Dropdown 
							selection
							placeholder="Pilih kantor"
							options={
		        				datakantor.map(data => ({
		        					key: data.kantorid,
		        					value: data.kantorid,
		        					text: data.namakantor
		        				})
		        			)}
		        			onChange={this.onChange} 
		        			error={!!errors.kantor}
						/>
						{ errors.kantor && <InlineError text={errors.kantor} /> }
					</Form.Field>
				</Form.Group>
				<Button secondary fluid>Cetak</Button>
			</Form>
		);
	}
}

InvoiceForm.propTypes = {
	datakantor: PropTypes.array.isRequired,
	submit: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
}

export default InvoiceForm;