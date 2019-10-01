import React from "react";
import PropTypes from "prop-types";
import Navbar from "../menu/Navbar";
import { connect } from "react-redux";
import { getKurir, clearKurir } from "../../actions/kurir";
import { setProgressBar } from "../../actions/progress";
import { Segment, Form, Button, Select } from "semantic-ui-react";
import axios from "axios";
import ListKurir from "../list/ListKurir";

class KurirPage extends React.Component {
	state = {
		optionsKprk: [
			{ key: '01', value: '01', text: 'SEMUA KPRK' }
		],
		optionsReg: [
			{ key: '00', value: '00', text: 'NASIONAL' }
		],
		data: {
			reg: '00',
			kprk: ''
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

KurirPage.propTypes = {
	setProgressBar: PropTypes.func.isRequired,
	getKurir: PropTypes.func.isRequired,
	listKurir: PropTypes.array.isRequired,
	clearKurir: PropTypes.func.isRequired
}

function mapStateProps(state) {
	return{
		listKurir: state.petugas.kurir
	}
}

export default connect(mapStateProps, { getKurir, setProgressBar, clearKurir })(KurirPage);