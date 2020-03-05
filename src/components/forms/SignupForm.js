import React from "react";
import { Form, Button, Select, Message, Segment, Dropdown, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getKantor } from "../../actions/order";
import InlineError from "../InlineError";
import Validator from "validator";
import { Link } from "react-router-dom";
import passwordValidator from "password-validator";

const options = [
  { key: '1', text: '@sampoerna.com', value: '@sampoerna.com' },
  { key: '2', text: '@pni.com', value: '@pni.com' }
]

class SignupForm extends React.Component {
	state = {
		data: {
			nama: '',
			username: '',
			nopend: '',
			password: '',
			nohp: '',
			confPass: ''
		},
		loading: false,
		errors: {},
		lastEmail: '@sampoerna.com'
	}

	componentDidMount(){
		const nopend = '0';
		this.props.getKantor(nopend);
	}

	escapeRegExp = (string) => {
	  return string.replace(/[~`/*+'"?^${}<>()|[\]\\]/g, '')
	}

	onChange = e => {
		const str 	= e.target.value;
		const value = this.escapeRegExp(str); 

		this.setState({ 
			data: { ...this.state.data, [e.target.name]: value }
		})
	}

	onChangeEmail = e => {
		const value = e.target.value;
		this.setState({
			data: { ...this.state.data, username: value }
		})
	}

	handleChange = (e, { value }) => this.setState({ data: {...this.state.data, nopend: value} })

	onSubmit = () => {
		const errors = this.validate(this.state.data, this.state.lastEmail);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			const payload = {
				...this.state.data,
				username: `${this.state.data.username}${this.state.lastEmail}`
			}
			this.setState({ loading: true });
			this.props.submit(payload)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	}

	validate = (data, lastEmail) => {
		const errors = {};
		const schema = new passwordValidator();
		var regex	 =/^[0-9]+$/;

		if (!data.nama) errors.nama = "Harap isi nama lengkap anda";
		if (!data.username) errors.username = "Email masih kosong, harap diisi";
		if (!data.nopend) errors.nopend = "Kantor harap di pilih";
		if (!data.password) errors.password = "Password tidak boleh kosong";
		if (!data.nohp) errors.nohp = "Nomor handphone harap di isi";
		if (!Validator.isEmail(data.username+lastEmail)) errors.username = "Email tidak valid";
		if (data.password !== data.confPass) errors.confPass = "Password tidak sama";

		if (data.password !== '') {
			if (!schema.is().min(6).validate(data.password)){
				errors.password = "Password minimal 6 karakter";	
			}else if(!schema.has().not().spaces().validate(data.password)){
				errors.password = "Password tidak boleh memakai spasi";
			}
		}

		if (data.nohp !== '') {
			if(!data.nohp.match(regex) || data.nohp.length < 10) errors.nohp = "Nomor handphone tidak valid";
		}

		return errors;
	}

	render(){
		const { loading, data, errors } = this.state;
		const { listkantor } = this.props;
		
		return(
			<React.Fragment>
				{ errors.global && <Message negative>
						<Message.Header>Oppps!</Message.Header>
						<p>{errors.global}</p>
				</Message> }
				<Form size='large' onSubmit={this.onSubmit} loading={loading}>
					<Segment stacked>
						<Form.Field>
					        <Form.Input
					          fluid
					          type="text"
					          name="nama"
					          id="nama"
					          label='Nama Lengkap'
					          value={data.nama}
					          onChange={this.onChange}
					          placeholder='Masukan nama lengkap'
					          error={errors.nama}
					          autoComplete="off"
					        />
				        </Form.Field>
				    	<Form.Field error={!!errors.username}>
				    		<label>Email { data.username.length > 0 && <span style={{color: 'blue'}}>({data.username}{this.state.lastEmail})</span> }</label>
					        <Input
					          fluid
					          type="text"
					          name="username"
					          id="username"
					          label={<Dropdown 
					          			options={options} 
					          			value={this.state.lastEmail}
					          			onChange={(e, { value }) => this.setState({ lastEmail: value })}
					          		/>}
					          labelPosition='right'
					          autoComplete="off"
					          value={data.username}
					          onChange={this.onChangeEmail}
					          placeholder='Masukan email'
					        />
					        { errors.username && <span style={{color: '#9f3a38'}}>{errors.username}</span>}
				        </Form.Field>
				        <Form.Field error={!!errors.nopend}>
				        	<label>Pilih Kantor</label>
				        	<Select 
				        		name="nopend"
				        		placeholder='Pilih kantor' 
				        		options={
				        			listkantor.map(data => ({
				        					key: data.kantorid,
				        					value: data.kantorid,
				        					text: data.namakantor
				        				})
				        			)}
				        		onChange={this.handleChange} 
				        	/>
				        	{ errors.nopend && <InlineError text={errors.nopend} /> }
				        </Form.Field>
				        <Form.Field>
					        <Form.Input
					          fluid
					          type="password"
					          name="password"
					          id="password"
					          label='Password'
					          value={data.password}
					          onChange={this.onChange}
					          placeholder='Masukan password anda'
					          error={errors.password}
					        />
					        <p style={{marginTop: '-10px', color: 'teal', fontSize: '12px'}}>Gunakan 6 karakter atau lebih dengan gabungan hurup dan angka!</p>
				        </Form.Field>
				        <Form.Field>
					        <Form.Input
					          fluid
					          type="password"
					          name="confPass"
					          id="confPass"
					          label='Konfirmasi Password'
					          value={data.confPass}
					          onChange={this.onChange}
					          placeholder='Konfirmasi password'
					          error={errors.confPass}
					        />
				        </Form.Field>
				        <Form.Field>
					        <Form.Input
					          fluid
					          type="text"
					          name="nohp"
					          id="nohp"
					          label='Nomor Handphone'
					          value={data.nohp}
					          onChange={this.onChange}
					          placeholder='contoh 0877xxxxxxxx'
					          error={errors.nohp}
					          autoComplete="off"
					        />
				        </Form.Field>
				        <Button fluid color='blue' type='submit'>Signup</Button>
				        <p style={{paddingTop: '12px'}}>kembali login? klik <Link to="/login">disini</Link></p>
					</Segment>
				</Form>
			</React.Fragment>
		);
	}
}

SignupForm.propTypes = {
	getKantor: PropTypes.func.isRequired,
	listkantor: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		listkantor: state.order.kantor
	}
}

export default connect(mapStateToProps, { getKantor })(SignupForm);