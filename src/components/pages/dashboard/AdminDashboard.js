import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types"; 
import { fetchCountUser } from "../../../actions/dashboard";
import { Card, Grid, Statistic, Segment, Label } from "semantic-ui-react";

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ListCount = ({ list }) => (
	<div>
		<Segment raised>
			<Label color='red' ribbon>
	          Jumlah Pengguna
	        </Label>
			<Grid style={{paddingTop: '12px'}}>
				{ list.map(data => <Grid.Column mobile={8} tablet={4} computer={4} key={data.deskripsi}>
					<Card fluid style={{textAlign: 'center'}}>
				      <Card.Content>
				        <Statistic>
						    <Statistic.Value>{numberWithCommas(data.jumlah)}</Statistic.Value>
						    <Statistic.Label>{data.deskripsi}</Statistic.Label>
						  </Statistic>
				      </Card.Content>
				    </Card>
				</Grid.Column> )}
		    </Grid>
	    </Segment>
    </div>
);

class AdminDashboard extends React.Component {
	componentDidMount(){
		this.props.fetchCountUser()
	}

	render(){
		const { countuser } = this.props;
		return(
			<React.Fragment>
				{ countuser.length > 0 && <ListCount list={countuser} /> }
			</React.Fragment>
		);
	}
}

AdminDashboard.propTypes = {
	fetchCountUser: PropTypes.func.isRequired,
	countuser: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		countuser: state.dashboard.admin.usercount
	}
}

export default connect(mapStateToProps, { fetchCountUser })(AdminDashboard);