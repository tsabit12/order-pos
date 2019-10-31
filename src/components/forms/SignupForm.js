import React from "react";
import { Form, Button, Select, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getKantor } from "../../actions/order";
import InlineError from "../InlineError";
import Validator from "validator";
import { Link } from "react-router-dom";
import passwordValidator from "password-validator";


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
		errors: {}
	}

	componentDidMount(){
		const nopend = '0';
		this.props.getKantor(nopend);
	}

	onChange = e => this.setState({ 
		data: { ...this.state.data, [e.target.name]: e.target.value }
	})

	handleChange = (e, { value }) => this.setState({ data: {...this.state.data, nopend: value} })

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	}

	validate = (data) => {
		const errors = {};
		const schema = new passwordValidator();
		var regex	 =/^[0-9]+$/;

		if (!data.nama) errors.nama = "Harap isi nama lengkap anda";
		if (!data.username) errors.username = "Email masih kosong, harap diisi";
		if (!data.nopend) errors.nopend = "Kantor harap di pilih";
		if (!data.password) errors.password = "Password tidak boleh kosong";
		if (!data.nohp) errors.nohp = "Nomor handphone harap di isi";
		if (!Validator.isEmail(data.username)) errors.username = "Email tidak valid";
		if (data.password !== data.confPass) errors.confPass = "Password tidak sama";

		if (data.password !== '') {
			if (!schema.is().min(6).validate(data.password)){
				errors.password = "Password minimal 6 karakter";	
			}else if(!schema.has().not().spaces().validate(data.password)){
				errors.password = "Password tidak boleh memakai spasi";
			}
		}

		if (data.nohp !== '') {
			if(!data.nohp.match(regex) || data.nohp.length < 12) errors.nohp = "Nomor handphone tidak valid";
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
				<Message
			      attached
			      positive
			      header='Halaman Registrasi'
			    />
				<Form className='attached fluid segment' onSubmit={this.onSubmit} loading={loading}>
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
				        />
			        </Form.Field>
			    	<Form.Field>
				        <Form.Input
				          fluid
				          type="text"
				          name="username"
				          id="username"
				          label='Email'
				          autoComplete="off"
				          value={data.username}
				          onChange={this.onChange}
				          placeholder='Masukan email, contoh example@example.com'
				          error={errors.username}
				        />
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
			        <Form.Group widths='equal'>
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
			        </Form.Group>
			        <Form.Field>
				        <Form.Input
				          fluid
				          type="text"
				          name="nohp"
				          id="nohp"
				          label='Nomor Handphone'
				          value={data.nohp}
				          onChange={this.onChange}
				          placeholder='Masukan Nomor Handphone contoh 087766661111'
				          error={errors.nohp}
				          autoComplete="off"
				        />
			        </Form.Field>
			        <Button color='blue' type='submit'>Signup</Button>
			    </Form>
			    <Message attached='bottom' warning>
				    Kembali ke login? <Link to="/login">disini</Link>
				</Message>
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