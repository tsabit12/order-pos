import React from "react";
import PropTypes from "prop-types";
import { Table } from 'semantic-ui-react';

const ListTrace = ({ listdata }) =>
		<Table.Row>
	        <Table.Cell singleLine>
	            {listdata.eventName}
	        </Table.Cell>
	        <Table.Cell singleLine>{ listdata.eventDate }</Table.Cell>
	        <Table.Cell>
	          { listdata.officeName }
	        </Table.Cell>
	        <Table.Cell>
	          {listdata.description}
	        </Table.Cell>
	    </Table.Row>;


ListTrace.propTypes = {
	listdata: PropTypes.object.isRequired
}

export default ListTrace;