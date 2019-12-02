import React from "react";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Pagination } from "semantic-ui-react";
import { getTotalPage, getItems, submitPickup } from "../../actions/pickup";
import { setProgressBar } from "../../actions/progress";
import { Table, Header, Icon, Divider, Checkbox, Button, Modal, Message } from "semantic-ui-react";

const ModalNotification = ({ open, close, choosed, submit, loading, errors }) => {
	return(
		<Modal size='tiny' open={open} centered={false}>
          <Modal.Header>Notification</Modal.Header>
          <Modal.Content>
          	{ errors.global && <Message negative>
				<Message.Header>Oppps!</Message.Header>
				<p>{errors.global}</p>
			</Message> }
            <p>Apakah anda yakin untuk melakukan request pickup? <br/> Total yang dipilh ada <strong>{choosed}</strong> item</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => close()}>Batal</Button>
            <Button
              positive
              onClick={() => submit()}
              icon='checkmark'
              labelPosition='right'
              content='Yes'
              loading={loading}
            />
          </Modal.Actions>
        </Modal>
	);
}

const ListData = ({ list, onClick, pickup }) => {
	return(
		<React.Fragment>
			{ list ? <React.Fragment>
					{ list.map(x => <Table.Row key={x.RowNum}>
							<Table.Cell>{x.RowNum}</Table.Cell>
							<Table.Cell>{x.id_po}</Table.Cell>
							<Table.Cell>{x.id_order}</Table.Cell>
					        <Table.Cell>{x.namakantor}</Table.Cell>
					        <Table.Cell>{x.kantor_pickup}</Table.Cell>
					        <Table.Cell>{x.tgl_order}</Table.Cell>
					        <Table.Cell>{x.waktu}</Table.Cell>
					        <Table.Cell style={{textAlign: 'center'}}>
					        	<Checkbox 
					        		id={x.id_order}
					        		name={x.id_order}
					        		onClick={onClick} 
					        		checked={x.id_order === pickup.find(y => y === x.id_order)}
					        	/>
					        </Table.Cell>
						</Table.Row> ) }
				</React.Fragment> : <Table.Row>
					<Table.Cell colSpan='8'>Loading...</Table.Cell>
				</Table.Row> }
		</React.Fragment>
	);
}

class PickupPage extends React.Component{
	state = {
		pagination:{
			offset: 1,
			limit: 10
		},
		page: 1,
		perPage: 10,
		pickuped: [],
		open: false,
		loading: false,
		errors: {}
	}

	componentDidMount(){
		this.props.setProgressBar(true);
		const { userid } = this.props;
		const page 		 = 1;
		this.props.getTotalPage(userid)
			.catch(err => console.log(err));

		this.props.getItems(this.state.pagination, userid, page)
			.then(() => this.props.setProgressBar(false))
			.catch(err => console.log(err));
	}


	onChange = (e, data) => {
		window.scrollTo(0, 0);
		const { activePage } = data;
		const payload = {};
		//next button
		if (activePage > this.state.page) {
			payload.offset = Number(this.state.pagination.offset) + this.state.perPage;
			payload.limit  = Number(this.state.pagination.limit) + this.state.perPage;
			this.setState({ pagination: payload, page: activePage });
		}else{ //back button
			payload.offset 	= Number(this.state.pagination.offset) - this.state.perPage;
			payload.limit 	= Number(this.state.pagination.limit) - this.state.perPage;
			this.setState({ pagination: payload, page: activePage });
		}

		this.getNewData(payload, activePage);
	}

	getNewData = (payload, page) => {
		const { userid } = this.props;
		this.props.getItems(payload, userid, page)
			.catch(err => console.log(err));
	}

	handleClickPickup = (e, data) => {
		if (data.checked) {
			this.setState({ pickuped: [ ...this.state.pickuped, data.id ]});
		}else{ //remove
			var array = [...this.state.pickuped];
			var index = array.indexOf(data.id);
			if (index !== -1) {
			    array.splice(index, 1);
			    this.setState({pickuped: array });
			}
		}
	}

