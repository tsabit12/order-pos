import React from "react";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTotalPage, fetchInvoice } from "../../actions/invoice";
import { Pagination, Table, Form, Button, Dropdown, Segment, Loader, Dimmer } from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import { setProgressBar } from "../../actions/progress";
import api from "../../api";
import { Link } from "react-router-dom";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Loadingnya = () => (
	<Table.Row>
		<Table.Cell colSpan='8'>Loading...</Table.Cell>
	</Table.Row>
)

const Empty = () => (
	<Table.Row>
		<Table.Cell colSpan='8'>Data tidak ditemukan</Table.Cell>
	</Table.Row>
);

const ListInvoice = ({ items, cetak }) => {
	return(
		<React.Fragment>
			{ items ? items.map(x => <Table.Row key={x.RowNum}>
					<Table.Cell>{x.RowNum}</Table.Cell>
					<Table.Cell>{x.no_invoice}</Table.Cell>
					<Table.Cell>{x.id_po}</Table.Cell>
					<Table.Cell>{x.namakantor}</Table.Cell>
					<Table.Cell>{x.tanggal_insert}</Table.Cell>
					<Table.Cell textAlign='right'>{x.qty}</Table.Cell>
					<Table.Cell textAlign='right'>{numberWithCommas(x.total)}</Table.Cell>
					<Table.Cell textAlign='center'>
						<Dropdown
						    icon='caret down'
						    text='Pilih &nbsp;'
						    button
						    className='icon'
						    style={{backgroundColor: '#47b6ac', color: '#fff'}}
						>
						    <Dropdown.Menu>
						      <Dropdown.Header icon='tags' content='Pilih aksi' />
						      <Dropdown.Item onClick={() => cetak(x.no_invoice)}>Cetak Ulang</Dropdown.Item>
						      <Dropdown.Item as={Link} to={`/laporan_invoice/detail/${x.no_invoice}`}>Lihat Detail</Dropdown.Item>
						    </Dropdown.Menu>
						</Dropdown>
					</Table.Cell>
			</Table.Row>) : <Empty /> }
		</React.Fragment>
	);
}

class LaporanInvoice extends React.Component{
	state = {
		pagination: {
			page: 1,
			limit: 10,
			offset: 1
		},
		tanggal: '',
		loading: false
	}

	componentDidMount(){
		this.props.setProgressBar(true);
		this.props.getTotalPage()
			.then(() => {
				this.props.fetchInvoice(this.state.pagination)
					.then(() => this.props.setProgressBar(false))
					.catch(err => {
						console.log(err);
						this.props.setProgressBar(false);
					})
			})
			.catch(err =>  {
				this.props.setProgressBar(false);	
				console.log("opps");
			});
	}

	onChange = (e, { value }) => this.setState({ tanggal: value })

	onCetak = (invoice) => {
		this.setState({ loading: true });
		api.invoice.download(invoice)
			.then(res => {
				this.setState({ loading: false });
				let blob = new Blob([res], { type: 'application/pdf' }),
			  	url = window.URL.createObjectURL(blob);
			  	window.open(url); 
			}).catch(err => {
				this.setState({ loading: false });
				alert("Terdapat kesalahan, silahkan cobalagi nanti");
			});
	}

	render(){
		const { totalPage, list } = this.props;
		const { page } = this.state.pagination;

		return(
			<Navbar>
				<Form>
					<Form.Field>
						<div className="field" style={{display: 'flex'}}>
							<div className="field" style={{width: '100%'}}>
								<DatesRangeInput
						          name="datesRange"
						          placeholder="Mulai - Sampai"
						          iconPosition="left"
						          closeOnMouseLeave={false}
						          closable={true}
						          value={this.state.tanggal}
						          onChange={this.onChange}
						          dateFormat="YYYY/MM/DD"
						          autoComplete="off"
						          style={{width: '101%'}}
						        />
							</div>
							<Button primary style={{marginRight: '0px', zIndex: '100', height:'38px', borderRadius: 0}}>Cari</Button>
						</div>
					</Form.Field>
				</Form>
				<Segment vertical style={{marginTop: '-31px'}}>
					<Dimmer active={this.state.loading} inverted>
						<Loader inverted>Loading</Loader>
					</Dimmer>

					<Table singleLine>
					    <Table.Header>
					      <Table.Row>
					        <Table.HeaderCell>No</Table.HeaderCell>
					        <Table.HeaderCell>Nomor Invoice</Table.HeaderCell>
					        <Table.HeaderCell>Nomor PO</Table.HeaderCell>
					        <Table.HeaderCell>Kantor</Table.HeaderCell>
					        <Table.HeaderCell>Tanggal Generate</Table.HeaderCell>
					        <Table.HeaderCell textAlign='right'>Qty</Table.HeaderCell>
					        <Table.HeaderCell textAlign='right'>Total</Table.HeaderCell>
					        <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
					      </Table.Row>
					    </Table.Header>
					    <Table.Body>
					    	{ Object.keys(list).length > 0 ? 
					    		<ListInvoice 
					    			items={list[`page${page}`]}
					    			cetak={this.onCetak}
					    		/> : <Loadingnya />}
					    </Table.Body>
					    <Table.Footer>
						    <Table.Row>
						    	<Table.HeaderCell textAlign='center' colSpan='8'>
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
						    </Table.Row>
						</Table.Footer>
					</Table>
				</Segment>
			</Navbar>
		);
	}
}

LaporanInvoice.propTypes = {
	getTotalPage: PropTypes.func.isRequired,
	totalPage: PropTypes.number.isRequired,
	setProgressBar: PropTypes.func.isRequired,
	fetchInvoice: PropTypes.func.isRequired,
	list: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		totalPage: state.invoice.totalPage,
		list: state.invoice.pages
	}
}

export default connect(mapStateToProps, { getTotalPage, setProgressBar, fetchInvoice })(LaporanInvoice);