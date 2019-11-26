import React from "react";
import PropTypes from "prop-types";
import { Form, Segment, Divider, Message, Button } from "semantic-ui-react";

const numberWithCommasState = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class EntriPickupForm extends React.Component{
	state = {
		data: {},
		biayaView: '',
		biaya: '',
		loading: false,
		errors: {}
	}

	componentDidMount(){
		const { detail } = this.props;
		this.setState({
			data: detail,
			biayaView: detail.biaya_pickup === null ? '' : numberWithCommasState(detail.biaya_pickup),
			biaya: detail.biaya_pickup,
			loading: false,
			errors: {}
		})
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		if (nextProps.detail) {
			const { detail } = nextProps;
			this.setState({
				data: detail,
				biayaView: detail.biaya_pickup === null ? '' : numberWithCommasState(detail.biaya_pickup),
				biaya: detail.biaya_pickup,
				loading: false,
				errors: {}
			})
		}
	}

	numberWithCommas = (number) => {
    	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	onSubmit = () => {
		const errors = this.validate(this.state.biaya);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			const data = {
				biaya_pickup: this.state.biaya,
				no_barcode: this.state.data.no_barcode
			}

			this.props.submit(data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
		}
	}

	validate = (biaya) => {
		const errors = {};
		if (!biaya) errors.biaya = "Biaya pickup masih kosong";
		if (biaya) {
			if (biaya < 10) errors.biaya = "Biaya pickup terlalu kecil";
		}
		return errors;
	}

	onChange = (e) => {
		var val = e.target.value.replace(/\D/g, '');
		var x = Number(val);
		const value = this.numberWithCommas(x);
		this.setState({ biayaView: value, biaya: val });
	} 

	render(){
		const { data, errors, loading } = this.state;
		
		return(
			<React.Fragment>
				{ errors.global && 
				<Message negative>
				    <Message.Header>Oppsss</Message.Header>
				    <p>{errors.global}</p>
				</Message> }
				<Segment>
					{ data.biaya_pickup !== null && 
						<Message warning>
						    <Message.Header>Notifikasi</Message.Header>
						    <p>Kami mendeteksi bahwa biaya pickup dengan external id = {data.no_barcode} sudah dientri</p>
						</Message> }
					{ Object.keys(data).length > 0 && <Form onSubmit={this.onSubmit} loading={loading}>
						<Form.Group widths='equal'>
							<Form.Input 
								label='Nomor Resi'
								type='text'
								name='no_resi'
								value={data.no_resi}
								readOnly={true}
							/>
							<Form.Input 
								label='Lokasi Antar'
								type='text'
								name='lokasi_antaran'
								value={data.lokasi_antaran}
								readOnly={true}
							/>
							<Form.Input 
								label='Beadasar'
								type='text'
								name='beadasar'
								value={this.numberWithCommas(data.beadasar)}
								readOnly={true}
							/>
						</Form.Group>
						<Divider />
						<Form.Group widths='equal'>
							<Form.Input 
								label='PPN'
								type='text'
								name='ppn'
								value={this.numberWithCommas(data.ppn)}
								readOnly={true}
							/>
							<Form.Input 
								label='HTNB'
								type='text'
								name='htnb'
								value={this.numberWithCommas(data.htnb)}
								readOnly={true}
							/>
							<Form.Input 
								label='PPN HTNB'
								type='text'
								name='ppn_htnb'
								value={this.numberWithCommas(data.ppn_htnb)}
								readOnly={true}
							/>
							<Form.Input 
								label='Bea Lain'
								type='text'
								name='bea_lain'
								value={this.numberWithCommas(data.bea_lain)}
								readOnly={true}
							/>
							<Form.Input 
								label='Total Bea'
								type='text'
								name='total_bea'
								value={this.numberWithCommas(data.total_bea)}
								readOnly={true}
							/>
						</Form.Group>
						<Divider />
						<Form.Group widths='equal'>
							<Form.Field>
								<label style={{color: 'red'}}>*Biaya Pickup</label>
								<Form.Input
									type='text'
									name='biaya_pickup'
									placeholder='Masukan biaya pickup'
									onChange={this.onChange}
									value={this.state.biayaView}
									error={errors.biaya}
								/>
							</Form.Field>
						</Form.Group>
						<Button primary fluid>Tambah Biaya Pickup</Button>
					</Form> }
				</Segment>
			</React.Fragment>
		);
	}
}

EntriPickupForm.propTypes = {
	detail: PropTypes.object.isRequired,
	submit: PropTypes.func.isRequired
}

export default EntriPickupForm;