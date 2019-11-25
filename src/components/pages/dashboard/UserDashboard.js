import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Button, Grid, Segment, Label, Statistic } from "semantic-ui-react";
import { fetchCountForMitra } from "../../../actions/dashboard";

const Empty = () => (
	<React.Fragment />
);

const List = ({ listlimit }) => (
	<React.Fragment>
		<Label color='teal' ribbon>
          Notifikasi Topup
        </Label>
		<Grid style={{paddingTop: '12px'}}>
			{ listlimit.map(data => 
				<Grid.Column mobile={16} tablet={8} computer={4} key={data.id_po}>
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

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ListCount = ({ list }) => (
	<div style={{paddingTop: '12px'}}>
		<Label color='teal' ribbon>
          Highlight
        </Label>
		<Grid style={{paddingTop: '12px'}}>
			{ list.map(data => <Grid.Column mobile={16} tablet={4} computer={4} key={data.keterangan}>
				<Card fluid style={{textAlign: 'center'}}>
			      <Card.Content>
			        <Statistic>
					    <Statistic.Value>{numberWithCommas(data.jumlah)}</Statistic.Value>
					    <Statistic.Label>{data.keterangan}</Statistic.Label>
					  </Statistic>
			      </Card.Content>
			      <Button secondary fluid size='mini' as={Link} to={data.link}>Cek Detail</Button>
			    </Card>
			</Grid.Column> )}
	    </Grid>
    </div>
);

class UserDashboard extends React.Component{
	componentDidMount(){
		const { userid } = this.props;
 		this.props.fetchCountForMitra(userid)
 			.catch(() => alert("Somtehing wrong!"));
	}

	render(){
		const { listlimit, count } = this.props;

		return(
			<React.Fragment>
				<Segment raised>
					{ listlimit.length === 0 ? <Empty /> : <List listlimit={listlimit} /> }
					{ count.length > 0 && <ListCount list={count} />}
				</Segment>
			</React.Fragment>
		);
	}
}

UserDashboard.propTypes = {
	listlimit: PropTypes.array.isRequired,
	userid: PropTypes.string.isRequired,
	count: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return {
		listlimit: state.purchase.filter(list => Math.round(list.persentase) <= 20),
		count: state.dashboard.countHighlight
	}
}

export default connect(mapStateToProps, { fetchCountForMitra })(UserDashboard);