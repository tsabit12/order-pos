import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Modal, Button, Form, Select, Message } from "semantic-ui-react";
import api from "../../api";

class ModalMapping extends React.Component{
	state = {
		item: {
			kantor_id: '',
			nopend: '',
			regional: '',
			namakantor: '',
			page: 0,
			RowNum: 0
		},
		opsiKprk: [],
		errors: {}
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		// console.log(nextProps.item);
		const { item } = nextProps;
		if (nextProps.item) {
			this.setState({ 
				item: { 
					...this.state.item, 
					nopend: item.nopend, 
					regional: item.idwilayah,
					namakantor: item.namakantor,
					kantor_id: item.kantor_id,
					page: nextProps.page,
					RowNum: item.RowNum
				},
				errors: {}
			});

			api.mapping.getKprk(item.idwilayah)
				.then(res => {
					const opsiKprk = [];
					res.forEach(x => {
						opsiKprk.push({
							key: x.nopend,
							value: x.nopend,
							text: `${x.nopend} - ${x.NamaKtr}`
						});
					});
					this.setState({ opsiKprk });
				}).catch(err => alert("Terdapat kesalahan"))
		}

	}

	onChange = (e) => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value }})

	onChangeReg = (e, { value }) => {
		this.setState({ item: { ...this.state.item, nopend: '', regional: value }});
		api.mapping.getKprk(value)
			.then(res => {
				const opsiKprk = [];
				res.forEach(x => {
					opsiKprk.push({
						key: x.nopend,
						value: x.nopend,
						text: `${x.nopend} - ${x.NamaKtr}`
					});
				});
				this.setState({ opsiKprk });
			}).catch(err => alert("Something wrong"));
	}

	onChangeKprk = (e, { value }) => this.setState({ item: { ...this.state.item, nopend: value }})

	submit = () => {
		const errors = this.validate(this.state.item);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			const { item } = this.state;
			const payload = {
				kantorId: item.kantor_id,
				nopend: item.nopend,
				page: item.page,
				RowNum: item.RowNum
			};
			this.props.update(payload)
				.then(() => this.setState({ loading: false }))
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	}

	validate = (data) => { 
		const errors = {};
		if (!data.nopend) errors.nopend = "Kantor mapping belum dipilih";
		return errors;
	}

	render(){
		const { open, close, opsiReg } = this.props;
		const { item, errors, loading } = this.state;
		
		return( 
			<Modal size='small' open={open}>
	          <Modal.Header>Update Mapping Kantor</Modal.Header>
	          <Modal.Content>
	          	{ errors.global && <Message negative>
					<Message.Header>Oppps!</Message.Header>
					<p>{errors.global}</p>
				</Message> }
	          	<Form loading={loading}>
	            	<Form.Field>
	            		<Form.Input 
	            			label='Nama Kantor'
	            			type='text'
	            			name='namakantor'
	            			id='namakantor'
	            			value={item.namakantor}
	            			onChange={this.onChange}
	            			autoComplete='off'
	            			readOnly={true}
	            		/>
	            	</Form.Field>
		            <label style={{fontSize: '.92857143em', fontWeight: '700'}}>Mapping ke kantor</label>
	            	<Form.Group widths='equal'>
		            	<Form.Field error={!!errors.nopend}>
		            		<Select 
		            			placeholder='Pilih regional' 
		            			options={opsiReg}
		            			value={item.regional}
		            			onChange={this.onChangeReg}
		            		/>
		            	</Form.Field>
		            	<Form.Field error={!!errors.nopend}>
		            		<Select 
		            			placeholder='Pilih kprk' 
		            			options={this.state.opsiKprk}
		            			value={item.nopend}
		            			onChange={this.onChangeKprk}
		            		/>
		            	</Form.Field>
	            	</Form.Group>
		            { errors.nopend && <span style={{ color: '#ae5856', marginTop: '-10px', display: 'block'}}>{errors.nopend}</span>}
	            </Form>
	          </Modal.Content>
	          <Modal.Actions>
	            <Button negative onClick={() => close()}>No</Button>
	            <Button
	              positive
	              onClick={this.submit}
	              icon='checkmark'
	              labelPosition='right'
	              content='Yes'
	            />
	          </Modal.Actions>
	        </Modal>
		);
	}
}

ModalMapping.propTypes = {
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	opsiReg: PropTypes.array.isRequired,
	update: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
	if (props.open) {
		const page = `page${props.page}`;
		return{
			item: state.mapping.pages[page].find(x => x.kantor_id === props.id)
		}
	}else{
		return{
			item: {}
		}
	}
}

export default connect(mapStateToProps, null)(ModalMapping);