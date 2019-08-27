import React from "react";
import PropTypes from "prop-types";
import { Card, Divider } from 'semantic-ui-react';

const ListTrace = ({ listdata }) =>
		<Card>
	      <Card.Content>
	        <Card.Header>{listdata.eventName}</Card.Header>
	        <Card.Meta>Event date: { listdata.eventDate }</Card.Meta>
	        <Card.Meta>Office Code: { listdata.officeCode }</Card.Meta>
	        <Card.Meta>Office Name: { listdata.officeName }</Card.Meta>
	        <Divider />
	        <Card.Description>
	          {listdata.description}
	        </Card.Description>
	      </Card.Content>
	    </Card>;


ListTrace.propTypes = {
	listdata: PropTypes.object.isRequired
}

export default ListTrace;