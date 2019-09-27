import React from "react";
import { Segment, Container } from "semantic-ui-react";

const Footer = () => (
	<Segment inverted vertical style={{position: 'fixed', bottom: '0', width: '100%', zIndex: '100'}}>
      <Container style={{textAlign: 'center'}}>
        © PT POS INDONESIA
      </Container>
    </Segment>
);

export default Footer;