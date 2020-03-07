import React from "react";
import Navbar from "../menu/Navbar";
import { Icon, Sticky, Input, Grid, Button, Table, Popup } from 'semantic-ui-react';
import { connect } from "react-redux";
import { getTarifLayanan } from "../../actions/tarif";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const ListTarif = ({ list }) => {
	var no 				= 1;
	let tbodyContent	=[];
	let grouping 		= '';
	for(var key = 0; key < list.length; key++){
		let item 	= list[key];
		let nopend 	= item.KDKANTORA;

		if (grouping !== nopend) {
			no     = 1;
			grouping = nopend;
			tbodyContent.push(
				<React.Fragment key={key}>
					<Table.Row active>
						<Table.Cell colSpan='5' textAlign='center'>{nopend} {item.NamaKtr}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>{no++}</Table.Cell>
						<Table.Cell>{item.KDLAYANAN}</Table.Cell>
						<Table.Cell>{item.namaProduk}</Table.Cell>
						<Table.Cell textAlign='right'>{numberWithCommas(item.jumlah_kantorT)} kantor</Table.Cell>
						<Table.Cell textAlign='center'>
							<Popup 
								content='Lihat detail' 
								trigger={
									<Button icon size='tiny' primary as={Link} to={`/tarif/detail/${nopend}-${item.namaProduk}-${item.KDLAYANAN}`}>
						    			<Icon name='arrow right' />
						  			</Button>
						  		} 
							/>
						</Table.Cell>
					</Table.Row>
				</React.Fragment>);
		}else{
			tbodyContent.push(
				<Table.Row key={key}>
					<Table.Cell>{no++}</Table.Cell>
					<Table.Cell>{item.KDLAYANAN}</Table.Cell>
					<Table.Cell>{item.namaProduk}</Table.Cell>
					<Table.Cell textAlign='right'>{numberWithCommas(item.jumlah_kantorT)} kantor</Table.Cell>
					<Table.Cell textAlign='center'>
						<Popup 
							content='Lihat detail' 
							trigger={
								<Button icon size='tiny' primary as={Link} to={`/tarif/detail/${nopend}-${item.namaProduk}-${item.KDLAYANAN}`}>
					    			<Icon name='arrow right' />
					  			</Button>
					  		} 
						/>
					</Table.Cell>
				</Table.Row>);
		}
	}

	return(
		<Table celled>
			<Table.Header>
			  <Table.Row>
			    <Table.HeaderCell>NO</Table.HeaderCell>
			    <Table.HeaderCell>KD LAYANAN</Table.HeaderCell>
			    <Table.HeaderCell>NAMA LAYANAN</Table.HeaderCell>
			    <Table.HeaderCell textAlign='right'>KANTOR TUJUAN</Table.HeaderCell>
			    <Table.HeaderCell textAlign='center'>TAMBAH</Table.HeaderCell>
			  </Table.Row>
			</Table.Header>
			<Table.Body>{tbodyContent}</Table.Body>
		</Table>
	);
}

class KelolaTarifPage extends React.Component{
	contextRef = React.createRef();
	
	state = {
		stick: false,
		errors: {}
	}

	componentDidMount(){
		this.props.getTarifLayanan()
			.catch(err => this.setState({ errors: err.response.data.errors }))
	}

	render(){
		const { listdata } = this.props;
		return(
		    <div ref={this.contextRef}>
		    	<Navbar>
			    	<Sticky 
			    		context={this.contextRef} 
			    		offset={60}
			    		onStick={() => this.setState({ stick: true })}
			    		onUnstick={() => this.setState({ stick: false })}
			    	>
			    		<div style={{background: '#fff', borderBottom: '1px solid #d6d4d4'}}>
			    			{ this.state.stick && <div style={{paddingBottom: '24px'}} /> }
						    <Grid style={{paddingBottom: 10}}>
								<Grid.Column floated='left' mobile={3} tablet={6} computer={4}>
									<Button animated='vertical' primary fluid as={Link} to="/tarif/tambah">
								      <Button.Content hidden>Tambah Tarif</Button.Content>
								      <Button.Content visible>
								        <Icon name='plus' />
								      </Button.Content>
								    </Button>
								</Grid.Column>
							    <Grid.Column floated='right' mobile={13} tablet={10} computer={12}>
								    <Input
									    icon={<Icon name='search' inverted circular link />}
									    placeholder='Search...'
									    fluid
									/>
								</Grid.Column>
							</Grid>
						</div>
				    </Sticky>
				   	{ listdata.length > 0 && <ListTarif list={listdata} />}
				</Navbar>
		    </div>
		);
	}
}

KelolaTarifPage.propTypes = {
	listdata: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		listdata: state.laporan.tarif.list
	}
}

export default connect(mapStateToProps, { getTarifLayanan })(KelolaTarifPage);
