import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message, Grid } from "semantic-ui-react";
import Navbar from "../menu/Navbar";
import KurirDashboard from "./dashboard/KurirDashboard";
import UserDashboard from "./dashboard/UserDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import Loader from "react-loader";
import { getPurchase } from "../../actions/purchase";
import { setProgressBar } from "../../actions/progress";


class DashboardPage extends React.Component{
	state = { 
		loading: false
	}
	componentDidMount(){
		this.setState({ loading: true });
		this.props.setProgressBar(true);
		const data = {
			level: this.props.level,
			userid: this.props.userid
		};
		this.props.getPurchase(data).then(() => this.props.setProgressBar(false));
	}

	render(){
		const { level } = this.props;
		return(
			<Navbar>
				<Loader loaded={this.state.loading}>
					<Grid>
						<Grid.Column mobile={16} tablet={16} computer={16}>
							 <Message
							 	style={{ fontSize: '12px'}}
							 	visible
							    icon='user'
							    header={'Selamat datang '+this.props.username}
							    content='Get the best news in your e-mail every day.'
							/>
							{ level === '01' && <KurirDashboard /> }
							{ level === '02' && <UserDashboard /> }
							{ level === '03' && <AdminDashboard />}
						</Grid.Column>
					</Grid>
				</Loader>
			</Navbar>
		);
	}
}

DashboardPage.propTypes = {
	username: PropTypes.string.isRequired,
	getPurchase: PropTypes.func.isRequired,
	level: PropTypes.string.isRequired,
	userid: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		username: state.user.nama,
		level: state.user.level,
		userid: state.user.userid
	}
}

export default connect(mapStateToProps, { getPurchase, setProgressBar })(DashboardPage);