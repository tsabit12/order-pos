import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import VideoPlayer from 'react-simple-video-player';
// import Poster from "../../poster.png";
import DesktopContainer from "../homepage/DesktopContainer";
import MobileContainer from "../homepage/MobileContainer";
import { Segment, Grid, Header, Container, Divider, Image, Button, Icon  } from "semantic-ui-react";
import SampoernaIcon from "../../sampoerna.png";
import LogoPos from "../../pos.png";
import pdfjuknis from "../../juknis.pdf";

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

class HomePage extends React.Component{
	componentDidMount(){
		const { logged } = this.props;
		if (logged){
			this.props.history.push("/dashboard");
		}
	}

	render(){
		return(
			<ResponsiveContainer>
				<Segment style={{ padding: '0em' }} vertical>
			      <Grid celled='internally' columns='equal' stackable>
			        <Grid.Row textAlign='center'>
			          <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
			          	<Image src={LogoPos} size='medium' circular centered />
			            <Header as='h3' style={{ fontSize: '2em' }}>
			              PT.POS INDONESIA
			            </Header>
			          </Grid.Column>
			          <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
			          	<Image src={SampoernaIcon} size='medium' circular centered />
			          	<Header as='h3' style={{ fontSize: '2em' }}>
			              PT.HM SAMPOERNA
			            </Header>
			          </Grid.Column>
			        </Grid.Row>
			      </Grid>
			    </Segment>

				<Segment style={{ padding: '8em 0em' }} vertical>
			      <Container text>
			        <Header as='h3' style={{ fontSize: '2em' }}>
			        	Deskripsi
			        </Header>
			        <p style={{ fontSize: '1.33em' }}>
			          Web Pickup Order Mitra ini merupakan
			          aplikasi yang dapat digunakan oleh setiap masing-masing pengguna dalam sistem ini adalah untuk
			          mendukung kelancaran proses bisnis order.
			        </p>
			        <Button primary as='a' href={pdfjuknis} target="_blank" download="juknis.pdf">
				       Petunjuk Teknis
				      <Icon name='cloud download' style={{marginLeft: '10px'}} />
				    </Button>
			        <Divider
			          as='h4'
			          className='header'
			          horizontal
			          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
			        >
			          <span style={{color: 'blue'}}>About US</span>
			        </Divider>

			        <Header as='h3' style={{ fontSize: '2em' }}>
			          Did We Tell You About Our Bananas?
			        </Header>
			        <p style={{ fontSize: '1.33em' }}>
			          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
			          it's really true. It took years of gene splicing and combinatory DNA research, but our
			          bananas can really dance.
			        </p>
			      </Container>
			    </Segment>
			</ResponsiveContainer>
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