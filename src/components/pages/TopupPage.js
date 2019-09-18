import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message, Form, Button, Grid } from "semantic-ui-react";
import Navbar from "../menu/Navbar";
import { getPoByid, addTopup } from "../../actions/purchase";

class TopupPage extends React.Component{
	state = {
		errors: {},
		success: false,
		items: [],
		data: {
			jumlah: '',
			hasil: '',
			id_po: '',
			userid: ''
		},
		changed: false,
		jmlAwal: '',
		loading: false

	}

	componentDidMount(){
		if (!this.props.allPurchase) {
			this.props.history.push("/dashboard");
		}else{
			const userid 	= this.props.userid;
			const id 		= this.props.match.params.id;
			const data 		= {id_po: id, userid: userid};

			this.props.getPoByid(data)
				.then(() => this.setState({ success: true }))
				.catch(err => this.setState({ errors: err.response.data.errors, success: false }));
		}
	}

	componentWillReceiveProps(nexProps){
		if (nexProps.allPurchase) {
			const items = [];
			const bsu 	= 'Saldo yang tersisa '+ this.numberWithCommas(nexProps.allPurchase.bsu);
			const used 	= 'Total order pengiriman '+ this.numberWithCommas(nexProps.allPurchase.fee_akhir);
			const persentase = 'Persentase '+ Math.round(nexProps.allPurchase.persentase)+'%';
			items.push(used, bsu, persentase);
			this.setState({ 
				items, 
				jmlAwal: nexProps.allPurchase.bsu,
				data: { ...this.state.data, id_po: nexProps.allPurchase.id_po, userid: nexProps.allPurchase.userid }
			});
		}
	}

	numberWithCommas = (number) => {
    	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	onChange = (e) => {
		this.setState({ 
			data: { 
				...this.state.data, [e.target.name]: e.target.value, 
				hasil: Number(this.state.jmlAwal) + Number(e.target.value) },
			changed: true
		});
	}

	onSubmit = (e) => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.addTopup(this.state.data)
				.then(() => this.props.history.push("/dashboard"))
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.jumlah) errors.jumlah = "Harap isi jumlah bsu topup";
		return errors;
	}

	render(){
		const { id } = this.props.match.params;
		const { errors, success, items, data, changed, loading } = this.state;
		return(
			<Navbar>
				<Grid>
					{ errors.global && <Grid.Column mobile={16} tablet={16} computer={10} style={{margin: "auto"}}>
						<Message
							negative
					    	icon='times'
					    	header='Terdapat kesalahan'
					    	content={errors.global}
					  	/>
					</Grid.Column> }

					{ success && <React.Fragment>
						<Grid.Column mobile={16} tablet={16} computer={12}>
							<Message
						      attached
						      header={'Nomor PO yang dipilih adalah '+id}
						      content='Silahkan lengkapi kolom-kolom dibawah untuk melakukan top up'
						    />
						    <Form className='attached fluid segment' onSubmit={this.onSubmit} loading={loading}>
						    	{ changed && <Message info>
						    		<Message.Content>
						    			Jumlah saldo setelah topup adalah =  {this.numberWithCommas(data.hasil)}
						    		</Message.Content>
						    	</Message> }
						        <Form.Input
						          fluid
						          name="jumlah"
						          id="jumlah"
						          label='Jumlah Topup'
						          placeholder='Masukan jumlah besar uang'
						          type='number'
						          value={data.jumlah}
						          onChange={this.onChange}
						          autoComplete="off"
						          error={errors.jumlah}
						        />
						      <Button color='blue'>Submit</Button>
						    </Form>
					    </Grid.Column>
					    <Grid.Column mobile={16} tablet={16} computer={4}>
					    	<Message>
							    <Message.Header>Info purchase order</Message.Header>
							    <Message.List items={items} />
							</Message>
					    </Grid.Column>
					  </React.Fragment> }
			    </Grid>
			</Navbar>
		);
	}
}

TopupPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	getPoByid: PropTypes.func.isRequired,
	userid: PropTypes.string.isRequired,
	addTopup: PropTypes.func.isRequired
}

function mapStateProps(state, props) {
	if (state.purchase.length > 0) {
		return{
			userid: state.user.userid,
			allPurchase: state.purchase.find(list => list.id_po === props.match.params.id)
		}
	}else{
		return { 
			userid: state.user.userid, 
			allPurchase: null
		}
	}
	
}

export default  connect(mapStateProps, { getPoByid, addTopup })(TopupPage);