import React from "react";
import { Form, Button, Select, Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "../InlineError";

class DeskripsiKiriman extends React.Component {
	state = {
		step: 4,
		data: {
			contendesc: this.props.dataDeskripsi.contendesc,
			itemtypeid: this.props.dataDeskripsi.itemtypeid,
			weight: this.props.dataDeskripsi.weight,
			valuegoods: this.props.dataDeskripsi.valuegoods,
			diameter: this.props.dataDeskripsi.diameter,
			height: this.props.dataDeskripsi.height,
			length: this.props.dataDeskripsi.length,
			width: this.props.dataDeskripsi.width
		},
		options: [
			{ key: '0', value: '0', text: 'Surat' },
  			{ key: '1', value: '1', text: 'Paket' },
		],
		errors: {},
		disabled: false
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
		if (!data.valuegoods) errors.valuegoods = "Nilai barang harap di isi";
		if (!data.width) errors.width = "Lebar harap di isi";
		if (!data.height) errors.height = "Tinggi harap di isi";
		if (!data.length) errors.length = "Lebar harap di isi";
		return errors;
	}

	handleChangeBerat = (e) => {
		const value = e.target.value;
		if (value >= 3000) {
			this.setState({ data: { ...this.state.data, itemtypeid: '1', weight: value }, disabled: true }); //set to paket
		}else{
			this.setState({ data: { ...this.state.data, itemtypeid: '', weight: value }, disabled: false });
		}
	}

	render(){
		const { data, step, options, errors } = this.state;
		return(
			<React.Fragment>
				<Form onSubmit={this.onSubmit}>
					<Form.Field error={!!errors.contendesc}>
						<Form.Input 
							label='Deskripsi Kiriman'
							name='contendesc'
							id='contendesc'
							type='text'
							autoComplete="off"
							placeholder="Masukan deskripsi kiriman"
							value={data.contendesc}
							onChange={this.onChange}
						/>
						{ errors.contendesc && <InlineError text={errors.contendesc} /> }
					</Form.Field>
					<Form.Group widths="equal">
						<Form.Field error={!!errors.weight}>
							<label>Berat</label>
							<Input 
								label={{ basic: true, content: 'cm' }}
								labelPosition='right'
								name='weight'
								id='weight'
								type='number'
								autoComplete="off"
								placeholder="Masukan berat kiriman"
								value={data.weight}
								onChange={this.handleChangeBerat}
							/>
							{ errors.weight && <InlineError text={errors.weight} /> }
						</Form.Field>
						<Form.Field error={!!errors.itemtypeid}>
							<label>Jenis Kiriman</label>
							<Select 
								disabled={this.state.disabled}
								placeholder='Pilih jenis kiriman' 
								value={data.itemtypeid}
								onChange={this.handleChange}
								options={options} />
							{ errors.itemtypeid && <InlineError text={errors.itemtypeid} /> }	
						</Form.Field>
						<Form.Field error={!!errors.valuegoods}>
							<Form.Input 
								label='Nilai barang'
								name='valuegoods'
								id='valuegoods'
								type='number'
								autoComplete="off"
								placeholder="Masukan nilai barang"
								value={data.valuegoods}
								onChange={this.onChange}
							/>
							{ errors.valuegoods && <InlineError text={errors.valuegoods} /> }
						</Form.Field>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Field error={!!errors.length}>
							<label>Panjang</label>
							<Input 
								label={{ basic: true, content: 'cm' }}
								labelPosition='right'
								name='length'
								id='length'
								type='number'
								autoComplete="off"
								value={data.length}
								onChange={this.onChange}
								placeholder="Panjang barang kiriman..."
							/>
							{ errors.length && <InlineError text={errors.length} /> }
						</Form.Field>
						<Form.Field error={!!errors.width}>
							<label>Lebar</label>
							<Input 
								label={{ basic: true, content: 'cm' }}
								labelPosition='right'
								name='width'
								id='width'
								type='number'
								autoComplete="off"
								value={data.width}
								onChange={this.onChange}
								placeholder="Lebar barang kiriman..."
							/>
							{ errors.width && <InlineError text={errors.width} /> }
						</Form.Field>
						<Form.Field error={!!errors.height}>
							<label>Tinggi</label>
							<Input 
								label={{ basic: true, content: 'cm' }}
								labelPosition='right'
								name='height'
								id='height'
								type='number'
								autoComplete="off"
								value={data.height}
								onChange={this.onChange}
								placeholder="Tinggi barang kiriman..."
							/>
							{ errors.height && <InlineError text={errors.height} /> }
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