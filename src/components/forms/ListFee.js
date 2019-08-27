import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from 'semantic-ui-react';

const ListFee = ({ listdata, handleChange }) => 
		<Checkbox 
			name="valuefee"
			label={listdata.serviceName}
			onChange={() => handleChange(listdata.serviceCode)}
			toggle 
		/>

ListFee.propTypes = {
	listdata: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired
}

export default ListFee;