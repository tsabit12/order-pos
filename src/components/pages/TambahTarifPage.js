import React from "react";
import Navbar from "../menu/Navbar";
import { Link } from "react-router-dom";
import { Breadcrumb, Divider, Grid, Segment, List, Form, Button, Select, Modal, Message } from 'semantic-ui-react';
import { connect } from "react-redux";
import { getListWilayah, getRefLayanan, setLoading } from "../../actions/tarif";
import PropTypes from "prop-types";
import api from "../../api";

const RenderKprk = ({ list, value, onChange, name }) => {
	let options = [];
	if (list.length > 0) {
		options = list;
	}else{
		options = [{
			key: '0',
			value: '00',
			text: 'Loading..'
		}]
	}

	return(
		<Form.Field>
			<label>Kprk</label>
			<Select 
				name={name}
				placeholder='Pilih kprk'
				options={options}
				value={value}
				onChange={(e, val) => onChange(e, val)}
			/>
		</Form.Field>
	)
}

const Description = ({ onReadMore, readMore }) => (
  <Segment>
    <p style={{fontSize: '15px', fontWeight: 'bold', paddingBottom: '0'}}>Petunjuk Pengisian Tarif</p>	
    <List.Item as='li' style={{marginTop: '-8px'}}>
    	<span style={{color: '#4485d0'}}>Tarif dengan 1 tingkat berat</span>
    </List.Item>
    <div style={{marginLeft: '30px'}}>
     	<p align='justify'>
     		Pengisian tarif dengan kelipatan <b>0</b>
     		<br/>Contoh format berat dan tarif yang diinginkan yaitu: 
     		<br/>berat <b>100|-</b> dengan tarif<b> 2500|0</b> 
     		<br/>Matrik diatas dapat dibaca sebagai berikut: <br/>Untuk berat <b>0 - 100 gram</b> didapatkan tarif <b>2500.</b> Dan untuk berat > <b>100 gram</b> 
     		&nbsp;tidak mendapatkan tarif atau <b>0</b>
     	</p>
    </div>
    <List.Item as='li' style={{marginTop: 5}}>
    	<span style={{color: '#4485d0'}}>Tarif dengan menggunakan kelipatan</span>
    </List.Item>
    <div style={{marginLeft: '30px'}}>
     	<p align='justify'>
     		Pengisian tarif dengan kelipatan <b>1000</b> 
     		<br />Contoh format berat dan tarif yang diinginkan yaitu:
     		<br />berat <b>2000|5000</b> dengan tarif <b>19500|5000</b>
     		<br />Matrik diatas dapat dibaca sebagai berikut:
     		<br />Untuk berat <b>0 - 2000 gram</b> didapatkan tarif <b>19500.</b> Dan untuk berat > <b>2000 gram</b> dengan kelipatan <b>1000 gram</b>
     		&nbsp;berikutnya ditambahkan tarif <b>5000</b> Contohnya : untuk berat <b>2001 - 3000 gram</b> mendapatkan tarif <b>19500</b> + <b>5000</b>
     		&nbsp;= <b>24500</b> dan seterusnya seperti itu :)
     	</p>
     	
     		{ !readMore && <p>
     			Sampai disini paham?&nbsp; 
     				<span style={{color: '#4485d0', cursor: 'pointer'}} onClick={() => onReadMore()}>lanjut kak...</span>
     		</p> }
     </div>
     { readMore && <div style={{marginTop: 10}}>
     	<p>Oke kita lanjut besok yaa :*</p> 
     </div> }
  </Segment>
);

const RenderModal = ({ visible, closeModal, simpan }) => (
	<Modal size='mini' open={visible} onClose={() => closeModal()}>
      <Modal.Header>Notifikasi</Modal.Header>
      <Modal.Content>
        <p>Apakah anda yakin untuk menambah data tarif?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => closeModal()}>Batal</Button>
        <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content='Yes'
          onClick={() => simpan()}
        />
      </Modal.Actions>
    </Modal>
);

