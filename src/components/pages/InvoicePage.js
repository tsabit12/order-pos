import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InvoiceForm from "../forms/InvoiceForm";
import { connect } from "react-redux";
import api from "../../api";

class InvoicePage extends React.Component {
	state = {
		success: false,
		noinvoice: ''
	}
	
	onSubmit = (data) => api.invoice.cetak(data).then(res => {
		this.cetak(res.data.invoice);
		this.setState({ success: true,  noinvoice: res.data.invoice });
	})

	cetak = (noinvoice) => 
		api.invoice.download(noinvoice).then(res => {
			let blob = new Blob([res.data], { type: 'application/pdf' }),
		  	url = window.URL.createObjectURL(blob)
		  	window.open(url) 
		})

	handleSuccess = () => this.setState({ success: false });

	render(){
		const { success } = this.state;
		return(
			<Navbar>
				{ success && <div className="ui icon message">
					  <i aria-hidden="true" className="check icon"></i>
					  <div className="content">
					    <div className="header">Invoice berhasil dicetak!</div>
					    <p>Hasil pdf tidak muncul? Klik <Link to="/invoice" onClick={() => this.cetak(this.state.noinvoice)}>disini</Link> untuk cetak ulang</p>
					  </div>
					</div> }
				<InvoiceForm 
					datakantor={this.props.listkantor} 
					submit={this.onSubmit} 
					remove={this.handleSuccess} 
					nopend={this.props.nopend}
				/>
			</Navbar>
		);
	}
}

InvoicePage.propTypes = {
	nopend: PropTypes.string.isRequired
}

function mapStateProps(state) {
	return {
		nopend: state.user.nopend
	}
}

export default connect(mapStateProps,  null)(InvoicePage);