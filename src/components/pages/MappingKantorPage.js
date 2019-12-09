import React from "react";
import Navbar from "../menu/Navbar";
import { Icon, Pagination, Table, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTotalPage, fetchMapping, fetchOneKantor, updateMapping } from "../../actions/mapping";
import { setProgressBar } from "../../actions/progress";
import ModalMapping from "../forms/ModalMapping";
import api from "../../api";

const Empty = () => (
	<Table.Row>
		<Table.Cell colSpan='6'>Data tidak ditemukan</Table.Cell>
	</Table.Row>
);	


const ListData = ({ list, getUpdate }) => (
	<React.Fragment>
		{ list ? <React.Fragment>
			{ list.map(x => <Table.Row key={x.RowNum}>
					<Table.Cell>{x.RowNum}</Table.Cell>
					<Table.Cell>{x.namakantor}</Table.Cell>
					<Table.Cell>{x.nopend} - {x.NamaKtr}</Table.Cell>
					<Table.Cell>{x.tgl_insert}</Table.Cell>
					<Table.Cell>{x.tgl_update === null ? 'kosong' : x.tgl_update}</Table.Cell>
					<Table.Cell style={{textAlign: 'center'}}>
						<Button 
							icon 
							primary 
							size='tiny' 
							onClick={() => getUpdate(x.kantor_id, x.RowNum)}
						>
						    <Icon name='pencil' />
						</Button>
					</Table.Cell>
				</Table.Row>)}
		</React.Fragment> : <Empty />}
	</React.Fragment>
);	

class MappingKantorPage extends React.Component {
	state = {
		pagination: {
			limit: 10,
			offset: 1,
			page: 1
		},
		errors: {},
		open: false,
		kantorId: '',
		regional: []
	}

	componentDidMount(){
		this.props.setProgressBar(true);
		this.props.getTotalPage()
			.then(() => {
				this.props.fetchMapping(this.state.pagination)
					.then(() => {
						this.props.setProgressBar(false);
						api.mapping.getRegional()
							.then(res => {
								const regional = [];
								res.forEach(e => {
									regional.push({
										key: e.nopend,
										value: e.nopend,
										text: e.wilayah
									})
								});
								this.setState({ regional });
							})
							.catch(err => alert("Something wrong, please refresh page"))
					})
					.catch(err => {
						this.props.setProgressBar(false);
						this.setState({ errors: err.response.data.errors })
					})
			})
			.catch(err => {
				this.props.setProgressBar(false);
				alert("Something wrong, please refresh page");
			})
	}

	onChange = (e, data) => {
		window.scrollTo(0, 0);
		const { activePage } = data;
		// console.log(Number(activePage) * 10);
		const { page } 	= this.state.pagination;
		const payload 	= {};
		if (activePage > page) {
			payload.offset = Number(this.state.pagination.offset) + 10;
			payload.limit  = Number(this.state.pagination.limit) + 10;
			payload.page   = activePage;
			this.setState({ pagination: payload });
		}else{
			payload.offset = Number(this.state.pagination.offset) - 10;
			payload.limit  = Number(this.state.pagination.limit) - 10;
			payload.page   = activePage; // 1
			this.setState({ pagination: payload });
		}

		// console.log(payload);
		//console.log(this.state.pagination);
		this.props.fetchMapping(payload)
			.catch(err => alert("Something wrong, please refresh page"))
	}

	onUpdate = (kantorId, no) => {
		const payload = {
			kantorId: kantorId,
			no: no,
			page: this.state.pagination.page
		};
		this.setState({ open: true, kantorId: kantorId });
		this.props.fetchOneKantor(payload);
	}

	onClose = () => this.setState({ open: false })

	onSubmitUpdate = (data) => this.props.updateMapping(data).then(() => this.setState({ open: false }))

	render(){
		const { total, items } = this.props;
		const { page } = this.state.pagination;
		const { open, kantorId } = this.state;
		return(
			<Navbar>
				<ModalMapping 
					open={open} 
					close={this.onClose} 
					id={kantorId} 
					page={page} 
					opsiReg={this.state.regional}
					update={this.onSubmitUpdate}
				/>
				<Table singleLine>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>NO</Table.HeaderCell>
				        <Table.HeaderCell>NAMA KANTOR</Table.HeaderCell>
				        <Table.HeaderCell>MAPPING</Table.HeaderCell>
				        <Table.HeaderCell>TANGGAL INSERT</Table.HeaderCell>
				        <Table.HeaderCell>TANGGAL UPDATE</Table.HeaderCell>
				        <Table.HeaderCell style={{textAlign: 'center'}}>ACTION</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>
				    <Table.Body>
				    	{ Object.keys(items).length > 0 ? <ListData 
				    		list={items[`page${page}`]} 
				    		getUpdate={this.onUpdate}
				    	/> : <Empty /> }
				    </Table.Body>
				</Table>
				<Pagination 
					boundaryRange={1}
				    defaultActivePage={1}
				    ellipsisItem={null}
				    firstItem={null}
				    lastItem={null}
				    siblingRange={1}
				    totalPages={total}
				    onPageChange={this.onChange}
				/>
			</Navbar>
		);
	}
}

MappingKantorPage.propTypes = {
	getTotalPage: PropTypes.func.isRequired,
	total: PropTypes.number.isRequired,
	items: PropTypes.object.isRequired,
	fetchOneKantor: PropTypes.func.isRequired,
	updateMapping: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		total: state.mapping.totalPage,
		items: state.mapping.pages
	}
}

export default connect(mapStateToProps, { getTotalPage, setProgressBar, fetchMapping, fetchOneKantor, updateMapping })(MappingKantorPage);