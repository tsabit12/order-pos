import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button, Select } from "semantic-ui-react";
import InlineError from "../InlineError";

class ChoosePo extends React.Component {
	state = {
		idpo: '',
		errors: {},
		loading: false
	}

	onChange = (e, {value}) => this.setState({ idpo: value })

	onSubmit = () => {
		const errors = this.validate(this.state.idpo);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			const data = {
				id_po: this.state.idpo,
				userid: this.props.userid
			}
			this.props.submit(data).then(() => this.setState({ loading: false }))
		}
	}

	validate = (id) => {
		const errors = {};
		if (!id) errors.idpo = "Belum dipilih";
		return errors;
	}

	render(){
		const { listPo } = this.props;
		const { errors, loading } = this.state;

		return(
			<Form onSubmit={this.onSubmit} loading={loading}>
				<Form.Field error={!!errors.idpo}>
					<label>Nomor Purchase Order</label>
					<Select 
						name="idpo"
						id="idpo"
						placeholder='Pilih nomor purchase order' 
						options={listPo.map(list => ({
								key: list.id_po,
								value: list.id_po,
								text: list.id_po +' - '+list.keterangan
							}))
						}
						onChange={this.onChange}
					/>
					{ errors.idpo && <InlineError text={errors.idpo} /> }
				</Form.Field>
				<Button primary>Selanjutnya</Button>
			</Form>
		);
	}
}
ChoosePo.propTypes = {
	listPo: PropTypes.array.isRequired,
	userid: PropTypes.string.isRequired,
	submit: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		listPo: state.purchase,
		userid: state.user.userid
	}
}

export default connect(mapStateToProps,  null)(ChoosePo);