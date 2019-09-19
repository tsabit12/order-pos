import React from "react";
import { Message } from "semantic-ui-react";

const Summary = ({ idpo }) => {
	return(
		<React.Fragment>
			<Message
			    icon='check'
			    header='Topup sukses'
			    content={'Topup dengan nomor po = '+ idpo +'. Saldo akan bertambah setelah dikonfirmasi oleh admin. Terimakasih!'}
			/>
		</React.Fragment>
	);
}

export default Summary;