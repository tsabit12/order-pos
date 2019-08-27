import React from "react";
import Navbar from "../menu/Navbar";
import { Segment, Header, Form, Button, Icon, Divider, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { entriPo } from "../../actions/order";
import HasilEntriPo from "../list/HasilEntriPo";

class EntriPoPage extends React.Component {
	state = {
		data: {
			desc: '',
			tglStart: '',
			tglDone: '',
			money: '',
			noPo: ''
		},
		loading: false,
		errors: {}
	}

	onChange = e => this.setState({ 
		data: { ...this.state.data, [e.target.name]: e.target.value }
	})

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })
			this.props.entriPo(this.state.data)
				.then(() => this.setState({ loading: false }))
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.desc) errors.desc = "Deskripsi harap di isi";
		if (!data.tglStart) errors.tglStart = "Tanggal mulai harap di isi";
		if (!data.tglDone) errors.tglDone = "Tanggal selesai harap di isi";
		if (!data.money) errors.money = "Jumlah uang harap di isi";
		if (!data.noPo) errors.noPo = "Nomor PO tidak boleh kosong";
		
		return errors;
	}

	render(){
		const { data, errors, loading } = this.state;

		return(
			<Navbar>
				<Segment.Group raised>
				    <Segment>
					    <Header as='h2'>
						    <Icon name='address card outline' />
						    <Header.Content>Halaman Entri PO</Header.Content>
						</Header>
					    <Divider clearing />
					     <Form loading={loading} onSubmit={this.onSubmit}>
					     	<Form.Group widths='equal'>
							    <Form.Input 
							    	type="text"
							    	name="noPo"
							    	id="noPo"
							    	label='Nomor PO' 
							    	placeholder='Masukan nomor PO' 
							    	value={data.noPo}
							    	onChange={this.onChange}
							    	error={errors.noPo}
							    />
							    <Form.Input 
							    	type="text"
							    	name="desc"
							    	id="desc"
							    	label='Deskripsi' 
							    	placeholder='Masukan deskripsi' 
							    	value={data.desc}
							    	onChange={this.onChange}
							    	error={errors.desc}
							    />
						    </Form.Group>
						    <Form.Group widths='equal'>
							    <Form.Input 
							    	type="text"
							    	name="tglStart"
							    	id="tglStart"
							    	label='Tanggal Awal' 
							    	placeholder='YYYY-MM-DD' 
							    	value={data.tglStart}
							    	onChange={this.onChange}
							    	error={errors.tglStart}
							    />
							    <Form.Input 
							    	type="text"
							    	name="tglDone"
							    	id="tglDone"
							    	label='Tanggal Selesai' 
							    	placeholder='YYYY-MM-DD' 
							    	value={data.tglDone}
							    	onChange={this.onChange}
							    	error={errors.tglDone}
							    />	
							    <Form.Input 
							    	type="number"
							    	name="money"
							    	id="money"
							    	label='Jumlah Uang' 
							    	placeholder='Masukan jumlah uang' 
							    	value={data.money}
							    	onChange={this.onChange}
							    	error={errors.money}
							    />
						    </Form.Group>
						    <Button secondary>Tambah</Button>
						 </Form>
						 { errors.global && <Message negative>
							<Message.Header>Maaf!</Message.Header>
							<p>{errors.global}</p>
						</Message> }

						<Divider />
						<HasilEntriPo listdata={this.props.hasilentri} />
					 </Segment>
				</Segment.Group>
			</Navbar>
		);
	}
}

EntriPoPage.propTypes = {
	entriPo: PropTypes.func.isRequired,
	hasilentri: PropTypes.array.isRequired
}

function mapStateToProps(state){
	return{
		hasilentri: state.order.entripo
	}
}

export default connect(mapStateToProps, { entriPo })(EntriPoPage);