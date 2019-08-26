import React from "react";
import { Responsive, Container } from "semantic-ui-react";
import NavbarDekstop from "./NavbarDekstop";
import NavbarMobile from "./NavbarMobile";

const NavbarChildren = ({ children }) => (
	<Container style={{marginTop: "5em"}}>{children}</Container>
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
					</NavbarMobile>
				</Responsive>
				<Responsive minWidth={Responsive.onlyTablet.minWidth}>
					<NavbarDekstop />
					<NavbarChildren>{children}</NavbarChildren>
				</Responsive>
			</div>
		);
	}
}

export default Navbar;