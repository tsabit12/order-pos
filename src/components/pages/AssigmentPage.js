import React from "react";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAssigment, getTotalPage, addAssign } from "../../actions/assigment";
import { Pagination, Table, Button, Checkbox, Modal, Dimmer, Loader, Segment, Message, Dropdown } from "semantic-ui-react";
import api from "../../api";
import { Link } from "react-router-dom";

const ModalNotification = ({ open, close, result, submit, loading, getPetugas, petugas, onChange, petugasId, errors }) => (
	<Modal size='large' open={open}>
      	<Modal.Content>
      		<Segment vertical>
		      <Dimmer active={loading} inverted>
		        <Loader inverted>Loading</Loader>
		      </Dimmer>

		      	<center>
	      			<p>Berikut adalah data yang dipilih. Apakah anda yakin untuk assign data yang dipilih?</p>
	      		</center>
	      		<br/>
	      		<br/>
	      		<Dropdown 
	      			placeholder='Pilih petugas pickup' 
	      			fluid 
	      			selection
	      			value={petugasId}
	      			onChange={onChange}
	      			options={petugas}
	      			onClick={() => getPetugas()} 
	      			error={!!errors.petugasId}
	      		/>
	      		{ errors.petugasId && <span style={{color: "#ae5856"}}>{errors.petugasId}</span>}
			    { result.length > 0 && <Table singleLine>
			    	<Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>ID ORDER</Table.HeaderCell>
				        <Table.HeaderCell>JENIS ITEM</Table.HeaderCell>
				        <Table.HeaderCell>KUANTITI</Table.HeaderCell>
				        <Table.HeaderCell>UNIT</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>
			    	<Table.Body>
			    		{ result.map(x => <Table.Row key={x.id_order}>
			    				<Table.Cell>{x.id_order}</Table.Cell>
			    				<Table.Cell>{x.contentdesc}</Table.Cell>
			    				<Table.Cell>{x.qty}</Table.Cell>
			    				<Table.Cell>Buah</Table.Cell>
			    			</Table.Row>)}	
			    	</Table.Body>
			    </Table> }
		    </Segment>
      	</Modal.Content>
      	<Modal.Actions>
        	<Button negative onClick={() => close()}>Batal</Button>
        	<Button
          		positive
          		icon='checkmark'
          		labelPosition='right'
          		content='Yes'
          		onClick={() => submit()}
        	/>
      	</Modal.Actions>
    </Modal>
);

const Empty = () => (
	<Table.Row>
		<Table.Cell colSpan='6'>Loading...</Table.Cell>
	</Table.Row>
);

const Listdata = ({ items, onClick, checked }) => {
	return(
		<React.Fragment>
			{ items ? <React.Fragment>
				{ items.map(x => <Table.Row key={x.RowNum}>
					<Table.Cell>{x.RowNum}</Table.Cell>
					<Table.Cell>{x.id_order}</Table.Cell>
					<Table.Cell>{x.contentdesc}</Table.Cell>
					<Table.Cell>{x.namakantor}</Table.Cell>
					<Table.Cell>{x.service_id}</Table.Cell>
					<Table.Cell style={{textAlign: 'center'}}>
						<Checkbox 
							id={x.id_order}
					        name={x.id_order}
							toggle
							onClick={onClick} 
							checked={x.id_order === checked.find(y => y === x.id_order )}
						/>
					</Table.Cell>
				</Table.Row>)}
			</React.Fragment> : <Empty />} 
		</React.Fragment>
	);	
}

class AssigmentPage extends React.Component {
	state = {
		pagination: {
			limit: 10,
			offset: 1,
			page: 1
		},
		search: false,
		checkAll: {},
		assigned: [],
		open: false,
		loading: false,
		loadingSubmit: false,
		errors: {},
		result: [],
		petugas: [],
		petugasId: '',
		errorsSubmit: {},
		success: false
	}

	componentDidMount(){
		const { nopend } = this.props.auth;
		const { pagination } = this.state;
		
		this.props.getTotalPage(nopend)
			.then(res => {
				const total = Math.ceil(res.total / 10) ;
				const checkAll = {};
				for (var i = 1; i <= total; i++) {
					checkAll[`page${i}`] = false;
				}
				this.setState({ checkAll });
			})
			.catch(err => console.log(err));

		this.props.fetchAssigment(nopend, pagination)
			.catch(err => console.log(err));

		//set object on check all
	}

