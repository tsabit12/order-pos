import React from "react";
import Navbar from "../menu/Navbar";
import { Breadcrumb, Message, Table, Sticky, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDetailTarif } from "../../actions/tarif";
import "../css/Notfound.css";

const MessageError = ({ text }) => (
	<Message negative>
		<Message.Header>Oppps!</Message.Header>
		<p>{text}</p>
	</Message>
)

const RenderListDetail = ({ list }) => {
	var no = 1;
	return(
		<React.Fragment>
			{ list.map((x, i) => <Table.Row key={i}>
				<Table.Cell>{no++}</Table.Cell>
				<Table.Cell>{x.KDKANTORT}</Table.Cell>
				<Table.Cell>{x.kantor_tujuan}</Table.Cell>
				<Table.Cell>{x.BRT_LAYANAN_PKS}</Table.Cell>
				<Table.Cell>{x.TARIF_LAYANAN_PKS}</Table.Cell>
				<Table.Cell>{x.KELIPATAN}</Table.Cell>
				<Table.Cell>{x.create_time}</Table.Cell>
			</Table.Row> )}
		</React.Fragment>
	);
}

class DetailTarifPage extends React.Component{
	contextRef = React.createRef();

	state = {
		params: {
			nopend: '',
			produk: '',
			layanan: ''
		},
		errors: {},
		stick: false
	}

	componentDidMount(){
		const { id } 	= this.props.match.params;
		const parsing 	= id.split('-');
		const params 	= {
			nopend: parsing[0],
			produk: parsing[1],
			layanan: parsing[2]
		};

		this.setState({ params });
		this.props.getDetailTarif(parsing[0], parsing[2])
			.catch(err => this.setState({ errors: err.response.data.errors }))
	}

	render(){
		const { params, errors, stick } = this.state;
		const { listdetail } = this.props;
		return(
			<Navbar>
				<div ref={this.contextRef}>
					<Sticky 
			    		context={this.contextRef} 
			    		offset={60}
			    		onStick={() => this.setState({ stick: true })}
			    		onUnstick={() => this.setState({ stick: false })}
			    	>
			    		<div style={{
			    			background: 'white', 
			    			height: stick ? '58px' : '30px', 
			    			paddingTop: stick ? '12px' : '0'}
			    		}>
							<Breadcrumb>
							    <Breadcrumb.Section as={Link} to="/tarif">Tarif</Breadcrumb.Section>
							    <Breadcrumb.Divider icon='right chevron' />
							    <Breadcrumb.Section active>{params.nopend}</Breadcrumb.Section>
							    <Breadcrumb.Divider icon='right arrow' />
							    <Breadcrumb.Section active>{params.produk}</Breadcrumb.Section>
							</Breadcrumb>
							<div style={{float: 'right'}}>
								<Button secondary onClick={() => alert("New features soon")}>Tambah</Button>
							</div>
						</div>
					</Sticky>
					{ errors.global && <MessageError text={errors.global} /> }
					<Table className="fixed-header" celled>
						<Table.Header>
							<Table.Row>
							    <Table.HeaderCell>NO</Table.HeaderCell>
							    <Table.HeaderCell>NOPEND TUJUAN</Table.HeaderCell>
							    <Table.HeaderCell>NAMA KANTOR</Table.HeaderCell>
							    <Table.HeaderCell>BERAT LAYANAN PKS</Table.HeaderCell>
							    <Table.HeaderCell>TARIF LAYANAN PKS</Table.HeaderCell>
							    <Table.HeaderCell>KELIPATAN</Table.HeaderCell>
							    <Table.HeaderCell>TANGGAL INSERT</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{ listdetail ? <RenderListDetail list={listdetail} /> : <Table.Row>
								<Table.Cell colSpan='7'>Loading...</Table.Cell>
							</Table.Row> }
						</Table.Body>
					</Table>
				</div>
			</Navbar>
		);
	}
}

DetailTarifPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
}

function mapStateToProps(state, props) {
	const { id } 	= props.match.params;
	const parsing 	= id.split('-');
	let nopend  	= parsing[0];
	let layanan 	= parsing[2];
	return{
		listdetail: state.laporan.tarif.detail[`${nopend}_${layanan}`]
	}
}

export default connect(mapStateToProps, { getDetailTarif })(DetailTarifPage);