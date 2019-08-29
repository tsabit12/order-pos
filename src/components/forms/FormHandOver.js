import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";

class FormHandOver extends React.Component{
	state = {
		loading: false,
		errors: {},
		pin: '',
		nopickup: ''
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value })

	onSubmit = () => {
		const { pin, nopickup } = this.state;
		const errors = this.validate(pin, nopickup);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			const data = {
				pin: this.state.pin,
				nopickup: this.state.nopickup
			};

			this.props.submit(data)
				.then(() => this.setState({ loading: false, errors: {} }))
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
		}
	}

	validate = (pin, nopickup) => {
		const errors = {};
		if (!pin) errors.pin = "Pin tidak boleh kosong";
		if (!nopickup) errors.nopickup = "Nomor pickup harap di isi";

		return errors;
	}


	render(){
		const { errors, loading } = this.state;
		
		return(
			<React.Fragment>
				{ errors.global && <Message negative>
					<Message.Header>Terdapat Kesalahan!</Message.Header>
					<p>{errors.global}</p>
				</Message> }
				<Form onSubmit={this.onSubmit} loading={loading}>
					<Form.Group widths='equal'>
						<Form.Input
							label="Nomor Pickup"
							placeholder="Masukan nomor pickup"
							name="nopickup"
							id="nopickup"
							value={this.state.nopickup}
							onChange={this.onChange}
							error={errors.nopickup}
							autoComplete="off"
						/>
						<Form.Input
							type="password"
							label="Pin"
							name="pin"
							id="pin"
							placeholder="Masukan pin"
							value={this.state.pin}
							onChange={this.onChange}
							error={errors.pin}
						/>
					</Form.Group>
					<Button primary fluid>Submit</Button>
				</Form>
			</React.Fragment>
		);
	}
}

FormHandOver.propTypes = {
	submit: PropTypes.func.isRequired
}

export default FormHandOver;