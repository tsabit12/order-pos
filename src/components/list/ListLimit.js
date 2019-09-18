import React from "react";
import { Card, List, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ListLimit = ({ listdata, loading }) => 
		 <Card>
		    <Card.Content>
		      <Card.Header>Saldo PO</Card.Header>
		      { loading && <Card.Meta><Icon name='circle notched' loading /> sedang memuat data...</Card.Meta>}
		    </Card.Content>
		    <Card.Content>
		    	<List divided verticalAlign='middle'>
		    		{ listdata.map(data => <List.Item key={data.id_po}>
		    				<List.Content>
		    					<List>
    								<Header as='h4' color='red'>{data.id_po} ({Math.round(data.persentase)}%) </Header>
    								<p>Saldo sudah dibawah 20%, klik <Link to={'/topup/'+data.id_po }>disini</Link> untuk melakukan topup!</p>
		    					</List>
		    				</List.Content>	
		    			</List.Item>)}
		    	</List>
		    </Card.Content>
		</Card>;

export default ListLimit;