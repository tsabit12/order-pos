import React from "react";
import Navbar from "../menu/Navbar";
import PropTypes from "prop-types";
import { Form, Button, Select } from "semantic-ui-react";
import axios from "axios";
import Validator from "validator";
import InlineError from "../InlineError";
import { connect } from "react-redux";
import { addKurir } from "../../actions/kurir";

class AddUserPage extends React.Component {
	state = {
		data: {
			nama: '',
			email: '',
			level: '',
			reg: '',
			kprk: '',
			nohp: ''
		},
		optionsLevel: [],
		optionsReg: [],
		optionsKprk: [],
		errors: {},
		loading: false
	}

	componentDidMount(){
		axios.post(`${process.env.REACT_APP_API}/kurir/getRegional`)
		.then(res => res.data.result)
		.then(result => {
			const optionsReg = [];
			result.forEach(data => {
				optionsReg.push({
					key: data.id_wilayah,
					value: data.nopend,
					text: data.wilayah
				})
			});
			this.setState({ optionsReg })
		}).catch(err => alert("cannot get kantor, try again later"))
	}

	onChange = (e) => this.setState({ data: { ...this.state.data, [e.target.name] : e.target.value }})
	
	onClickLevel = () => {
		axios.post(`${process.env.REACT_APP_API}/kurir/getLevel`)
		.then(res => res.data.result)
		.then(data => {
			const optionsLevel = [];
			data.forEach(list => {
				optionsLevel.push({
					key: list.id_level,
					value: list.id_level,
					text: list.deskripsi
				})
			});
			this.setState({ optionsLevel });
		})
		.catch(err => alert(err));
	}

	onChangeLevel = (e, { value }) => this.setState({ data: { ...this.state.data, level: value } })

	onChangereg = (e, { value }) => {
		this.setState({ data: { ...this.state.data, reg: value }});
		axios.post(`${process.env.REACT_APP_API}/kurir/getKprk`, { wilayah: value } )
		.then(res => res.data.result)
		.then(result => {
			const optionsKprk = [];
			result.forEach(data => {
				optionsKprk.push({
					key: data.nopend,
					value: data.nopend,
					text: data.nopend+' - '+data.NamaKtr
				})
			});
			this.setState({ optionsKprk });
		})
	}

	onChangeKprk = (e, { value }) => this.setState({ data: { ...this.state.data, kprk: value }})

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading : true });
			this.props.addKurir(this.state.data)
				.then(() => this.props.history.push("/user"))
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	}

	validate = (data) => {
		const errors = {};
		if (!data.nama) errors.nama = "Nama lengkap tidak boleh kosong";
		if (!Validator.isEmail(data.email)) errors.email = "Email tidak valid";
		if (!data.reg) errors.reg = "Regional belum dipilih";
		if (!data.kprk) errors.kprk = "KPRK belum dipilih";
		if (!data.level) errors.level = "Level user belum di pilih";
		if (!data.nohp) errors.nohp = "Nomor handphone harap di isi";
		return errors;
	}

	render(){
		const { data, errors, loading } = this.state;
		return(
			<Navbar>
				<Form onSubmit={this.onSubmit} loading={loading}>
					<Form.Group widths="equal">
						<Form.Field>
							<Form.Input 
								label='Nama Lengkap'
								type='text'
								name='nama'
								id='nama'
								autoComplete="off"
								value={data.nama}
								onChange={this.onChange}
								error={errors.nama}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Input 
								label='Email'
								type='text'
								name='email'
								id='email'
								autoComplete="off"
								value={data.email}
								onChange={this.onChange}
								error={errors.email}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Group widths='equal'>
						<Form.Field error={!!errors.reg}>
			    			<label>Regional</label>
				    			<Select 
				    				name='reg'
				    				id='reg'
				    				placeholder="Pilih Regional"
				    				value={data.reg}
				    				options={this.state.optionsReg}
				    				onClick={this.onClickReg}
				    				onChange={this.onChangereg}
				    			/>
				    			{ errors.reg && <InlineError text={errors.reg} /> }
			    		</Form.Field>
			    		<Form.Field error={!!errors.kprk}>
			    			<label>KPRK</label>
				    			<Select 
				    				name='kprk'
				    				id='kprk'
				    				placeholder="Pilih Regional"
				    				value={data.kprk}
				    				options={this.state.optionsKprk}
				    				onChange={this.onChangeKprk}
				    			/>
				    			{ errors.kprk && <InlineError text={errors.kprk} /> }
			    		</Form.Field>
						<Form.Field error={!!errors.level}>
			    			<label>Level</label>
				    			<Select 
				    				name='level'
				    				id='level'
				    				placeholder="Pilih level"
				    				value={data.level}
				    				options={this.state.optionsLevel}
				    				onClick={this.onClickLevel}
				    				onChange={this.onChangeLevel}
				    			/>
				    			{ errors.level && <InlineError text={errors.level} /> }
			    		</Form.Field>
			    		<Form.Field>
							<Form.Input 
								label='Nomor Handphone'
								type='text'
								name='nohp'
								id='nohp'
								autoComplete="off"
								value={data.nohp}
								onChange={this.onChange}
								error={errors.nohp}
							/>
						</Form.Field>
					</Form.Group>
					<Button primary fluid>Tambah</Button>
				</Form>
			</Navbar>
		);
	}
}

AddUserPage.propTypes = {
	addKurir: PropTypes.func.isRequired
}

export default connect(null, { addKurir })(AddUserPage);