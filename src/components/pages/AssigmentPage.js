import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAssigment, addAssigment } from "../../actions/assigment";
import { setProgressBar } from "../../actions/progress";
import PageNotFound from "./PageNotFound";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Checkbox, Button, Modal, Select, Form, Message } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

const Empty = () => (
	<Message
	    warning
	    header='Kosong'
	    content='Data assignment tidak ditemukan'
	/>
);


class AssigmentPage extends React.Component {
	state = {
		data: [],
		open: false,
		petugas: '',
		opsiPetugas: [],
		loading: false,
		errors: {},
		loadingSubmit: false,
		nopickup: '',
		success: false
	}

	componentDidMount(){
		const { nopend, level } = this.props.auth; 
		if (level === '01') {
			this.props.setProgressBar(true);
			this.props.fetchAssigment(nopend)
				.then(() => this.props.setProgressBar(false))
				.catch(() => {
					this.props.setProgressBar(false);
					alert("Terdapat kesalahan");
				});
		}
	}

	handleChange = (e, data) => {
		if (data.checked) {
			this.setState({ data: [ ...this.state.data, data.id ]});
		}else{ //remove data
			var array = [...this.state.data];
			var index = array.indexOf(data.id);
			if (index !== -1) {
			    array.splice(index, 1);
			    this.setState({data: array });
			}
		}
		
	}

	submit = () => {
		this.setState({ open: true, loading: true, errors: {}, petugas: '' });
		const { nopend } = this.props.auth;

		axios.post(`${process.env.REACT_APP_API}/order/getPetugasPickup`, {
	    	nopend: nopend
	    }).then(res => res.data.result)
	    .then(result => {
	    	const opsiPetugas = [];
	    	result.forEach(x => {
	    		opsiPetugas.push({
	    			key: x.id_petugas,
	    			value: x.id_petugas,
	    			text: x.kprk+' - '+x.nama_petugas
	    		})
	    	});
	    	this.setState({ opsiPetugas, loading: false });
	    }).catch(err =>  {
	    	this.setState({ loading: false });
	    	alert("Terdapat kesalahan");	
	    });
	}

	close = () => this.setState({ open: false })

	onChangePetugas = (e, { value }) => this.setState({ petugas: value })

	submitPost = () => {
		const errors = this.validate(this.state.petugas);
		this.setState({ errors });
		if(Object.keys(errors).length === 0){
			this.setState({ loadingSubmit: true });
			const data = {
				noreq: this.state.data,
				petugasId: this.state.petugas,
				nama: this.props.auth.nama,
				nopend: this.props.auth.nopend
			};
			this.props.addAssigment(data)
				.then(res => {
					this.setState({ open: false, loadingSubmit: false, nopickup: res.data.nopickup, success: true  });
					this.download(res.data.no_pickup);
				})
				.catch(err => {
					this.setState({ loadingSubmit: false });
					alert(err);
				})
		}
	}

	validate = (petugas) => {
		const errors = {};
		if (!petugas) errors.petugas = "Petugas pickup belum dipilih";
		return errors;
	}	

	download = (nopickup) => {
		axios.get(`${process.env.REACT_APP_API}/postAssigment/downloadTugas`, {
			params: { nopickup: nopickup },
			responseType: 'arraybuffer'
		}).then(res => {
			console.log(res.data);
			let blob = new Blob([res.data], { type: 'application/pdf' }),
		  	url = window.URL.createObjectURL(blob)
		  	window.open(url) 
		});
	}

	render(){
		const { level } = this.props.auth;
		const { dataAssigment } = this.props;
		const { errors, success } = this.state;
		const columns = [{
		    Header: 'NOMOR REQUEST',
		    accessor: 'no_request' // String-based value accessors!
		  }, {
		    Header: 'TANGGAL REQUEST',
		    accessor: 'tgl_request'
		  }, {
		    Header: 'KANTOR',
		    accessor: 'namakantor'
		  }, {
		    Header: props => <span>KOTA</span>, // Custom header components!
		    accessor: 'city'
		  },{
		  	Header: 'JUMLAH',
		  	accessor: 'jumlah'
		  },{
		  	Header: 'ASSIGN',
		  	Cell: row => {
		  		const { original } = row;
		  		var found = this.state.data.find(x => x === original.no_request);
		  		return(
		  			<Checkbox 
		          		name={original.no_request}
		          		id={original.no_request}
		          		checked={original.no_request === found}
		          		onClick={this.handleChange}
		          	/>
		  		);
		  	}
		  }
		];

		return(
			<React.Fragment>
				<Modal size='tiny' open={this.state.open} centered={false}>
		          <Modal.Header>Pilih petugas pickup</Modal.Header>
		          <Modal.Content>
		          	<Form loading={this.state.loading}>
			          	<Form.Field error={!!errors.petugas}>
			          		<label>Petugas Pickup</label>
				            <Select 
				            	fluid
				            	placeholder='Pilih petugas' 
				            	options={this.state.opsiPetugas}
				            	value={this.state.petugas} 
				            	onChange={this.onChangePetugas}
				            />
				            { errors.petugas && <span style={{ color: "#ae5856"}}>{errors.petugas}</span> }
			            </Form.Field>
		            </Form>
		          </Modal.Content>
		          <Modal.Actions>
		            <Button negative onClick={this.close}>No</Button>
		            <Button
		              positive
		              icon='checkmark'
		              labelPosition='right'
		              content='Yes'
		              loading={this.state.loadingSubmit}
		              onClick={this.submitPost}
		            />
		          </Modal.Actions>
		        </Modal>
				{ level === '01' ? <Navbar>
					{ dataAssigment.length === 0 ? <Empty /> : 
						<React.Fragment>
							{ success && <div className="ui icon message">
							  <i aria-hidden="true" className="check icon"></i>
							  <div className="content">
							    <div className="header">Assigment Sukses!</div>
							    <p>Pdf tidak muncul? Klik <Link to="/assigment" onClick={() => this.download(this.state.nopickup)}>disini</Link> untuk cetak ulang surat tugas.</p>
							  </div>
							</div> }

							<ReactTable
							    data={dataAssigment}
							    columns={columns}
							    defaultPageSize={10}
							    style={{textAlign:"center"}}
							/> 
							{ this.state.data.length > 0 && 
								<Button 
									fluid 
									style={{marginTop: '10px'}} 
									primary
									onClick={this.submit}>Assign</Button> }
						</React.Fragment>
					}
				</Navbar> : <PageNotFound />}

			</React.Fragment>
		);
	}
}

AssigmentPage.propTypes = {
	auth: PropTypes.object.isRequired,
	setProgressBar: PropTypes.func.isRequired,
	fetchAssigment: PropTypes.func.isRequired,
	dataAssigment: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		auth: state.user,
		dataAssigment: state.order.assigment
	}
}

export default connect(mapStateToProps, { fetchAssigment, setProgressBar, addAssigment })(AssigmentPage);