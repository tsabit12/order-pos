import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";

const recaptchaRef = React.createRef();

class BsuTopup extends React.Component { 
	state = {
		item: [
			'Saldo yang tersisa '+ this.props.detailPO.bsu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
			'Total order pengiriman '+ this.props.detailPO.fee_akhir.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
			'Persentase '+ Math.round(this.props.detailPO.persentase)+'%'
		],
		data: {
			jumlah: '',
			hasil: '',
			id_po: this.props.idpo,
			userid: this.props.userid
		},
		changed: false,
		errors: {},
		loading: false,
		captcha: false
	}

	onChange = (e) => this.setState({ 
		data: {
			...this.state.data, [e.target.name]: e.target.value, 
			hasil: Number(this.props.detailPO.bsu) + Number(e.target.value)
		},
		changed: true
	})

	numberWithCommas = (number) => {
    	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	onSubmit = () => {
		const errors = this.validate(this.state.data.jumlah);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			if (!this.state.captcha) {
				alert("Mohon konfirmasi bahwa anda bukan robot");
			}else{
				this.setState({ loading: true });
				this.props.submit(this.state.data)
					.catch(err => this.setState({ errors: err.response.data.errors, loading: false, changed: false }));
			}
		}
	}

	validate = (jum) => {
		const errors = {};
		if (!jum) errors.jumlah = "Jumlah bsu topup tidak boleh kosong";
		if (jum !== '') {
			if (jum < 20000) {
				errors.jumlah = "Minimum top up Rp 20.000";
			}else if (jum > 10000000) {
				errors.jumlah = "Maksimum top up Rp 10.000.000";
			}
		}

		return errors;
	}

	handleChange = () => this.setState({ captcha: true });

	render(){
		const { data, changed, errors, loading } = this.state;
		const { idpo } = this.props;

		return(
			<React.Fragment>
				<Message header={'Info Purchase Order ' + idpo} list={this.state.item} />
				<Form onSubmit={this.onSubmit} loading={loading}>
					{ errors.global && <Message
							negative
					    	icon='times'
					    	header='Terdapat kesalahan'
					    	content={errors.global}
					  	/> }
					<Form.Input 
						label="Jumlah BSU"
						placeholder="Masukan jumlah bsu topup"
						type="number"
						id="jumlah"
						name="jumlah"
						value={data.jumlah}
						onChange={this.onChange}
						autoComplete="off"
						error={errors.jumlah}
					/>

					<ReCAPTCHA
			        	style={{paddingBottom: '12px'}}
				    	sitekey={process.env.REACT_APP_SITEKEY}
				    	ref={recaptchaRef}
				    	onChange={this.handleChange}
				 	/>

					<Button color='red' fluid>Topup</Button>
					{ changed && <Message info>
			    		<Message.Content>
			    			Jumlah saldo setelah topup adalah =  {this.numberWithCommas(data.hasil)}
			    		</Message.Content>
			    	</Message> }
				</Form>
			</React.Fragment>
		);
	}
}

BsuTopup.propTypes = {
	idpo: PropTypes.string.isRequired,
	detailPO: PropTypes.object.isRequired,
	submit: PropTypes.func.isRequired,
	userid: PropTypes.string.isRequired
}

function mapStateToProps(state, props) {
	if (props.idpo) {
		return{
			userid: state.user.userid,
			detailPO: state.purchase.find(list => list.id_po === props.idpo)
		}
	}else{
		return { detailPO: null }
	}
}

export default connect(mapStateToProps, null)(BsuTopup);