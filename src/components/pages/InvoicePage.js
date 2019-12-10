import React from "react";
import Navbar from "../menu/Navbar";
import { Form, Button, Message, Table, Segment, Dimmer, Loader } from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import InlineError from "../InlineError";
import api from "../../api";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ListGenerate = ({ list, generate, nopo }) => {
	var no 			= 1;
	const totalAll 	= list.reduce((a, b) => +a + +b.total, 0);
	const jumlahAll = list.reduce((a, b) => +a + +b.jumlah, 0);
	return(
		<React.Fragment>
			<Message>
			    <Message.Header>Data Generate Ditemukan</Message.Header>
			    <Message.List>
			      <Message.Item>Data generate berdasarkan nomor pickup</Message.Item>
			      <Message.Item>Pastikan bahwa data yang akan digenerate sudah valid</Message.Item>
			      <Message.Item>Data yang sudah digenerate tidak bisa digenerate kembali</Message.Item>
			      <Message.Item>Klik tombol generate di paling bawah</Message.Item>
			    </Message.List>
			</Message>
			<Table striped>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>No</Table.HeaderCell>
			        <Table.HeaderCell>Nomor Pickup</Table.HeaderCell>
			        <Table.HeaderCell>Tanggal Assign</Table.HeaderCell>
			        <Table.HeaderCell style={{textAlign: 'right'}}>Jumlah Item</Table.HeaderCell>
			        <Table.HeaderCell style={{textAlign: 'right'}}>Total</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>
			    <Table.Body>
			    	{ list.map(x => <Table.Row key={x.no_pickup}>
			    		<Table.Cell>{no++}</Table.Cell>
			    		<Table.Cell>{x.no_pickup}</Table.Cell>
			    		<Table.Cell>{x.tgl_generate}</Table.Cell>	
			    		<Table.Cell style={{textAlign: 'right'}}>{x.jumlah}</Table.Cell>	
			    		<Table.Cell style={{textAlign: 'right'}}>{numberWithCommas(x.total)}</Table.Cell>	
			    	</Table.Row>)}
			    	<Table.Row>
			    		<Table.Cell colSpan='4' style={{textAlign: 'right'}}>{jumlahAll}</Table.Cell>
			    		<Table.Cell colSpan='4' style={{textAlign: 'right'}}>{numberWithCommas(totalAll)}</Table.Cell>
			    	</Table.Row>
			    </Table.Body>
			</Table>
			<Button color='red' fluid size='small' onClick={() => generate(nopo)}>Generate Nomor Invoice</Button>
		</React.Fragment>
	);
}

class InvoicePage extends React.Component{
	state = {
		data: {
			datesRange: '',
			nopo: ''
		},
		errors: {},
		loading: false,
		response: [],
		loading2: false,
		nopoReal: '',
		noInvoice: null
	}

	convertDate = (data) => {
		const val = data.datesRange.split("-");
		const noSpace = val[0].replace(/ /g, '');
		const noSpace2 = val[1].replace(/ /g, '');
		const tglAwal = noSpace.replace(/[/+'"?^]/g, '-');
		const tglAkhir = noSpace2.replace(/[/+'"?^]/g, '-');
		return {
			tglAwal: tglAwal,
			tglAkhir: tglAkhir,
			nopo: data.nopo
		}
	}

	onChangePo = (e) => this.setState({ data: { ...this.state.data, nopo: e.target.value }})

	handleChangeDate = (e, { name, value }) => this.setState({ data: { ...this.state.data, datesRange: value }}) 

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors, response: [], noInvoice: '' });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			const payload = this.convertDate(this.state.data);
			const { nopo } = this.state.data;
			api.invoice.getGenerate(payload)
				.then(res => this.setState({ loading: false, errors: {}, response: res, nopoReal: nopo }))
				.catch(err => this.setState({ loading: false, errors: err.response.data.errors }));
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
		if (data.nopo !== '') {
			if (data.nopo.length > 10) errors.nopo = "Nomor purchase order max length 10";
		}
		return errors;
	}

	onGenerate = (nopo) => {
		const { response } = this.state;
		const payload = [];
		response.forEach(x => {
			payload.push(x.no_pickup);
		});
		
		if (payload.length > 0) {
			const { userid } = this.props;
			this.setState({ loading2: true });
			api.invoice.generate(payload, nopo, userid)
				.then(noInvoice => {
					this.setState({ 
						loading2: false, 
						errors: {}, 
						noInvoice: noInvoice,
						response: []
					});
					this.download(noInvoice);
				}).catch(err => this.setState({ loading2: false, errors: err.response.data.errors }))
		}
	} 

	download = (noInvoice) => {
		api.invoice.download(noInvoice)
			.then(res => {
				let blob = new Blob([res], { type: 'application/pdf' }),
			  	url = window.URL.createObjectURL(blob);
			  	window.open(url); 
			}).catch(err => alert(err));
	}
 
	render(){
		const { data, errors, loading, response, loading2, noInvoice } = this.state;
		return(
			<Navbar>
				<Segment vertical style={{marginTop: '-15px'}}>
					<Dimmer active={loading2} inverted>
				        <Loader indeterminate>Generating... Mohon tetap dihalaman ini sampai proses generate berhasil</Loader>
				    </Dimmer>
					{ errors.global && <Message negative>
						<Message.Header>Oppps!</Message.Header>
						<p>{errors.global}</p>
					</Message> }

					{ noInvoice && <Message>
						<Message.Header>Sukses!</Message.Header>
						<p>File pdf tidak muncul? klik <Link to="/invoice" onClick={this.download(noInvoice)}>disini </Link> 
						untuk download ulang. Harap pastikan bahwa add block sudah dimatikan dari browser anda</p>
					</Message> }
					<Form onSubmit={this.onSubmit} loading={loading}>
						<Form.Group widths='equal'>
							<Form.Field error={!!errors.datesRange}>
								<label>Periode</label>
								<DatesRangeInput
						          name="datesRange"
						          placeholder="Mulai - Sampai"
						          iconPosition="left"
						          closeOnMouseLeave={false}
						          closable={true}
						          value={data.datesRange}
						          onChange={this.handleChangeDate}
						          dateFormat="YYYY/MM/DD"
						          autoComplete="off"
						        />
						        { errors.datesRange && <InlineError text={errors.datesRange} /> }
							</Form.Field>
							<Form.Field error={!!errors.datesRange}>
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
						<Button primary fluid size='small'>Tampilkan</Button>
					</Form>
					{ response.length > 0 && Object.keys(errors).length === 0 &&
						<ListGenerate 
							list={response} 
							generate={this.onGenerate} 
							nopo={this.state.nopoReal}
						/> }
				</Segment>
			</Navbar>
		);
	}
}

InvoicePage.propTypes = {
	userid: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		userid: state.user.userid
	}
}

export default connect(mapStateToProps, null)(InvoicePage);