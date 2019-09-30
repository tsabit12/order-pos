import React from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";

class SenderForm extends React.Component {
	state = {
		step: 2,
		data: {
			senderName: this.props.dataSender.senderName,
			senderAddres: this.props.dataSender.senderAddres,
			senderCity: this.props.dataSender.senderCity,
			senderKec: this.props.dataSender.senderKec,
			senderProv: this.props.dataSender.senderProv,
			senderPos: this.props.dataSender.senderPos,
			senderPhone: this.props.dataSender.senderPhone,
			senederMail: this.props.dataSender.senederMail
		},
		errors: {},
		checked: true
	}

	onChange = (e) => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value }})

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.props.submitSender(this.state.data, this.state.step);
		}
	}

	handleClick = () => {
		const { checked } = this.state;
		if (checked) {
			this.setState({ checked: false, data: { ...this.state.data, senederMail: '' } });
		}else{
			this.setState({ checked: true, data: { ...this.state.data, senederMail: this.props.dataSender.senederMail } });
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.senderName) errors.senderName = "Nama pengirim harus di isi";
		if (!data.senderAddres) errors.senderAddres = "Alamat pengirim harus di isi";
		if (!data.senderCity) errors.senderCity = "Kabupaten atau kota harus di isi";
		if (!data.senderKec) errors.senderKec = "Kecamatan harus di isi";
		if (!data.senderProv) errors.senderProv = "Provinsi tidak boleh kosong";
		if (!data.senderPos) errors.senderPos = "Kodepos tidak boleh kosong";
		if (!data.senderPhone) errors.senderPhone = "Nomor handphone harap di isi";
		if (!data.senederMail) errors.senederMail = "Email harap di isi";

		return errors;
	}


	render(){
		const { step, data, errors } = this.state;
		
		return(
			<React.Fragment>
				<Form onSubmit={this.onSubmit}>
					<Form.Group widths="equal">
						<Form.Field>
							<Form.Input
								name="senderName"
								id="senderName"
								type="text"
								placeholder="Masukan nama pengirim"
								label="Nama"
								value={data.senderName}
								onChange={this.onChange}
								error={errors.senderName}
							/>
						</Form.Field>
						<Form.Field>
							<label style={{fontWeight: 100}}>
								<Checkbox 
									label='Gunakan email pembuat PO'
									checked={this.state.checked}
									onClick={this.handleClick}
								/>
							</label>
							<Form.Input
								name="senederMail"
								id="senederMail"
								type="text"
								placeholder="Masukan alamat email"
								value={data.senederMail}
								onChange={this.onChange}
								error={errors.senederMail}
								disabled={this.state.checked}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Field>
							<Form.Input
								name="senderProv"
								id="senderProv"
								type="text"
								placeholder="Masukan provinsi"
								label="Provinsi"
								autoComplete="off"
								value={data.senderProv}
								onChange={this.onChange}
								error={errors.senderProv}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Input
								name="senderCity"
								id="senderCity"
								type="text"
								placeholder="Masukan kota pengirim"
								label="Kabupaten/Kota"
								value={data.senderCity}
								error={errors.senderCity}
								onChange={this.onChange}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Group widths='equal'>
						<Form.Field>
							<Form.Input
								name="senderKec"
								id="senderKec"
								type="text"
								placeholder="Masukan kecamatan"
								label="Kecamatan"
								value={data.senderKec}
								onChange={this.onChange}
								error={errors.senderKec}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Input
								name="senderAddres"
								id="senderAddres"
								type="text"
								placeholder="Masukan alamat pengirim"
								label="Alamat"
								value={data.senderAddres}
								onChange={this.onChange}
								error={errors.senderAddres}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Field>
							<Form.Input
								name="senderPos"
								id="senderPos"
								type="text"
								placeholder="Masukan kode pos"
								label="Kodepos"
								value={data.senderPos}
								onChange={this.onChange}
								error={errors.senderPos}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Input
								name="senderPhone"
								id="senderPhone"
								type="text"
								placeholder="Masukan nomor handphone"
								label="Nomor Handphone"
								value={data.senderPhone}
								onChange={this.onChange}
								error={errors.senderPhone}
							/>
						</Form.Field>
					</Form.Group>
				</Form>
				<br/>
				<Button.Group fluid>
					<Button color='red' onClick={() => this.props.onClickBack(step) }>Kembali</Button>
					<Button secondary onClick={this.onSubmit}>Selanjutnya</Button>
				</Button.Group>
			</React.Fragment>
		);
	}
}

SenderForm.propTypes = {
	onClickBack: PropTypes.func.isRequired,
	dataSender: PropTypes.object.isRequired,
	submitSender: PropTypes.func.isRequired
}

export default SenderForm;