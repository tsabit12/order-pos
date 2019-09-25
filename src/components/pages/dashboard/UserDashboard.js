import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Button, Grid } from "semantic-ui-react";

const UserDashboard = ({ listlimit }) => {
	const empty = (
		<p>List kosong</p>
	);	

	const list = (
		<React.Fragment>
			<Grid>
					{ listlimit.map(data => 
						<Grid.Column mobile={8} tablet={8} computer={4} key={data.id_po}>
							<Card fluid>
						      <Card.Content>
						        <Card.Header>{data.id_po}</Card.Header>
						        <Card.Meta>Persentase {Math.round(data.persentase)}%</Card.Meta>
						      </Card.Content>
						      <Button color='red' fluid size='mini' as={Link} to={'/topup/'+data.id_po }>Topup</Button>
						    </Card>
					    </Grid.Column>) }
				
	    	</Grid>
		</React.Fragment>
	);

	return(
		<React.Fragment>{ listlimit.length === 0 ? empty: list }</React.Fragment>
	);
}

UserDashboard.propTypes = {
	listlimit: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return {
		listlimit: state.purchase.filter(list => Math.round(list.persentase) <= 20)
	}
}

export default connect(mapStateToProps, null)(UserDashboard);