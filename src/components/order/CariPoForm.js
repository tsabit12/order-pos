import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import api from "../../api";

class CariPoForm extends React.Component {
	state = {
		nomorPo: this.props.nomorPo,
		line: this.props.line,
		step: 1,
		loading: false,
		errors: {},
		options: this.props.optionsLine
	}

	UNSAFE_componentWillReceiveProps(nextprops){
		if (nextprops.errors) {
			this.setState({ errors: nextprops.errors, loading: nextprops.loading });
		}
	}

	escapeRegExp = (string) => {
		return string.replace(/[~`_/*+?^${}<>()'"|[\]\\]/g, '');
	}

	onChange = (e) => {
		const val = this.escapeRegExp(e.target.value);
		const options = [{key: 0, value: 0, text: 'Loading...'}]
		clearTimeout(this.timer);
		this.setState({ options, nomorPo: val, line: null })
		this.timer = setTimeout(this.fetchLine, 1000);	
	}

	fetchLine = () => {
		this.setState({ line: 0 });
		api.po.getLine(this.state.nomorPo)
			.then(res => {
				const options = [{key: 'oke', value: 'oke', text: 'Pilih line'}];
				res.forEach(x => {
					options.push({
						key: x.line,
						value: x.line,
						text: `Line ke ${x.line} - ${x.keterangan}`
					});
				});
				this.setState({ options, line: 'oke' });
			})
			.catch(() => {
				const options = [{key: 'err', value: 'err', text: 'Line not found'}]
				this.setState({ options, line: 'err' })
			})
	}

	submit = () => {
		const errors = this.validate(this.state.nomorPo, this.state.line);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			const data = {
				step: this.state.step,
				nomorPo: this.state.nomorPo,
				user: this.props.user,
				line: this.state.line,
				optionsLine: this.state.options
			};
			this.props.submitPO(data);
		}
	} 

	validate = (no, line) => {
		const errors = {};
		if (!no) errors.nomorPo = "Harap isi nomor purchase order";
		if (!line) errors.line = "Line po belum dipilih";
		if (line !== null) {
			if (line === 'oke') errors.line = "Line po belum dipilih";
			if (line === 'err') errors.line = "Line po belum dipilih"; 
		}
		return errors;
	}

	handleChange = (e, { value }) => this.setState({ line: value })
	
	render(){
		const { errors, loading } = this.state;
		
		return(
			<React.Fragment>
				<Form loading={loading} onSubmit={this.submit} >
					{ errors.global && <Message negative>
						<Message.Header>Oppps!</Message.Header>
						<p>{errors.global}</p>
					</Message> }
					<Form.Group widths="equal">
						<Form.Field error={!!errors.nomorPo}>
							<Form.Input 
								type="text"
								name="nomorPo"
								id="nomorPo"
								label="Nomor PO"
								placeholder="Masukan nomor PO"
								autoComplete="off"
								onChange={this.onChange}
								value={this.state.nomorPo}
							/>
							{ errors.nomorPo && <span style={{color: "#ae5856"}}>{errors.nomorPo}</span>}
						</Form.Field>
						<Form.Field error={!!errors.line}>
							<label>Line PO</label>
							<Dropdown 
				      			placeholder="Masukan nomor PO terlebih dahulu"
				      			fluid 
				      			selection
				      			value={this.state.line}
				      			options={this.state.options}
				      			onChange={this.handleChange}
				      		/>
				      		{ errors.line && <span style={{color: "#ae5856"}}>{errors.line}</span>}
						</Form.Field>
					</Form.Group>
				</Form>
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
	loading: PropTypes.bool.isRequired,
	optionsLine: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.user.userid
	}
}

export default connect(mapStateToProps, null)(CariPoForm);