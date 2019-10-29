import React from "react";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import { getOrder } from "../../actions/laporan";
import PropTypes from "prop-types";
import { Grid, Button, Divider, Form, Message } from "semantic-ui-react";
import { DateInput } from 'semantic-ui-calendar-react';
import { setProgressBar } from "../../actions/progress";
import ListOrder from "../list/ListOrder";

class LaporanOrderPage extends React.Component{
	state = {
		show: false,
		tanggal: '',
		errors: {},
		tanggalPost: '' //we need this cause child component must only show when submit
	}

	handleChange = (e, { value }) => this.setState({ tanggal: value })

	submit = () => {
		const { userid } 	= this.props;
		const { tanggal } 	= this.state;
		const errors 		= this.validate(tanggal);
		this.setState({ errors });

		if (Object.keys(errors).length === 0) {
			this.setState({ show: true });
			this.props.setProgressBar(true);
			this.props.getOrder(tanggal, userid)
				.then(() => {
					this.props.setProgressBar(false);
					this.setState({ errors: {}, tanggalPost: tanggal });
				}).catch(err => {
					this.props.setProgressBar(false);
					this.setState({ errors: err.response.data.errors });
				})
		}
	}

	validate = (tanggal) => {
		const errors 	= {};
		const regEx 	= /^\d{4}-\d{2}-\d{2}$/;
		
		if (tanggal !== '' && !tanggal.match(regEx)) errors.tanggal = "Tanggal tidak valid";
		if (!tanggal) errors.tanggal = "Tanggal tidak boleh kosong";

		return errors;
	}

	render(){
		const { errors, tanggalPost } = this.state;
		
		return(
			<Navbar>
				<Grid>
					<Grid.Column width={8} floated='right'>
						<div style={{display: 'flex', justifyContent: 'flex-end'}}>
							<Form>
								<Form.Field error={!!errors.tanggal}>
									<DateInput
							          name="date"
							          placeholder="Masukan tanggal YYYY-MM-DD"
							          closeOnMouseLeave={false}
							          iconPosition="left"
							          value={this.state.tanggal}
							          onChange={this.handleChange}
							          closable={true}
							          dateFormat='YYYY-MM-DD'
							          style={{marginRight: '150px', width: '100%', paddingRight: '4px'}}
								    />
								    { errors.tanggal && <span style={{ color: "#ae5856", display: 'block', marginTop: '-12px'}}>{errors.tanggal}</span>}
								</Form.Field>
							</Form>
							<Button color='teal' onClick={this.submit} style={{height: 'fit-content'}}>Cari</Button>
						</div>
					</Grid.Column>
				</Grid>
				<Divider/>
				{ errors.global && <Message negative>
					<Message.Header>Oppps!</Message.Header>
					<p>{errors.global}</p>
				</Message> }

				<ListOrder tanggal={tanggalPost} />
			</Navbar>
		);
	}
}

LaporanOrderPage.propTypes = {
	userid: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		userid: state.user.userid
	}
}

export default connect(mapStateToProps, { getOrder, setProgressBar })(LaporanOrderPage);