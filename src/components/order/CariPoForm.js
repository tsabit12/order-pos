import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";

class CariPoForm extends React.Component {
	state = {
		nomorPo: this.props.nomorPo,
		step: 1,
		loading: false,
		errors: {}
	}

	UNSAFE_componentWillReceiveProps(nextprops){
		if (nextprops.errors) {
			this.setState({ errors: nextprops.errors, loading: nextprops.loading });
		}
	}

	onChange = (e) => this.setState({ nomorPo: e.target.value })

	submit = () => {
		const errors = this.validate(this.state.nomorPo);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			const data = {
				step: this.state.step,
				nomorPo: this.state.nomorPo,
				user: this.props.user
			};
			this.props.submitPO(data);
		}
	} 

	validate = (no) => {
		const errors = {};
		if (!no) errors.nomorPo = "Harap isi nomor purchase order";
		return errors;
	}
	
	render(){
		const { errors, loading } = this.state;
		
		return(
			<React.Fragment>
				<Form loading={loading} onSubmit={this.submit} >
					{ errors.global && <Message negative>
						<Message.Header>Oppps!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
					<Form.Field>
						<Form.Input 
							type="text"
							name="nomorPo"
							id="nomorPo"
							label="Nomor PO"
							placeholder="Masukan nomor PO"
							autoComplete="off"
							onChange={this.onChange}
							value={this.state.nomorPo}
							error={errors.nomorPo}
						/>
					</Form.Field>
				</Form>
				<br/>
				<Button.Group fluid>
					<Button secondary onClick={this.submit}>Selanjutnya</Button>
				</Button.Group>
			</React.Fragment>
		);
	}
}

CariPoForm.propTypes = {
	submitPO: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.user.userid
	}
}

export default connect(mapStateToProps, null)(CariPoForm);