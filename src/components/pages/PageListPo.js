import React from "react";
import PropTypes from "prop-types";
import Navbar from "../menu/Navbar";
// import ListData from "../po/ListData";
import { connect } from "react-redux";
import { fetchListpo, getTotalPage } from "../../actions/purchase";
import { setProgressBar } from "../../actions/progress";
//<ListData detailOrder={this.getDetailOrder} />
import { Pagination, Table, Label, Header } from "semantic-ui-react";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ListItems = ({ list }) => (
	<React.Fragment>
		{ list ? <React.Fragment>
			{ list.map(x => <Table.Row 
				key={x.RowNum} 
				error={x.status === 'expired' ? true:false} 
				positive={x.status === 'belum berlaku' ? true:false}
				>
					<Table.Cell>{x.RowNum}</Table.Cell>
					<Table.Cell>{x.id_po}</Table.Cell>
					<Table.Cell>Line ke {x.line}</Table.Cell>
					<Table.Cell>{x.description}</Table.Cell>
					<Table.Cell>{x.tgl_awal}</Table.Cell>
					<Table.Cell>{x.tgl_akhir}</Table.Cell>
					<Table.Cell style={{ textAlign: 'right'}}>{numberWithCommas(x.bsu_awal)}</Table.Cell>
					<Table.Cell style={{ textAlign: 'right'}}>{numberWithCommas(x.sisa_saldo)}</Table.Cell>
				</Table.Row>) }
		</React.Fragment> : <Empty /> }
	</React.Fragment>
)

const Empty = () => (
	<Table.Row>
		<Table.Cell colSpan='8'>Data tidak ditemukan</Table.Cell>
	</Table.Row>
);

class PageListPo extends React.Component {
	state = {
		loading: false,
		pagination: {
			page: 1,
			offset: 1,
			limit: 10
		}
	}

	componentDidMount(){
		this.props.setProgressBar(true);
		const { userid } = this.props.user;
		this.props.getTotalPage(userid);
		this.props.fetchListpo(userid, this.state.pagination).then(() => this.props.setProgressBar(false));
	}

	getDetailOrder = (idpo) => {
		this.setState({ loading: true });
	}

	onChange = (e, data) =>  {
		const { activePage } = data;
		const { page } = this.state.pagination;
		const { userid } = this.props.user;
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

		this.props.fetchListpo(userid, payload)
			.catch(err => alert("Something wrong, please refresh page!"));
	}

	render(){
		const { pageTotal, items } = this.props;
		const { page } = this.state.pagination;
		return(
			<Navbar>
				<Header as='h2'>
				    Purchase Order
				    <Header.Subheader>
				      Berikut adalah daftar purchase order anda
				    </Header.Subheader>
				</Header>
				<Table singleLine>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>NO</Table.HeaderCell>
				        <Table.HeaderCell>NOMOR PO</Table.HeaderCell>
				        <Table.HeaderCell>LINE</Table.HeaderCell>
				        <Table.HeaderCell>DESKRIPSI</Table.HeaderCell>
				        <Table.HeaderCell>TANGGAL AWAL</Table.HeaderCell>
				        <Table.HeaderCell>TANGGAL AKHIR</Table.HeaderCell>
				        <Table.HeaderCell style={{ textAlign: 'right'}}>TOTAL SALDO</Table.HeaderCell>
				        <Table.HeaderCell style={{ textAlign: 'right'}}>SISA SALDO</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>
				    <Table.Body>
				    	{ Object.keys(items).length > 0 ? <ListItems list={items[`page${page}`]} /> : <Empty />}
				    </Table.Body>
				    <Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan='3'>
								<Label style={{backgroundColor: '#62823e', color: '#fff'}}>Belum berlaku</Label>
								<Label style={{backgroundColor: '#db9686', color: '#fff'}}>Expired</Label>
							</Table.HeaderCell>
							<Table.HeaderCell colSpan='5' style={{textAlign: 'right'}}>
								<Pagination 
									boundaryRange={1}
								    defaultActivePage={1}
								    ellipsisItem={null}
								    firstItem={null}
								    lastItem={null}
								    siblingRange={1}
								    totalPages={pageTotal}
								    onPageChange={this.onChange}
								/>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</Navbar>
		);
	}
}

PageListPo.propTypes = {
	user: PropTypes.object.isRequired,
	fetchListpo: PropTypes.func.isRequired,
	pageTotal: PropTypes.number.isRequired,
	items: PropTypes.object.isRequired
}

function mapStateProps(state) {
	return{
		user: state.user,
		pageTotal: state.pouser.po.totalPage,
		items: state.pouser.po.pages
	}
}

export default connect(mapStateProps, { fetchListpo, setProgressBar, getTotalPage })(PageListPo);