	onChange = (e, data) =>  {
		const { activePage } = data;
		const { page } = this.state.pagination;
		const { nopend } = this.props.auth;
		const payload = {};
		if (activePage > page) {
			payload.offset = Number(this.state.pagination.offset) + 10;
			payload.limit  = Number(this.state.pagination.limit) + 10;
			payload.page   = activePage;
			this.setState({ pagination: payload });
		}else{
			payload.offset = Number(this.state.pagination.offset) - 10;
			payload.limit  = Number(this.state.pagination.limit) - 10;
			payload.page   = activePage;
			this.setState({ pagination: payload });
		}

		this.props.fetchAssigment(nopend, payload)
			.catch(err => alert("Something wrong, please refresh page!"));
	}

	handleCheckAll = () => {
		const { page } = this.state.pagination;
		if (this.state.checkAll[`page${page}`]) {
			const { totalPage } = this.props;
			const checkAll = {};
			for (var i = 1; i <= totalPage; i++) {
				checkAll[`page${i}`] = false;
			}
			this.setState({
				checkAll,
				assigned: []
			})
		}else{
			const { items } = this.props;
			const { page } = this.state.pagination;
			const assigned = [];
			items[`page${page}`].forEach(x => {
				assigned.push(x.id_order);
			});

			this.setState({ 
				checkAll: {
					...this.state.checkAll,
					[`page${page}`]: true
				},
				assigned: [ ...this.state.assigned, ...assigned ]
			})
		}
	}

	handleClick = (e, data) => {
		if (data.checked) {
			this.setState({ assigned: [ ...this.state.assigned, data.id ] })
		}else{
			var array = [...this.state.assigned];
			var index = array.indexOf(data.id);
			if (index !== -1) {
			    array.splice(index, 1);
			    this.setState({assigned: array });
			}
		}
	}

	showModal = () => {
		this.setState({ loading: true, petugasId: '', errorsSubmit: {}, success: false });
		api.order.notifAssign(this.state.assigned)
			.then(res => {
				this.setState({ loading: false, open: true, errors: {}, result: res });
			}).catch(err => this.setState({ loading: false, errors: err.response.data.errors, result: [] }));
	}

	handleClose = () => this.setState({ open: false })

	onSubmit = () => {
		const errorsSubmit = this.validate(this.state.petugasId);
		this.setState({ errorsSubmit });
		if (Object.keys(errorsSubmit).length === 0) {
			this.setState({ loadingSubmit: true });
			const { nopend } = this.props.auth;
			const myObj 	= this.props.items;
			const checked 	= this.state.assigned;
			const newState 	= {};
			const checkAll  = {};
			const other 	= {
				nopend: nopend,
				petugasId: this.state.petugasId
			};
			for(var i in myObj){
				const values 	= myObj[i];
				const newValues = values.filter(x => !checked.includes(x.id_order));
				newState[i] 	= newValues; 
				checkAll[i] 	= false;
			} 

			this.props.addAssign(checked, newState, other)
				.then(() => {
					this.setState({ open: false, loadingSubmit: false, errors: {}, checkAll, assigned: [], success: true });
					this.downloadPdf();
				})
				.catch(err => this.setState({ open: false, errors: err.response.data.errors, loadingSubmit: false }));
		}
	}

	validate = (petugasId) => {
		const errors = {};
		if (!petugasId) errors.petugasId = "Harap pilih petugas pickup";
		return errors;
	}

	getPetugas = () => {
		const { nopend } = this.props.auth;
		api.petugas.fetch_petugaspickup(nopend)
			.then(res => {
				const petugas = [];
				res.forEach(x => {
					petugas.push({
						key: x.id_petugas,
						value: x.id_petugas,
						text: x.nama_petugas
					});
				});
				this.setState({ petugas: petugas });
			})
			.catch(err => alert("Terdapat kesalahan atau petugas pickup tidak ditemukan"));
	}

	onChangePetugas = (e, { value }) => this.setState({ petugasId: value })

