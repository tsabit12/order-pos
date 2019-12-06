import React from "react";
import { Segment, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Footer = ({ version }) => (
	<Segment inverted vertical style={{bottom: '-2px', width: '100%'}}>
      <Container style={{textAlign: 'center'}}>
        © PT POS INDONESIA ({ version })
      </Container>
    </Segment>
);

Footer.propTypes = {
	version: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return{
		version: state.ui.version
	}
}

export default connect(mapStateToProps, null)(Footer);