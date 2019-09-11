import React from "react";
import { Message, Card, Button, Grid } from "semantic-ui-react";

export default function ListFee({ listdata, accept }){
	const empty = (
		<Message>Data kosong</Message>
	);

	const cardList = (
		<Grid>
			{listdata.map(data => 
				<Grid.Column width={4} key={data.serviceName}>
					<Card>
						<Card.Content>
							<Card.Header>{data.serviceName}</Card.Header>
							<Card.Description>
								Biaya pengiriman = {data.totalFee}
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Button primary fluid onClick={() => 
								accept(data.serviceName, data.totalFee, data.serviceCode, data.fee, data.feeTax, data.insurance, data.insuranceTax, data.itemValue) }
							>Accept</Button>
						</Card.Content>
					</Card>
				</Grid.Column>)}
		</Grid>
	)

	return(
		<React.Fragment>
			{ listdata.length === 0 ? empty : cardList } 
		</React.Fragment>
	);
}