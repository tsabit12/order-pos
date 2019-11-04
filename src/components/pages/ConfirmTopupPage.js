import React from "react";
import PropTypes from "prop-types";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import { getDataTopup, submitTopup } from "../../actions/notifikasi"; 
import { setProgressBar } from "../../actions/progress";
import { Grid, Card, Button, Message, Divider, Modal, Dimmer, Loader, Input, Form } from "semantic-ui-react";
import PageNotFound from "./PageNotFound";
import "../css/Topup.css";

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
		error: {},
		list: [],
		textSearch: '',
		buttonDel: false
	}

	componentDidMount(){
		
		const { listdata } = this.props;
		if (listdata.length > 0) {
			this.setState({ list: listdata });
		}

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

	UNSAFE_componentWillReceiveProps(nextProps){
		if (nextProps.listdata) {
			this.setState({ list: nextProps.listdata })
		}
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
			.catch(() => this.setState({ open: false, loadingModal: false, error: {global: 'Terdapat kesalahan, konfirmasi topup gagal'} }));
	}

	handleInputChange = (e) => this.setState({ textSearch: e.target.value })

	handleSearch = () => {
		const error = this.validate(this.state.textSearch);
		this.setState({ error });
		if (Object.keys(error).length === 0) {
			const list = this.state.list.filter(x => x.id_po.toLowerCase().indexOf(this.state.textSearch.toLowerCase()) > -1);
			this.setState({ list, buttonDel: true });
		}
	}

	validate = (value) => {
		const error = {};
		if (!value) error.po = "Nomor po belum di isi";
		return error;
	}

	handleDelete = () => this.setState({ list: this.props.listdata, buttonDel: false, textSearch: '' })

	render(){
		const { level } = this.props;
		const { success, loading, open, data, error, list, buttonDel } = this.state;

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

			        { error.global && <Message
							negative
					    	icon='times'
					    	header='Oppps!'
					    	content='Terdapat kesalahan... saat ini sedang kami perbaiki, mohon cobalagi beberapa saat lagi'/> }

			        	<Grid>
							<Grid.Row className='pad-right-1'>
								{ buttonDel && <Grid.Column mobile={2} computer={8}> 
									<Button 
										icon='times' 
										color='teal' 
										style={{float: 'right', borderRadius: '0', height: '38px', marginRight: '-28px'}} 
										onClick={this.handleDelete}
									/> 
								</Grid.Column>}
								<Grid.Column  floated='right' mobile={14} computer={8}>
									<Form.Field>
										<Input
											fluid 
							    			action={{
									        	icon: 'search', 
									        	color: 'red',
									        	content: 'Cari',
									        	onClick: () => this.handleSearch()
									    	}} 
									    	value={this.state.textSearch}
											onChange={this.handleInputChange}
											placeholder='Masukan nomor po...'
											error={!!error.po}
										/>										
									</Form.Field>
								</Grid.Column>
							</Grid.Row>

							{ list.length > 0 ? <React.Fragment>
								{ list.map((data, i) => <Grid.Column mobile={16} tablet={8} computer={5} key={i}>
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
							</React.Fragment> : <p>Data tidak ditemukan</p> }
						</Grid>
					

					{ !success && !loading && <Message
						negative
				    	icon='times'
				    	header='Oppps!'
				    	content='Data tidak ditemukan'
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