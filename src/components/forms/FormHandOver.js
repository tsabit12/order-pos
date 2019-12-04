import React from "react";
import { Form, Button, Message, Table } from "semantic-ui-react";
import PropTypes from "prop-types";

const Result = ({ list }) => (
	<React.Fragment>
		<Message positive>
			<Message.Header>Sukses!</Message.Header>
			<p>Berikut adalah data order dengan status <strong>handover</strong></p>
		</Message>
		<Table celled>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>ID ORDER</Table.HeaderCell>
		        <Table.HeaderCell>NAMA PENGIRIM</Table.HeaderCell>
		        <Table.HeaderCell>NAMA PENERIMA</Table.HeaderCell>
		        <Table.HeaderCell>TANGGAL ORDER</Table.HeaderCell>
		        <Table.HeaderCell>PETUGAS PICKUP</Table.HeaderCell>
		        <Table.HeaderCell>KANTOR</Table.HeaderCell>
		        <Table.HeaderCell>KOTA</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>
	      	<Table.Body>
		      { list.map(data => <Table.Row key={data.id_order}>
		      		<Table.Cell>{data.id_order}</Table.Cell>
		      		<Table.Cell>{data.nm_pengirim}</Table.Cell>
		      		<Table.Cell>{data.nm_penerima}</Table.Cell>
		      		<Table.Cell>{data.tgl}</Table.Cell>
		      		<Table.Cell>{data.nama_petugas}</Table.Cell>
		      		<Table.Cell>{data.namakantor}</Table.Cell>
		      		<Table.Cell>{data.city}</Table.Cell>
		      </Table.Row>)}
		  	</Table.Body>
		</Table>
	</React.Fragment>
);

class FormHandOver extends React.Component{
	state = {
		loading: false,
		errors: {},
		pin: '',
		nopickup: '',
		nopend: this.props.nopend,
		data: []
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value })

	onSubmit = () => {
		const { pin, nopickup } = this.state;
		const errors = this.validate(pin, nopickup);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			const data = {
				pin: this.state.pin,
				nopickup: this.state.nopickup,
				nopend: this.state.nopend
			};

			this.props.submit(data)
				.then(res => {
					this.setState({ loading: false, errors: {}, data: res });
				})
				.catch(err => {
					this.setState({ errors: err.response.data.errors, loading: false, data: [] });
				})
		}
	}

	validate = (pin, nopickup) => {
		const errors = {};
		if (!pin) errors.pin = "Pin tidak boleh kosong";
		if (!nopickup) errors.nopickup = "Nomor pickup harap di isi";

		return errors;
	}


	render(){
		const { errors, loading, data } = this.state;
		
		return(
			<React.Fragment>
				{ errors.global && <Message negative>
					<Message.Header>Terdapat Kesalahan!</Message.Header>
					<p>{errors.global}</p>
				</Message> }
				<Form onSubmit={this.onSubmit} loading={loading}>
					<Form.Group widths='equal'>
						<Form.Input
							label="Nomor Pickup"
							placeholder="Masukan nomor pickup"
							name="nopickup"
							id="nopickup"
							value={this.state.nopickup}
							onChange={this.onChange}
							error={errors.nopickup}
							autoComplete="off"
						/>
						<Form.Input
							type="password"
							label="Pin"
							name="pin"
							id="pin"
							placeholder="Masukan pin"
							value={this.state.pin}
							onChange={this.onChange}
							error={errors.pin}
						/>
					</Form.Group>
					<Button primary fluid>Cari</Button>
				</Form>
				{ data.length > 0 && <Result list={data} /> }
			</React.Fragment>
		);
	}
}

FormHandOver.propTypes = {
	submit: PropTypes.func.isRequired,
	nopend: PropTypes.string.isRequired
}

export default FormHandOver;