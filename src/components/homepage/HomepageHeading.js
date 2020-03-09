import React from "react";
import PropTypes from "prop-types";
import { Container, Header } from "semantic-ui-react";

const HomepageHeading = ({ mobile }) => (
  <Container text>
  	 <Header
      as='h1'
      content='Selamat datang'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '1em',
      }}
    />
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

export default HomepageHeading;