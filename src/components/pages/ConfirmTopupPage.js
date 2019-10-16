import React from "react";
import PropTypes from "prop-types";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import { getDataTopup, submitTopup } from "../../actions/notifikasi"; 
import { setProgressBar } from "../../actions/progress";
import { Grid, Card, Button, Message, Divider, Modal, Dimmer, Loader } from "semantic-ui-react";
import PageNotFound from "./PageNotFound";

class ConfirmTopupPage extends React.Component {
	state = {
		success: false,
		loading: true,
		open: false,
		data: {
			idpo: '',
			nomor: '',
			bsu: ''
		},
		loadingModal: false,
		error: {}
	}

	componentDidMount(){
		
		this.props.setProgressBar(true);
		this.props.getDataTopup()
			.then(() => {
				this.props.setProgressBar(false);
				this.setState({ success: true, loading: false });
			})
			.catch(() => {
				this.props.setProgressBar(false);
				this.setState({ success: false, loading: false });
			})
	}

	numberWithCommas = (number) => {
    	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	handleClick = (idpo, nomor, bsu) => {
		this.setState({ open: true, data: { ...this.state.data, idpo: idpo, nomor: nomor, bsu: bsu }});
	}

	closeModal = () => this.setState({ open: false })

	submit = () => {
		this.setState({ loadingModal: true });
		this.props.submitTopup(this.state.data, this.props.userid)
			.then(() => this.setState({ open: false, loadingModal: false, error: {} }))
			.catch(() => this.setState({ open: false, loadingModal: false, error: {global: 'err'} }));
	}

	render(){
		const { listdata, level } = this.props;
		const { success, loading, open, data, error } = this.state;

		return(
			<React.Fragment>
				{ level === '04' ?  <Navbar>
					<Modal size="mini" open={open}>
			          <Modal.Header>Apakah anda yakin?</Modal.Header>
			          <Dimmer active={this.state.loadingModal} inverted>
				        <Loader inverted>Loading</Loader>
				      </Dimmer>
			          <Modal.Content>
			            <p>Saldo PO akan ditambah sebesar <strong>Rp {this.numberWithCommas(data.bsu)}</strong></p>
			          </Modal.Content>
			          <Modal.Actions>
			            <Button negative onClick={this.closeModal}>Batal</Button>
			            <Button
			              positive
			              icon='checkmark'
			              labelPosition='right'
			              content='Ya'
			              onClick={this.submit}
			            />
			          </Modal.Actions>
			        </Modal>
					{ success && !loading && <React.Fragment>
							{ error.global && <Message
								negative
						    	icon='times'
						    	header='Oppps!'
						    	content='Terdapat kesalahan... saat ini sedang kami perbaiki, mohon cobalagi beberapa saat lagi'
						  	/> }
							<Grid>
							{ listdata.map((data, i) => <Grid.Column mobile={16} tablet={8} computer={5} key={i}>
								<Card fluid>
									<Card.Content> 
										<Card.Header>{data.id_po}</Card.Header>
										<Divider />
										<Card.Description>
											<table>
												<tbody>
													<tr>
														<td width='100'>Email</td><td>: {data.email}</td>
													</tr>
													<tr>
														<td>Besar Uang</td><td>: {this.numberWithCommas(data.bsu)}</td>
													</tr>
													<tr>
														<td>Tanggal</td><td>: {data.tanggal_topup}</td>
													</tr>
													<tr>
														<td>Jam</td><td>: {data.waktu}</td>
													</tr>
												</tbody>
											</table>
										</Card.Description>
									</Card.Content>
									<Button primary fluid onClick={() => this.handleClick(data.id_po, data.nomor_urut, data.bsu) }>Konfirmasi</Button>
								</Card>
							</Grid.Column> )}
						</Grid>
					</React.Fragment> }

					{ !success && !loading && <Message
						negative
				    	icon='times'
				    	header='Oppps!'
				    	content='Terdapat kesalahan... saat ini sedang kami perbaiki, mohon cobalagi beberapa saat lagi'
				  	/> }
				</Navbar> : <PageNotFound />}
			</React.Fragment>
		);
	}
}

ConfirmTopupPage.propTypes = {
	getDataTopup: PropTypes.func.isRequired,
	setProgressBar: PropTypes.func.isRequired,
	submitTopup: PropTypes.func.isRequired,
	userid: PropTypes.string.isRequired,
	level: PropTypes.string.isRequired
}

function mapStateToProps(state){
	return{
		listdata: state.notifikasi.topup.data,
		userid: state.user.userid,
		level: state.user.level
	}
}

export default connect(mapStateToProps, { getDataTopup, setProgressBar, submitTopup })(ConfirmTopupPage);