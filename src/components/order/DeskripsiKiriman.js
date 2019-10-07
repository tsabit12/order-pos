import React from "react";
import { Form, Button, Select } from "semantic-ui-react";
import PropTypes from "prop-types";

class DeskripsiKiriman extends React.Component {
	state = {
		step: 4,
		data: {
			contendesc: this.props.dataDeskripsi.contendesc,
			itemtypeid: this.props.dataDeskripsi.itemtypeid,
			weight: this.props.dataDeskripsi.weight,
			valuegoods: this.props.dataDeskripsi.valuegoods,
		},
		options: [
			{ key: '2', value: '2', text: 'Surat' },
  			{ key: '1', value: '1', text: 'Paket' },
		],
		errors: {}
	}

	onChange = (e) => this.setState({data: {...this.state.data, [e.target.name] : e.target.value }})

	handleChange = (e, { value }) => this.setState({ data: { ...this.state.data, itemtypeid: value }})

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			const { step, data } = this.state;
			this.props.submitDesc(step, data);
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.contendesc) errors.contendesc = "Deskripsi kiriman harap di isi";
		if (!data.itemtypeid) errors.itemtypeid = "Jenis kiriman belum dipilih";
		if (!data.weight) errors.weight = "Berat harap di isi";
		if (!data.valuegoods) errors.valuegoods = "Valuegoods harap di isi";
		return errors;

	}

	render(){
		const { data, step, options, errors } = this.state;
		return(
			<React.Fragment>
				<Form onSubmit={this.onSubmit}>
					<Form.Field>
						<Form.Input 
							label='Deskripsi Kiriman'
							name='contendesc'
							id='contendesc'
							type='text'
							autoComplete="off"
							placeholder="Contoh dokumen"
							value={data.contendesc}
							onChange={this.onChange}
							error={errors.contendesc}
						/>
					</Form.Field>
					<Form.Group widths="equal">
						<Form.Field error={!!errors.itemtypeid}>
							<label>Jenis Kiriman</label>
							<Select 
								placeholder='Pilih jenis kiriman' 
								value={data.itemtypeid}
								onChange={this.handleChange}
								options={options} />
						</Form.Field>
						<Form.Field>
							<Form.Input 
								label='Value Goods'
								name='valuegoods'
								id='valuegoods'
								type='text'
								autoComplete="off"
								placeholder="Masukan valuegoods"
								value={data.valuegoods}
								onChange={this.onChange}
								error={errors.valuegoods}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Input 
								label='Berat'
								name='weight'
								id='weight'
								type='number'
								autoComplete="off"
								placeholder="Masukan berat kiriman"
								value={data.weight}
								onChange={this.onChange}
								error={errors.weight}
							/>
						</Form.Field>
					</Form.Group>
				</Form>
				<Button.Group fluid>
					<Button color='red' onClick={() => this.props.onClickBack(step) }>Kembali</Button>
					<Button secondary onClick={this.onSubmit}>Selanjutnya</Button>
				</Button.Group>
			</React.Fragment>
		);
	}
}

DeskripsiKiriman.propTypes = {
	dataDeskripsi: PropTypes.object.isRequired,
	onClickBack: PropTypes.func.isRequired,
	submitDesc: PropTypes.func.isRequired
}

export default DeskripsiKiriman;