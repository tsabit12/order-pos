import React from "react";
import PropTypes from "prop-types";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import { getKurir } from "../../actions/kurir";
import { setProgressBar } from "../../actions/progress";
import { Segment, Form, Button, Select } from "semantic-ui-react";
import axios from "axios";
import ListKurir from "../list/ListKurir";

class UserPage extends React.Component {
	state = {
		optionsKprk: [
			{ key: '01', value: '01', text: 'SEMUA KPRK' }
		],
		optionsReg: [
			{ key: '00', value: '00', text: 'NASIONAL' }
		],
		optionsLevel: [
			{ key: '00', value: '00', text: 'SEMUA LEVEL' }
		],
		data: {
			reg: '00',
			kprk: '01',
			level: '00'
		},
		loading: false
	}

	componentWillMount(){
		this.props.setProgressBar(true);
		this.props.getKurir(this.state.data)
			.then(() => this.props.setProgressBar(false))
	}

	onClickReg = () => {
		axios.post(`${process.env.REACT_APP_API}/kurir/getRegional`)
			.then(res => res.data.result)
			.then(result => {
				const options = [{ key: '00', value: '00', text: 'NASIONAL' }];
				result.forEach(data => {
					options.push({
						key: data.id_wilayah,
						value: data.nopend,
						text: data.wilayah
					})
				});
				this.setState({ ...this.state, optionsReg: options })
			}).catch(err => alert("cannot get kantor, try again later"))
	}

	onChangeReg = (e, { value }) => {
		this.setState({ data: { ...this.state.data, reg: value } });
		axios.post(`${process.env.REACT_APP_API}/kurir/getKprk`, { wilayah: value } )
			.then(res => res.data.result)
			.then(result => {
				const options = [{ key: '01', value: '01', text: 'SEMUA KPRK' }];
				result.forEach(data => {
					options.push({
						key: data.nopend,
						value: data.nopend,
						text: data.nopend+' - '+data.NamaKtr
					})
				});
				this.setState({ ...this.state, optionsKprk: options });
			})
	}

	onChangeKprk = (e, { value }) => this.setState({ data: {...this.state.data, kprk: value} })

	onSubmit = () => {
		this.setState({ loading: true });
		this.props.getKurir(this.state.data)
			.then(() => this.setState({ loading: false }))
	}

	getRefLevel = () => {
		axios.post(`${process.env.REACT_APP_API}/kurir/getLevel`)
			.then(res => res.data.result)
			.then(data => {
				const optionsLevel = [{ key: '00', value: '00', text: 'SEMUA LEVEL' }];
				data.forEach(list => {
					optionsLevel.push({
						key: list.id_level,
						value: list.id_level,
						text: list.deskripsi.toUpperCase()
					})
				});
				this.setState({ optionsLevel });
			})
			.catch(err => alert(err));
	}

	onChangeLevel = (e, { value }) => this.setState({ data: { ...this.state.data, level: value } });

	render(){
		const { listKurir } = this.props;
		console.log(this.state.data);
		return(
			<Navbar>
				<Segment.Group stacked>
				    <Segment>
				    	<Form onSubmit = {this.onSubmit} loading={this.state.loading}>
				    		<Form.Group widths='equal'>
					    		<Form.Field>
					    			<label>Regional</label>
					    			<Select 
					    				name='reg'
					    				id='reg'
					    				defaultValue='00'
					    				options={this.state.optionsReg}
					    				onClick={this.onClickReg}
					    				onChange={this.onChangeReg}
					    			/>
					    		</Form.Field>
					    		<Form.Field>
					    			<label>KPRK</label>
					    			<Select 
					    				name='kprk'
					    				id='kprk'
					    				defaultValue='01'
					    				options={this.state.optionsKprk}
					    				onChange={this.onChangeKprk}
					    			/>
					    		</Form.Field>
					    		<Form.Field>
					    			<label>LEVEL USER</label>
					    			<Select 
					    				name='level'
					    				id='level'
					    				defaultValue={this.state.data.level}
					    				options={this.state.optionsLevel}
					    				onChange={this.onChangeLevel}
					    				onClick={this.getRefLevel}
					    			/>
					    		</Form.Field>
				    		</Form.Group>
				    		<Button primary fluid>Tampilkan</Button>
				    	</Form>
				    </Segment>
				    <Segment>
				    	<ListKurir listdata={listKurir} />
				    </Segment>
				</Segment.Group>
			</Navbar>
		);
	}
}

UserPage.propTypes = {
	setProgressBar: PropTypes.func.isRequired,
	getKurir: PropTypes.func.isRequired,
	listKurir: PropTypes.array.isRequired
}

function mapStateProps(state) {
	return{
		listKurir: state.petugas.kurir
	}
}

export default connect(mapStateProps, { getKurir, setProgressBar })(UserPage);