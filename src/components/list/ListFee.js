import React from "react";
import { Message, Card, Button, Grid, Segment } from "semantic-ui-react";

export default function ListFee({ listdata, accept }){
	const empty = (
		<Message>Data kosong</Message>
	);

	const cardList = (
		<React.Fragment>
			<Segment attached='top'><h3>Silahkan pilih paket dibawah ini</h3></Segment>
			<Segment attached>
				<Grid>
					{listdata.map(data => 
						<Grid.Column mobile={16} tablet={8} computer={8} key={data.serviceName}>
							<Card fluid>
								<Card.Content>
									<Card.Header>{data.serviceName}</Card.Header>
									<Card.Description>
										Biaya pengiriman = {data.totalFee}
									</Card.Description>
								</Card.Content>
								<Button primary fluid onClick={() => 
									accept(data.serviceName, data.totalFee, data.serviceCode, data.fee, data.feeTax, data.insurance, data.insuranceTax, data.itemValue) }
								>Accept</Button>
							</Card>
						</Grid.Column>)}
				</Grid>
			</Segment>
		</React.Fragment>
	)

	return(
		<React.Fragment>
			{ listdata.length === 0 ? empty : cardList } 
		</React.Fragment>
	);
}