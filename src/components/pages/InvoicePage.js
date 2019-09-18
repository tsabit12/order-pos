import React from "react";
import PropTypes from "prop-types";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import { Segment, Header, Icon, Divider, Input, Grid, Dimmer, Loader } from "semantic-ui-react";
import ListInvoice from "../list/ListInvoice";
import { getPurchase } from "../../actions/purchase";
import axios from "axios";

class InvoicePage extends React.Component {
	state = {
		idpo: '',
		loading: false
	}

	componentDidMount(){
		this.props.getPurchase();
	}

	cetakPo = (id) => {
		this.setState({ loading: true });
		axios.post(`${process.env.REACT_APP_API}/purchaseOrder/cetakInvoice`, {idpo: id})
			.then(() => this.setState({ loading: false }));	
	}

	onChange = (e) => this.setState({ idpo: e.target.value });

	render(){
		const { loading } = this.state;
		return(
			<Navbar>
				<Segment.Group raised>
				    <Segment>
					    <Header as='h2'>
						    <Icon name='paste' />
						    <Header.Content>Halaman Invoice</Header.Content>
						</Header>
						<Divider clearing />
						<Dimmer inverted active={loading}>
					        <Loader size='medium'>Loading</Loader>
					    </Dimmer>
						<Grid>
							<Grid.Column floated='right' computer={5} tablet={10} mobile={16}>
						      <Input
						      	name='idpo'
						      	id='idpo'
						      	value={this.state.idpo}
						      	onChange={this.onChange}
						      	fluid 
						      	loading 
						      	placeholder='Cari nomor purchase order...' />
						    </Grid.Column>
						</Grid>
						<ListInvoice listdata={this.props.dataPo} cetak={this.cetakPo} />
					</Segment>
				</Segment.Group>
			</Navbar>
		);
	}
}

InvoicePage.propTypes = {
	getPurchase: PropTypes.func.isRequired,
	dataPo: PropTypes.array.isRequired
}

function mapStateProps(state) {
	return{
		dataPo: state.purchase.filter(list => list.fee_realtrans > 0 )
	}
}

export default connect(mapStateProps, { getPurchase })(InvoicePage);