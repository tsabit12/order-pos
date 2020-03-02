import React from "react";
import Navbar from "../menu/Navbar";
import { Link } from "react-router-dom";
import { Breadcrumb, Divider, Grid, Segment, List, Form, Button, Select } from 'semantic-ui-react';
import { connect } from "react-redux";
import { getListWilayah } from "../../actions/tarif";

// const countryOptions = [
//   { key: 'af', value: 'af', text: 'Afghanistan' },
//   { key: 'ax', value: 'ax', text: 'Aland Islands' },
//   { key: 'al', value: 'al', text: 'Albania' },
//   { key: 'dz', value: 'dz', text: 'Algeria' },
//   { key: 'as', value: 'as', text: 'American Samoa' },
//   { key: 'ad', value: 'ad', text: 'Andorra' },
//   { key: 'ao', value: 'ao', text: 'Angola' },
//   { key: 'ai', value: 'ai', text: 'Anguilla' },
//   { key: 'ag', value: 'ag', text: 'Antigua' },
//   { key: 'ar', value: 'ar', text: 'Argentina' },
//   { key: 'am', value: 'am', text: 'Armenia' },
//   { key: 'aw', value: 'aw', text: 'Aruba' },
//   { key: 'au', value: 'au', text: 'Australia' },
//   { key: 'at', value: 'at', text: 'Austria' },
//   { key: 'az', value: 'az', text: 'Azerbaijan' },
//   { key: 'bs', value: 'bs', text: 'Bahamas' },
//   { key: 'bh', value: 'bh', text: 'Bahrain' },
//   { key: 'bd', value: 'bd', text: 'Bangladesh' },
//   { key: 'bb', value: 'bb', text: 'Barbados' },
//   { key: 'by', value: 'by', text: 'Belarus' },
//   { key: 'be', value: 'be', text: 'Belgium' },
//   { key: 'bz', value: 'bz', text: 'Belize' },
//   { key: 'bj', value: 'bj', text: 'Benin' },
// ]

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

class TambahTarifPage extends React.Component{
	state = {
		readMore: false,
		listRegional: []
	}

	componentDidMount(){
		this.props.getListWilayah()
			.catch(err => console.log(err));
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps); 
		if (nextProps.listWilayah) {
			const { listWilayah } = nextProps;
			if (listWilayah.length > 0) {
				const listRegional = [];
				listWilayah.forEach(x => {
					listRegional.push({
						key: x.id_wilayah,
						text: x.wilayah,
						value: x.nopend
					})
				});
				this.setState({ listRegional });
			}
		}
	}

	render(){
		return(
			<Navbar>
				<Breadcrumb size='large'>
				    <Breadcrumb.Section link as={Link} to="/dashboard">Dashboard</Breadcrumb.Section>
				    <Breadcrumb.Divider icon='right arrow' />
				    <Breadcrumb.Section link as={Link} to="/tarif">Tarif</Breadcrumb.Section>
				    <Breadcrumb.Divider icon='right arrow' />
				    <Breadcrumb.Section active>Tambah</Breadcrumb.Section>
				</Breadcrumb>
				<Divider />
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
					        	<Form.Field>
					        		<label>Wilayah</label>
					        		<Select placeholder='Pilih wilayah' options={this.state.listRegional} />
					        	</Form.Field>
				        	</div>
				        	<Divider />
				        	<div>
				        		<h4 style={{color: '#4485d0'}}>Kantor Tujuan</h4>
				        		<Form.Field>
					        		<label>Wilayah</label>
					        		<Select placeholder='Pilih wilayah' options={this.state.listRegional} />
					        	</Form.Field>
				        	</div>
				        	<Divider />
				        	<Form.Group widths='equal'>
					        	<Form.Field>
					        		<label>Kelipatan</label>
					        		<input/>
					        	</Form.Field>
					        	<Form.Field>
					        		<label>Berat</label>
					        		<input/>
					        	</Form.Field>
					        	<Form.Field>
					        		<label>Tarif</label>
					        		<input/>
					        	</Form.Field>
				        	</Form.Group>
				        	<Button primary fluid>Lanjut</Button>
				        </Form>
				      </Segment>
				    </Grid.Column>
				</Grid>
			</Navbar>
		);
	}
}

function mapStatToProps(state) {
	return{
		listWilayah: state.petugas.wilayah
	}
}

export default connect(mapStatToProps, { getListWilayah })(TambahTarifPage);