class TambahTarifPage extends React.Component{
	regAsalRef = React.createRef();
	state = {
		readMore: false,
		mount: false,
		data: {
			layanan: '0',
			regAsal: '0',
			regTujuan: '0',
			kprkAsal: '00',
			kprkTujuan: '00',
			berat: 0,
			kelipatan: 0,
			tarif: 0
		},
		listKprkAsal: [],
		listKprkTujuan: [],
		tmpBerat: '',
		tempTarif: '',
		modal: false,
		errors: {}
	}

	UNSAFE_componentWillMount(){
		this.props.getRefLayanan()
			.catch(err => { 
				console.log(err);
			})
		this.setState({ mount: true });
	}

	componentDidMount(){
		if (this.state.mount) {
			this.props.getListWilayah()
				.catch(err => console.log(err));
		}
	}

	numberWithCommas = (number) => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}

	onChange = (e) => {
		var val = e.target.value.replace(/\D/g, '');
		var x 	= Number(val);
		const value = this.numberWithCommas(x);
		this.setState({ data: { ...this.state.data, [e.target.name]: value }})
	}

	renderOptiosnLayanan = () => {
		const result = [];
		const { listLayanan } = this.props;
		if (listLayanan.length > 0) {
			result.push({
				key: '0',
				text: 'Pilih layanan',
				value: '0'
			});
			listLayanan.forEach(x => {
				result.push({
					key: x.idmproduk_pks,
					text: x.namaProduk,
					value: x.idmproduk_pks
				})
			})
		}else{
			result.push({
				key: '0',
				text: 'Loading...',
				value: '0'
			})
		}
		return result;
	}

	renderListWilayah = () => {
		const result = [];
		const { listWilayah } = this.props;
		if (listWilayah.length > 0) {
			result.push({
				key: '0',
				text: 'Pilih wilayah',
				value: '0'
			});
			listWilayah.forEach(x => {
				result.push({
					key: x.id_wilayah,
					text: x.wilayah,
					value: x.nopend
				})
			});
		}else{
			result.push({
				key: '0',
				text: 'Loading...',
				value: '0'
			});
		}

		return result;
	}

	getKprk = (value, jenis, name, listkprk) => {
		if (jenis === 1) {
			this.setState({ 
				data: { 
					...this.state.data, 
					[name]: value,
					kprkAsal: '00'
				},
				listKprkAsal: [],
				errors: {
					...this.state.errors,
					[name]: undefined
				}
			});		
		}else{
			this.setState({ 
				data: { 
					...this.state.data, 
					[name]: value,
					kprkTujuan: '00'
				},
				listKprkTujuan: [],
				errors: {
					...this.state.errors,
					[name]: undefined
				}
			});
		}

		api.mapping.getKprk(value)
		.then(res => {
			res.forEach(x => {
				listkprk.push({
					key: x.nopend,
					text: x.NamaKtr,
					value: x.nopend
				});
			})
			if (jenis === 1) {
				this.setState({ listKprkAsal: listkprk });
			}else{
				this.setState({ listKprkTujuan: listkprk });
			}
		})
	}

	onChangeOptions = (e, { value, name }) => {
		if (name === 'regAsal') {
			const listKprkAsal = [{ key: '0', text: 'SEMUA KPRK', value: '00'}];
			this.getKprk(value, 1, name, listKprkAsal)
		}else if (name === 'regTujuan') {
			const listKprkAsal = [{ key: '0', text: 'SEMUA KPRK', value: '00'}];
			this.getKprk(value, 2, name, listKprkAsal)
		}else{
			this.setState({ 
				data: { ...this.state.data, [name]: value },
				errors: {
					...this.state.errors,
					[name]: undefined
				}
			});
		}
	}

	onLanjut = () => {
	 	if (!this.state.tmpBerat) {
	 		const values = `${this.state.data.berat}|`;
	 		const valuesTarif = `${this.state.data.tarif}|`;
	 		this.setState({ 
	 			tmpBerat: values, 
	 			tempTarif: valuesTarif,
	 			data: {
	 				...this.state.data,
	 				berat: 0,
	 				tarif: 0
	 			}
	 		})
	 	}else{
	 		const values = `${this.state.tmpBerat}${this.state.data.berat}|`
	 		const values2 = `${this.state.tempTarif}${this.state.data.tarif}|`
			this.setState({ 
				tmpBerat: values, 
				tempTarif: values2,
				data: {
	 				...this.state.data,
	 				berat: 0,
	 				tarif: 0
	 			}
			});
	 	}
	}

	onReset = () => this.setState({ tmpBerat: '', tempTarif: ''})

	onSave = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ modal: true });
		}
	}

	validate = (data) => {
		const errors = {}
		if (data.regAsal === '0') errors.regAsal = "Pilih kantor asal";
		if (data.regTujuan === '0') errors.regTujuan = "Pilih kantor Tujuan";
		if (data.layanan === '0') errors.layanan = "Pilih layanan";
		return errors;
	}

	onSubmit = () => {
		this.setState({ modal: false, errors: {} });
		this.props.setLoading(true);
		const { data } = this.state;
		const beratValues = this.state.tmpBerat.slice(0,-1); //remove last character
		const tarifValues = this.state.tempTarif.slice(0,-1); //remove last character
		const payload = {
			kdkantora: data.kprkAsal === '00' ? data.regAsal : data.kprkAsal,
			kdkantort: data.kprkTujuan === '00' ? data.regTujuan : data.kprkTujuan,
			nippos: this.props.userid,
			kdlayanan: data.layanan,
			beratLayanan: beratValues.replace(/\./g,''),
			tarifLayanan: tarifValues.replace(/\./g,''),
			kelipatan: data.kelipatan.replace(/\./g,'')
		};
		api.tarif.addTarif(payload)
			.then(() => {
				this.props.setLoading(false);	
				this.props.history.push("/tarif");
			})
			.catch(err => {
				window.scrollTo(0, 0);
				this.props.setLoading(false);
				this.setState({ errors: err.response.data.errors });
			});
	}

	render(){
		const { data, tempTarif, tmpBerat, errors } = this.state;
		return(
			<Navbar>
				<Breadcrumb size='large'>
				    <Breadcrumb.Section link as={Link} to="/dashboard">Dashboard</Breadcrumb.Section>
				    <Breadcrumb.Divider icon='right arrow' />
				    <Breadcrumb.Section link as={Link} to="/tarif">Tarif</Breadcrumb.Section>
				    <Breadcrumb.Divider icon='right arrow' />
				    <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
				</Breadcrumb>
				<RenderModal 
					visible={this.state.modal} 
					closeModal={() => this.setState({ modal: false })}
					simpan={this.onSubmit}
				/>
				<Divider />
				{ errors.global &&  <Message negative>
				    <Message.Header>Whooops!</Message.Header>
				    <p>{errors.global}</p>
				  </Message> }
				<Grid stackable columns={2}>
					<Grid.Column>
						<Description 
							onReadMore={() => this.setState({ readMore: true })}
							readMore={this.state.readMore}
						/>
					</Grid.Column>
					<Grid.Column>
				      <Segment>
				        <Form>
				        	<div>
				        		<h4 style={{color: '#4485d0'}}>Kantor Asal</h4>
					        	<Form.Field error={!!errors.regAsal}>
					        		<label>Wilayah</label>
					        		<Select 
					        			name='regAsal'
					        			placeholder='Pilih wilayah' 
					        			options={this.renderListWilayah()} 
					        			value={data.regAsal}
					        			onChange={this.onChangeOptions}
					        		/>
					        		{ errors.regAsal && <span style={{color: "#ae5856"}}>{errors.regAsal}</span>}
					        	</Form.Field>
					        	{ data.regAsal !== '0' && 
					        		<RenderKprk
					        			list={this.state.listKprkAsal}
					        			value={data.kprkAsal}
					        			onChange={this.onChangeOptions}
					        			name='kprkAsal'
					        		/> }
				        	</div>
				        	<Divider />
				        	<div>
				        		<h4 style={{color: '#4485d0'}}>Kantor Tujuan</h4>
				        		<Form.Field error={!!errors.regTujuan}>
					        		<label>Wilayah</label>
					        		<Select
					        			name='regTujuan' 
					        			placeholder='Pilih wilayah' 
					        			options={this.renderListWilayah()} 
					        			value={data.regTujuan}
					        			onChange={this.onChangeOptions}
					        		/>
					        		{ errors.regTujuan && <span style={{color: "#ae5856"}}>{errors.regTujuan}</span>}
					        	</Form.Field>
					        	{ data.regTujuan !== '0' && 
					        		<RenderKprk
					        			list={this.state.listKprkTujuan}
					        			value={data.kprkTujuan}
					        			onChange={this.onChangeOptions}
					        			name='kprkTujuan'
					        		/> }
				        	</div>
				        	<Divider />
			        		<Form.Field error={!!errors.layanan}>
				        		<label>Layanan</label>
				        		<Select 
				        			name='layanan'
				        			placeholder='Pilih layanan'
				        			options={this.renderOptiosnLayanan()}
				        			value={data.layanan}
				        			onChange={this.onChangeOptions}
				        		/>
				        		{ errors.layanan && <span style={{color: "#ae5856"}}>{errors.layanan}</span>}
				        	</Form.Field>
				        	<Form.Group widths='equal'>
					        	<Form.Field>
					        		<label>Kelipatan</label>
					        		<input
					        			name='kelipatan'
					        			value={data.kelipatan}
					        			onChange={this.onChange}
					        			autoComplete='off'
					        			disabled={tmpBerat.length > 0 ? true : false }
					        		/>
					        	</Form.Field>
					        	<Form.Field>
					        		<label>Berat</label>
					        		<input
					        			name='berat'
					        			value={data.berat}
					        			onChange={this.onChange}
					        			autoComplete='off'
					        		/>
					        	</Form.Field>
					        	<Form.Field>
					        		<label>Tarif</label>
					        		<input
					        			name='tarif'
					        			value={data.tarif}
					        			onChange={this.onChange}
					        			autoComplete='off'
					        		/>
					        	</Form.Field>
				        	</Form.Group>
				        	<Button primary fluid onClick={this.onLanjut}>Lanjut</Button>
				        	{ tmpBerat.length > 0 && 
				        		<div style={{marginTop: 10}}>
					        		<Form.Field>
					        			<label>Tmp Berat</label>
					        			<input 
					        				value={tmpBerat}
					        				disabled
					        			/>
					        		</Form.Field>
					        		<Form.Field>
					        			<label>Tmp Tarif</label>
					        			<input 
					        				value={tempTarif}
					        				disabled
					        			/>
					        		</Form.Field>
				        			{ tmpBerat.length > 0 && 
				        				<React.Fragment>
				        					<Button secondary onClick={this.onSave}>Simpan</Button> 
				        					 <Button color='red' onClick={this.onReset}>Reset</Button>
				        				</React.Fragment>}
				        		</div> }
				        </Form>
				      </Segment>
				    </Grid.Column>
				</Grid>
			</Navbar>
		);
	}
}

TambahTarifPage.propTypes = {
	listLayanan: PropTypes.array.isRequired,
	listWilayah: PropTypes.array.isRequired,
	getListWilayah: PropTypes.func.isRequired,
	getRefLayanan: PropTypes.func.isRequired
}

function mapStatToProps(state) {
	return{
		listWilayah: state.petugas.wilayah,
		listLayanan: state.laporan.layanan,
		userid: state.user.userid
	}
}

export default connect(mapStatToProps, { getListWilayah, getRefLayanan, setLoading })(TambahTarifPage);