import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Segment, Header, Divider, Icon } from "semantic-ui-react";
import InvoiceForm from "../forms/InvoiceForm";
import { connect } from "react-redux";
import { getKantor } from "../../actions/order";
import { setProgressBar } from "../../actions/progress";
import api from "../../api";

class InvoicePage extends React.Component {
	state = {
		success: false,
		noinvoice: ''
	}

	componentDidMount(){
		this.props.setProgressBar(true);
		this.props.getKantor().then(() => this.props.setProgressBar(false));
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
				<Segment.Group raised>
				    <Segment>
					    <Header as='h2'>
						    <Icon name='paste' />
						    <Header.Content>Cetak Invoice</Header.Content>
						</Header>
						<Divider clearing />
						{ success && <div className="ui icon message">
							  <i aria-hidden="true" className="check icon"></i>
							  <div className="content">
							    <div className="header">Invoice berhasil dicetak!</div>
							    <p>Hasil pdf tidak muncul? Klik <Link to="/invoice" onClick={() => this.cetak(this.state.noinvoice)}>disini</Link> untuk cetak ulang</p>
							  </div>
							</div> }
						<InvoiceForm datakantor={this.props.listkantor} submit={this.onSubmit} remove={this.handleSuccess} />
					</Segment>
				</Segment.Group>
			</Navbar>
		);
	}
}

InvoicePage.propTypes = {
	listkantor: PropTypes.array.isRequired
}

function mapStateProps(state) {
	return {
		listkantor: state.order.kantor
	}
}

export default connect(mapStateProps, { getKantor, setProgressBar } )(InvoicePage);