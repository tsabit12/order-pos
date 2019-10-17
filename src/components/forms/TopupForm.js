import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { Step, Icon, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import ChoosePo from "../topup/ChoosePo";
import BsuTopup from "../topup/BsuTopup";
import Summary from "../topup/Summary";
import { getPurchase, getPoByid, addTopup } from "../../actions/purchase";
import { setProgressBar } from "../../actions/progress";

class TopupForm extends React.Component {
	state = {
		active: {
			po: true,
			bsu: false,
			summary: false
		},
		idpo: ''
	}

	componentWillMount(){
		this.props.setProgressBar(true);
		const data = {
			level: this.props.user.level,
			userid: this.props.user.userid
		};
		this.props.getPurchase(data).then(() => this.props.setProgressBar(false));
	}

	submitPo = (data) => 
		this.props.getPoByid(data)
			.then(() => this.setState({ 
					active: {...this.state.active, po: false, bsu: true },
					idpo: data.id_po
				})
			)

	submitBsu = (data) => this.props.addTopup(data).then(() => 
		this.setState({ 
			active: { ...this.state.active, bsu: false, summary: true }
		}) 
	)

	render(){
		const { active } = this.state;
		return(
			<Navbar>
				<Grid>
					<Grid.Column mobile={16} tablet={16} computer={5}>
						<Step.Group vertical fluid>
						    <Step active={active.po} completed={active.bsu}>
						      <Icon name='search' />
						      <Step.Content>
						        <Step.Title>Nomor PO</Step.Title>
						        <Step.Description>Pilih nomor purchase order</Step.Description>
						      </Step.Content>
						    </Step>

						    <Step active={active.bsu} completed={active.summary}>
						      <Icon name='payment' />
						      <Step.Content>
						        <Step.Title>Bsu</Step.Title>
						        <Step.Description>Enter jumlah besar uang topup</Step.Description>
						      </Step.Content>
						    </Step>

						    <Step active={active.summary}>
						      <Icon name='info' />
						      <Step.Content>
						        <Step.Title>Summary</Step.Title>
						      </Step.Content>
						    </Step>
						</Step.Group>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={8} computer={11}>
					  	{ active.po && <ChoosePo submit={this.submitPo} /> }
					  	{ active.bsu && <BsuTopup idpo={this.state.idpo} submit={this.submitBsu} />}
					  	{ active.summary && <Summary idpo={this.state.idpo} />}
					</Grid.Column>
				</Grid>
			</Navbar>
		);
	}
}

TopupForm.propTypes = {
	getPurchase: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	addTopup: PropTypes.func.isRequired,
	getPoByid: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.user
	}
}

export default connect(mapStateToProps, { getPurchase, getPoByid, addTopup, setProgressBar })(TopupForm);