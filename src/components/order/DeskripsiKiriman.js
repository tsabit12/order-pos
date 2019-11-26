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
			valuegoods: this.props.dataDeskripsi.valuegoods ? this.props.dataDeskripsi.valuegoods : 0,
			valuegoodsView: this.props.dataDeskripsi.valuegoodsView ? this.props.dataDeskripsi.valuegoodsView : 0,
			diameter: this.props.dataDeskripsi.diameter,
			height: this.props.dataDeskripsi.height ? this.props.dataDeskripsi.height : 0,
			length: this.props.dataDeskripsi.length ? this.props.dataDeskripsi.length : 0,
			width: this.props.dataDeskripsi.width ? this.props.dataDeskripsi.width : 0,
			disabled: this.props.dataDeskripsi.disabled ? this.props.dataDeskripsi.disabled : false,
		},
		options: [
			{ key: '0', value: '0', text: 'Surat' },
  			{ key: '1', value: '1', text: 'Paket' },
		],
		errors: {}
	}

	escapeRegExp = (string, name) => {
		if (name === 'contendesc') {
			return string.replace(/[~`/*+'"?^${}<>()|[\]\\]/g, '')
		}else{
			return string;
		}
	}

	onChange = (e) => {
		const str 	= e.target.value;
		const name 	= e.target.name; 
		const value = this.escapeRegExp(str, name);
		this.setState({data: {...this.state.data, [e.target.name] : value }})		
	}

	numberWithCommas = (number) => {
    	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	onChangeMoney = (e) => {
		var val = e.target.value.replace(/\D/g, '');
		var x = Number(val);
		const value = this.numberWithCommas(x);
		this.setState({ data: {...this.state.data, valuegoodsView: value, valuegoods: val } });
	}

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
		if (!data.valuegoods && data.itemtypeid === '1') errors.valuegoods = "Kiriman paket, Nilai barang harap di isi";
		if (!data.width && data.itemtypeid === '1') errors.width = "Kiriman paket, lebar tidak boleh kosong"; //only validate when jenis is paket
		if (!data.length && data.itemtypeid === '1') errors.length = "Kiriman paket, panjang tidak boleh kosong";
		if (!data.height && data.itemtypeid === '1') errors.height = "Kiriman paket, tinggi tidak boleh kosong";

		return errors;
	}

	handleChangeBerat = (e) => {
		const value = e.target.value;
		if (value > 2000) {
			this.setState({ data: { ...this.state.data, itemtypeid: '1', weight: value, disabled: true } }); //set to paket
		}else{
			this.setState({ data: { ...this.state.data, itemtypeid: '', weight: value, disabled: false } });
		}
	}

	render(){
		const { data, step, options, errors } = this.state;
		return(
			<React.Fragment>
				<Form onSubmit={this.onSubmit}>
					<Form.Field error={!!errors.contendesc}>
						<Form.Input 
							label='Deskripsi Kiriman *'
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
							<label>Berat *</label>
							<Input 
								label={{ basic: true, content: 'gram' }}
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
						<Form.Field error={!!errors.valuegoods}>
							<Form.Input 
								label='Nilai barang'
								name='valuegoods'
								id='valuegoods'
								type='text'
								autoComplete="off"
								placeholder="Masukan nilai barang"
								value={data.valuegoodsView}
								onChange={this.onChangeMoney}
							/>
							{ errors.valuegoods && <InlineError text={errors.valuegoods} /> }
						</Form.Field>
						<Form.Field error={!!errors.itemtypeid}>
							<label>Jenis Kiriman *</label>
							<Select 
								disabled={data.disabled}
								placeholder='Pilih jenis kiriman' 
								value={data.itemtypeid}
								onChange={this.handleChange}
								options={options} />
							{ errors.itemtypeid && <InlineError text={errors.itemtypeid} /> }	
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