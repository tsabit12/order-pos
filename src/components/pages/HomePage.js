import React from "react";
import Navbar from "../menu/Navbar";
import { Image, Header, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class HomePage extends React.Component{
	componentDidMount(){
		const { logged } = this.props;
		if (logged){
			this.props.history.push("/dashboard");
		}
	}

	render(){

		return(
			<Navbar>
				<div style={{paddingTop: '20px'}}>
					<Header as='h3'>
					    <Header.Content>Selamat Datang</Header.Content>
					</Header>
					<Divider />
					<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' alt='paragraph' />
					<br />
					<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' alt='paragraph' />
				</div>
			</Navbar>
		);
	}
}


HomePage.propTypes = {
	logged: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	return{
		logged: !!state.user.token
	}
}

export default connect(mapStateToProps, null)(HomePage);