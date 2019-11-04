import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message, Grid, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import Navbar from "../menu/Navbar";
import KurirDashboard from "./dashboard/KurirDashboard";
import UserDashboard from "./dashboard/UserDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import { getPurchase } from "../../actions/purchase";
import { setProgressBar } from "../../actions/progress";
import api from "../../api";

const MenuDashboard = ({ user }) => (
	<Grid>
		<Grid.Column mobile={16} tablet={16} computer={16}>
			 <Message
			 	style={{ fontSize: '12px'}}
			 	visible
			    icon='user'
			    header={'Selamat datang '+ user.nama }
			    content='Ini adalah halaman utama anda'
			/>
			{ user.level === '01' && <KurirDashboard /> }
			{ user.level === '02' && <UserDashboard userid={user.userid} /> }
			{ user.level === '03' && <AdminDashboard />}
		</Grid.Column>
	</Grid>
)

const ConfirmMessage = ({ handleClick }) => (
	<React.Fragment>
	  <Message icon>
	    <Icon name='times' />
	    <Message.Content>
	      <Message.Header>Akun belum terverifikasi</Message.Header>
	      Email konfirmasi sudah kami kirim ke email anda, silahkan cek email anda untuk konfirmasi akun. <br/> Email tidak terkirim? silahkan klik tombol dibawah
	    </Message.Content>
	  </Message>
	  <Button fluid color='red' onClick={() => handleClick() }>Kirim ulang email</Button>
  	</React.Fragment>
)

class DashboardPage extends React.Component{
	
	state = {
		loading: false
	}

	componentDidMount(){
		this.props.setProgressBar(true);
		const data = {
			level: this.props.user.level,
			userid: this.props.user.userid
		};
		this.props.getPurchase(data).then(() => this.props.setProgressBar(false));
	}

	handleClick = () => {
		const { username } = this.props.user;
		this.setState({ loading: true });
		api.user.sendEmail(username)
			.then(() => this.setState({ loading: false }))
			.catch(() => {
				alert("Terdapat kesalahan");
				this.setState({ loading: false });
			})	
	} 

	render(){
		const { user } = this.props;
		return(
			<Navbar>
				<Dimmer active={this.state.loading} inverted>
			        <Loader inverted>Loading</Loader>
			    </Dimmer>
				{ user.confirmed === true ? <MenuDashboard user={user} /> : <ConfirmMessage handleClick={this.handleClick} /> }
			</Navbar>
		);
	}
}

DashboardPage.propTypes = {
	getPurchase: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return{
		user: state.user
	}
}

export default connect(mapStateToProps, { getPurchase, setProgressBar })(DashboardPage);