	//before submit
	//send user notification
	showResult = () => {
		//make sure thers no null data
		if (this.state.pickuped.length > 0) {
			this.setState({ open: true, loading: false, errors: {} });
		}else{
			alert("Data order belum ada yang dipilh");
		}
	}

	handleClose = () => this.setState({ open: false })

	onSubmit = () => {
		this.setState({ loading: true });
		//find pages of checked items;
		const pagesChecked = {};
		const { pickuped } = this.state;
		const objectnya    = this.props.pagination.pages;
		for(var i in objectnya){
			const values 	= objectnya[i];
			const newValues = values.filter(x => !pickuped.includes(x.id_order));
			pagesChecked[i] = newValues;
		}
		
		this.props.submitPickup(this.state.pickuped, pagesChecked)
			.then(() => this.setState({ loading: false, open: false, pickuped: [] }))
			.catch(err => this.setState({ loading: false, errors: err.response.data.errors }));
	}

	render(){
		const { pagination } = this.props;
		const pagenya 		 = `page${this.state.page}`;
		const { pickuped, open }   = this.state;
		return(
			<Navbar>
				<Header as='h3'>
				    <Icon name='truck' />
				    <Header.Content>
				      Request Pickup
				      <Header.Subheader>Kelola data order anda untuk dilakukan request pickup</Header.Subheader>
				    </Header.Content>
				</Header>
				<Divider />
				<ModalNotification
					open={open}
					close={this.handleClose}
					choosed={pickuped.length}
					submit={this.onSubmit}
					loading={this.state.loading}
					errors={this.state.errors}
				/>
				{ Object.keys(pagination.pages).length > 0 && <Table celled>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>NO</Table.HeaderCell>
				        <Table.HeaderCell>NOMOR PO</Table.HeaderCell>
				        <Table.HeaderCell>EXTERNAL ID</Table.HeaderCell>
				        <Table.HeaderCell>DIPICKUP</Table.HeaderCell>
				        <Table.HeaderCell>KANTOR PICKUP</Table.HeaderCell>
				        <Table.HeaderCell>TANNGAL ORDER</Table.HeaderCell>
				        <Table.HeaderCell>WAKTU ORDER</Table.HeaderCell>
				        <Table.HeaderCell style={{textAlign: 'center'}}>PICKUP</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header> 
				    	<Table.Body>
    						<ListData 
    							list={pagination.pages[pagenya]} 
    							onClick={this.handleClickPickup}
    							pickup={this.state.pickuped}
    						/>
    					</Table.Body>
    					<Table.Footer>
					      <Table.Row>
					      	<Table.HeaderCell colSpan='5'>
					      		<Pagination 
									boundaryRange={1}
								    defaultActivePage={1}
								    ellipsisItem={null}
								    firstItem={null}
								    lastItem={null}
								    siblingRange={1}
								    totalPages={pagination.totalPage}
								    onPageChange={this.onChange}
								/>
					      	</Table.HeaderCell>
					        <Table.HeaderCell colSpan='3' style={{textAlign: 'right'}}>
					        	<Button 
					        		onClick={this.showResult}
					        		primary 
					        		fluid 
					        		disabled={pickuped.length === 0 ? true:false}
					        	>{pickuped.length === 0 ? 'Harap centang terlebih dahulu' : 'Pickup'}
					        	</Button>
					        </Table.HeaderCell>
					      </Table.Row>
					    </Table.Footer>
    				</Table> }
			</Navbar>
		);
	}
}

PickupPage.propTypes = {
	pagination: PropTypes.object.isRequired,
	userid: PropTypes.string.isRequired,
	getTotalPage: PropTypes.func.isRequired,
	getItems: PropTypes.func.isRequired,
	submitPickup: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		pagination: state.pickup.pagination,
		userid: state.user.userid
	}
}

export default connect(mapStateToProps, { getTotalPage, getItems, submitPickup, setProgressBar })(PickupPage);