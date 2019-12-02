import React from "react";
import { Segment, Container } from "semantic-ui-react";

const Footer = () => (
	<Segment inverted vertical style={{bottom: '-2px', width: '100%'}}>
      <Container style={{textAlign: 'center'}}>
        © PT POS INDONESIA
      </Container>
    </Segment>
);

export default Footer;