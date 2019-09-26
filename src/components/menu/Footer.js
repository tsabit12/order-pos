import React from "react";
import { Link } from "react-router-dom";
import { Segment, Container } from "semantic-ui-react";

const Footer = () => (
	<Segment inverted vertical style={{position: 'fixed', bottom: '0', width: '100%'}}>
      <Container style={{textAlign: 'center'}}>
        © PT POS INDONESIA <br/>Klik <Link to="/about">disini</Link> untuk info lebih lanjut
      </Container>
    </Segment>
);

export default Footer;