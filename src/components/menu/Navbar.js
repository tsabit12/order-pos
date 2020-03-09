import React from "react";
import PropTypes from "prop-types";
import { Responsive, Container, Segment, Dimmer, Loader } from "semantic-ui-react";
import NavbarDekstop from "./NavbarDekstop";
import NavbarMobile from "./NavbarMobile";
import Footer from "./Footer";
import { connect } from "react-redux";
// import { getTopup } from "../../actions/notifikasi";

const NavbarChildren = ({ children }) => (
	<Container style={{paddingBottom: "3em", paddingTop: "1em" }}>{children}</Container>
)

class Navbar extends React.Component {
	state = { 
		visible: false
	}

	// componentDidMount(){
	// 	this.props.getTopup();
	// }

	UNSAFE_componentWillUpdate(nextProps, nextState) {
		if (nextState.visible === true) {
      		document.querySelector('.pusher').addEventListener('click', this.handleClick);
		}
	}

	handlePusher = () => {
		const { visible } = this.state;
		if (visible) this.setState({ visible: true });
	}

	handleClick = () => {
		if (this.state.visible) {
	      this.setState({ visible: false });
	    }
	}
	
	handleToggle = () => {
		this.setState({ visible: !this.state.visible })
	}

	setLoading = () => alert("oke");

	render(){
		const { visible } = this.state;
		const { children } = this.props;
		return(
			<React.Fragment>
				<Dimmer active={this.props.isLoading} inverted page>
			      <Loader inverted>Loading</Loader>
			    </Dimmer>
				<div style={{minHeight: '92vh'}}>
					<Responsive {...Responsive.onlyMobile}>
						<NavbarMobile
							onPusherClick={this.handlePusher}
							onToggle={this.handleToggle}
							visible={visible}
						>
							<NavbarChildren>
								<div style={{marginTop: '19px'}}>{children}</div>
							</NavbarChildren>
						</NavbarMobile>
					</Responsive>
					<Responsive minWidth={Responsive.onlyTablet.minWidth}>
						<NavbarDekstop />
						<Segment vertical style={{top:"57px", minHeight: "92vh", backgroundColor: "#fff"}}>
							<NavbarChildren>{children}</NavbarChildren>
						</Segment>
						<div style={{ paddingBottom: '15px'}} />
					</Responsive>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

Navbar.propTypes = {
	isLoading: PropTypes.bool.isRequired
}

function mapStateToProp(state) {
	return{
		isLoading: state.ui.loader
	}
}

export default connect(mapStateToProp, null)(Navbar);