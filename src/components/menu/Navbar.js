import React from "react";
import { Responsive, Container, Segment } from "semantic-ui-react";
import NavbarDekstop from "./NavbarDekstop";
import NavbarMobile from "./NavbarMobile";
import Footer from "./Footer";

const NavbarChildren = ({ children }) => (
	<Container style={{paddingBottom: "2em" }}>{children}</Container>
)

class Navbar extends React.Component {
	state = { 
		visible: false
	}

	componentWillUpdate(nextProps, nextState) {
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

	render(){
		const { visible } = this.state;
		const { children } = this.props;
		return(
			<div>
				<Responsive {...Responsive.onlyMobile}>
					<NavbarMobile
						onPusherClick={this.handlePusher}
						onToggle={this.handleToggle}
						visible={visible}
					>
						<NavbarChildren><br/><br/>{children}</NavbarChildren>
						<Footer />
					</NavbarMobile>
				</Responsive>
				<Responsive minWidth={Responsive.onlyTablet.minWidth}>
					<NavbarDekstop />
					<Segment raised style={{minHeight: "48em", top:"45px"}}>
						<NavbarChildren>{children}</NavbarChildren>
					</Segment>
					<Footer />
				</Responsive>
			</div>
		);
	}
}

export default Navbar;