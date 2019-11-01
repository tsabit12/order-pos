import React from "react";
import PropTypes from "prop-types";
import Navbar from "../menu/Navbar";
import { Form, Table, Button } from "semantic-ui-react";
import { getInvoice, clearInvoice } from "../../actions/purchase";
import { setProgressBar } from "../../actions/progress";
import { connect } from "react-redux";
import ListInvoice from "../list/ListInvoice";
import api from "../../api";
import { DateInput } from "semantic-ui-calendar-react";

const getCurdate = () => {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;
	return today;
}

class ListInvoicePage extends React.Component {
	state = {
		loading: false,
		errors: {},
		tanggal: getCurdate()
	}

	componentDidMount(){
		const values = {
			tanggal: this.state.tanggal
		}

		this.props.setProgressBar(true);
		this.props.getInvoice(values)
			.then(() => {
				this.props.setProgressBar(false);
				this.setState({ errors: {} });
			}).catch(err => {
				this.props.setProgressBar(false);
				this.props.clearInvoice();
			});
	}

	onChange = (e, { value }) => this.setState({ tanggal: value })

	onSubmit = () => {
		const errors = this.validate(this.state.tanggal);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.props.setProgressBar(true);
			const values = {
				tanggal: this.state.tanggal
			};
			this.props.getInvoice(values)
				.then(() => this.props.setProgressBar(false))
				.catch(() => {
					this.props.clearInvoice();
					this.props.setProgressBar(false);
				})
		}
	}

	validate = (tanggal) => {
		const errors = {};
		if (!tanggal) errors.tanggal = "Tanggal generate harap diisi";
		return errors;
	}

	cetak = (noinvoice) => {
		this.props.setProgressBar(true);
		api.invoice.download(noinvoice).then(res => {
			this.props.setProgressBar(false);
			let blob = new Blob([res.data], { type: 'application/pdf' }),
		  	url = window.URL.createObjectURL(blob)
		  	window.open(url) 
		})
	}	

	downloadDetail = (noinvoice) => {
		this.props.setProgressBar(true);
		api.invoice.downloadDetail(noinvoice).then(res => {
			console.log(res);
			this.props.setProgressBar(false);
			let blob = new Blob([res.data], { type: 'application/pdf' }),
		  	url = window.URL.createObjectURL(blob)
		  	window.open(url) 
		})
	}

	render(){
		const { errors } = this.state;
		const { dataInvoice } = this.props;
		return(
			<Navbar>
				<Form onSubmit={this.onSubmit}>
					<div style={{display: 'flex'}}>
						<Form.Field onSubmit={this.onSubmit} style={{width: '100%'}}>
							<label>Tanggal Cetak</label>
							<DateInput
						      name="date"
					          placeholder="Date"
					          value={this.state.tanggal}
					          iconPosition="left"
					          onChange={this.onChange}
					          closeOnMouseLeave={false}
					          autoComplete="off"
					          error={!!errors.tanggal}
					          dateFormat="YYYY-MM-DD"
					          closable={true}
					          style={{width: '101%'}}
					        />
					        { errors.tanggal && <span style={{ color: "#ae5856", position: 'absolute', marginTop: '-13px'}}>{errors.tanggal}</span>}
				        </Form.Field>
				        <Button secondary style={{height: '38px', marginTop: '23px', borderRadius: '0', zIndex: '1'}}>Cari</Button>
			        </div>
				</Form>
				<Table celled structured style={{marginTop: '1px'}}>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>Nomor Invoice</Table.HeaderCell>
				        <Table.HeaderCell>Nama Kantor</Table.HeaderCell>
				        <Table.HeaderCell>Uraian</Table.HeaderCell>
				        <Table.HeaderCell>Kuantiti</Table.HeaderCell>
				        <Table.HeaderCell>Bsu</Table.HeaderCell>
				        <Table.HeaderCell style={{ textAlign: 'center'}}>ACTION</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>
				   	<Table.Body>
				   		{ dataInvoice.length === 0 ? <Table.Row>
					      	<Table.Cell colSpan='6'>Data tidak ditemukan</Table.Cell>
					    </Table.Row> : <ListInvoice 
					    	listdata={dataInvoice} 
					    	cetak={this.cetak} 
					    	downloadDetail={this.downloadDetail}
					    /> }
				   	</Table.Body>
				</Table>
			</Navbar>
		);
	}
}

ListInvoicePage.propTypes = {
	getInvoice: PropTypes.func.isRequired,
	setProgressBar: PropTypes.func.isRequired,
	dataInvoice: PropTypes.array.isRequired,
	clearInvoice: PropTypes.func.isRequired
}

function mapStateProps(state) {
	return{
		dataInvoice: state.invoice
	}
}

export default connect(mapStateProps, { getInvoice, setProgressBar, clearInvoice })(ListInvoicePage);