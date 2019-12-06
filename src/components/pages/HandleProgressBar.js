import React from "react";
import PropTypes from "prop-types";
import TopBarProgress from "react-topbar-progress-indicator";
import {connect} from "react-redux";

TopBarProgress.config({
  barColors: {
    "0": "#fff",
    "1.0": "#fff"
  },
  shadowBlur: 5
});

const HandleProgressBar = ({ status }) => {
	return(
		<React.Fragment>
			{ status && <TopBarProgress />}
		</React.Fragment>
	);
}

HandleProgressBar.propTypes = {
	status: PropTypes.bool.isRequired
}

function mapStateProps(state) {
	return {
		status: state.ui.loading
	}
}

export default connect(mapStateProps, null)(HandleProgressBar);