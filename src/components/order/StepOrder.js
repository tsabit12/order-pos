import React from "react";
import { Step, Icon } from "semantic-ui-react";

const StepOrder = ({ step, disabled }) => (
	<Step.Group  widths={6} style={{marginTop: '-10px'}}>
	    <Step active={step === 1 ? true : false}>
	      <Icon name='search' />
	      <Step.Content>
	        <Step.Title>Purchase Order</Step.Title>
	        <Step.Description>Cari nomor purchase order anda</Step.Description>
	      </Step.Content>
	    </Step>

	    <Step active={step === 2 ? true : false}>
	      <Icon name='user' />
	      <Step.Content>
	        <Step.Title>Pengirim</Step.Title>
	        <Step.Description>Isi formulir data pengirim</Step.Description>
	      </Step.Content>
	    </Step>

	    <Step active={step === 3 ? true : false}>
	      <Icon name='user outline' />
	      <Step.Content>
	        <Step.Title>Penerima</Step.Title>
	        <Step.Description>Isi formulir data penerima</Step.Description>
	      </Step.Content>
	    </Step>

	    <Step active={step === 4 ? true : false}>
	      <Icon name='cogs' />
	      <Step.Content>
	        <Step.Title>Deskripsi</Step.Title>
	        <Step.Description>Isi data deskripsi kiriiman</Step.Description>
	      </Step.Content>
	    </Step>

	    <Step active={step === 5 ? true : false}>
	      <Icon name='credit card' />
	      <Step.Content>
	        <Step.Title>Tarif</Step.Title>
	        <Step.Description>Pilih tarif pengiriman</Step.Description>
	      </Step.Content>
	    </Step>

	    <Step active={step === 6 ? true : false}>
	      <Icon name='info' />
	      <Step.Content>
	        <Step.Title>Summary</Step.Title>
	      </Step.Content>
	    </Step>
	</Step.Group>	
)

export default StepOrder;