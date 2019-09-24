import React from "react";
import { Responsive, Container } from "semantic-ui-react";
import NavbarDekstop from "./NavbarDekstop";
import NavbarMobile from "./NavbarMobile";
import Footer from "./Footer";

const NavbarChildren = ({ children }) => (
	<Container style={{paddingTop: "5em", paddingBottom: "2em" }}>{children}</Container>
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
						<NavbarChildren>{children}</NavbarChildren>
						<Footer />
					</NavbarMobile>
				</Responsive>
				<Responsive minWidth={Responsive.onlyTablet.minWidth}>
					<NavbarDekstop />
					<div style={{minHeight: "39em"}}>
						<NavbarChildren>{children}</NavbarChildren>
					</div>
					<Footer />
				</Responsive>
			</div>
		);
	}
}

export default Navbar;