	downloadPdf = () => {
		const { noPickup } = this.props;
		// const noPickup = '000002';
		const { nama } = this.props.auth;
		api.order.downloadTugas(noPickup, nama)
			.then(res => {
				let blob = new Blob([res], { type: 'application/pdf' }),
			  	url = window.URL.createObjectURL(blob);
			  	window.open(url); 
			}).catch(err => alert(err));
	}

	render(){
		const { totalPage } = this.props;
		const { items } = this.props;
		const { assigned, checkAll, pagination, loading, errors, result, loadingSubmit, success } = this.state;
		const page 		= `page${this.state.pagination.page}`;
		
		return(
			<Navbar>
				<React.Fragment>
					{ success && <Message positive>
						<Message.Header>Sukses!</Message.Header>
						<p>File pdf tidak muncul? klik <Link to="/assignment" onClick={this.downloadPdf}>disini </Link> 
						untuk download ulang. Harap pastikan bahwa add block sudah dimatikan dari browser anda</p>
					</Message> }
					<ModalNotification 
						open={this.state.open} 
						close={this.handleClose} 
						result={result}
						submit={this.onSubmit}
						loading={loadingSubmit}
						getPetugas={this.getPetugas}
						petugas={this.state.petugas}
						onChange={this.onChangePetugas}
						petugasId={this.state.petugasId}
						errors={this.state.errorsSubmit}
					/>
					<Segment vertical style={{marginTop: '-15px'}}>
						{ errors.global && <Message negative>
							<Message.Header>Oppps!</Message.Header>
							<p>{errors.global}</p>
						</Message> }
						<Dimmer active={loading} inverted>
						    <Loader indeterminate inverted>Mohon tunggu sebentar...</Loader>
						</Dimmer>
						<Table celled>
						    <Table.Header>
						      <Table.Row>
						        <Table.HeaderCell>NO</Table.HeaderCell>
						        <Table.HeaderCell>EXTERNAL ID</Table.HeaderCell>
						        <Table.HeaderCell>JENIS KIRIMAN</Table.HeaderCell>
						        <Table.HeaderCell>KANTOR</Table.HeaderCell>
						        <Table.HeaderCell>KODE PRODUK</Table.HeaderCell>
						        <Table.HeaderCell style={{textAlign: 'center'}}>
						        	<Checkbox 
						        		label='ASSIGN ALL' 
						        		onClick={this.handleCheckAll}
						        		checked={checkAll[`page${pagination.page}`]}
						        	/>
						        </Table.HeaderCell>
						      </Table.Row>
						    </Table.Header> 
					    	<Table.Body>
					    		{ Object.keys(items).length === 0 ? <Empty /> : <Listdata 
					    			items={items[page]} 
					    			onClick={this.handleClick}
					    			checked={assigned}
					    		/> }
					    	</Table.Body>
					    	<Table.Footer>
							    <Table.Row>
							      	<Table.HeaderCell colSpan='4'>
							      		<Pagination 
											boundaryRange={1}
										    defaultActivePage={1}
										    ellipsisItem={null}
										    firstItem={null}
										    lastItem={null}
										    siblingRange={1}
										    totalPages={totalPage}
										    onPageChange={this.onChange}
										/>
							      	</Table.HeaderCell>
							      	<Table.HeaderCell colSpan='2'>
							      		<Button 
							      			primary 
							      			fluid
							      			onClick={this.showModal}
							      			disabled={assigned.length === 0 ? true : false }
							      		>
							      			{ assigned.length === 0 ? 'Harap centang terlebih dahulu' : 'Assign'}
							      		</Button>
							      	</Table.HeaderCell>
							    </Table.Row>
							</Table.Footer>
						</Table>
					</Segment>
				</React.Fragment>
			</Navbar>
		);
	}
}

AssigmentPage.propTypes = {
	fetchAssigment: PropTypes.func.isRequired,
	getTotalPage: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	totalPage: PropTypes.number.isRequired,
	items: PropTypes.object.isRequired,
	noPickup: PropTypes.number.isRequired
}

function mapStateToProps(state) {
	return{
		auth: state.user,
		totalPage: state.order.assigment.totalPage,
		items: state.order.assigment.pages,
		noPickup: state.order.assigment.noPickup
	}
}

export default connect(mapStateToProps, { fetchAssigment, getTotalPage, addAssign })(AssigmentPage);