import React from "react";
import Navbar from "../menu/Navbar";
import { Breadcrumb, Form, Divider, Input, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import api from "../../api";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddPetugasForm from "../forms/AddPetugasForm";
import { addPetugas } from "../../actions/petugas";

class AddPetugasPickupPage extends React.Component{
	state = {
		nippos: '',
		loading: false,
		errors: {},
		petugas: {}
	}

	escapeRegExp = (string) => {
	  return string.replace(/[~`/*+'"?^${}<>()|[\]\\]/g, '');
	}


	handleInputChange = (e) => {
		const value = this.escapeRegExp(e.target.value);
		this.setState({ nippos: value });
	} 

	handleClick = () => {
		const { nopend } = this.props.user; 
		const errors = this.validate(this.state.nippos);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			api.petugas.cariPetugas(this.state.nippos, nopend)
				.then(res => this.setState({ loading: false, petugas: res, errors: {} }))
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false, petugas: {} }))
		}
	}

	validate = (nippos) => {
		const errors = {};
		if (!nippos) errors.nippos = "Nippos harap diisi";
		return errors;
	}

	submit = (data) => this.props.addPetugas(data).then(() => this.props.history.push("/pickup/petugas"))


	render(){
		const { errors, petugas } = this.state;
		return(
			<Navbar>
				<Breadcrumb>
				    <Breadcrumb.Section link>Pickup</Breadcrumb.Section>
				    <Breadcrumb.Divider />
				    <Breadcrumb.Section as={Link} to="/pickup/petugas">Petugas</Breadcrumb.Section>
				    <Breadcrumb.Divider />
				    <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
				</Breadcrumb>
				<Divider />
				{ errors.global && <Message negative>
						<Message.Header>Oppps!</Message.Header>
						<p>{errors.global}</p>
				</Message> }
				<Form>
					<Form.Field error={!!errors.nippos}>
						<Input 
							label='Nippos'
			    			action={{
					        	icon: 'search', 
					        	color: 'red',
					        	onClick: () => this.handleClick(),
					        	loading: this.state.loading
					    	}} 
					    	value={this.state.nippos}
							onChange={this.handleInputChange}
							placeholder='Masukan Nippos Petugas'
							autoComplete='off'
						/>
						{ errors.nippos && <span style={{ color: "#ae5856"}}>{errors.nippos}</span>}
					</Form.Field>
				</Form>
				<br/>
				{ Object.keys(petugas).length > 0 && <AddPetugasForm petugas={petugas} submit={this.submit} /> }
			</Navbar>
		);
	}
}

AddPetugasPickupPage.propTypes = {
	user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.user
	}
}

export default connect(mapStateToProps, { addPetugas })(AddPetugasPickupPage);