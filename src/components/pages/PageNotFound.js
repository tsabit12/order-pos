import React from "react";
import "../css/Notfound.css";
import { withRouter } from 'react-router-dom';


const PageNotFound = ({ history }) => (
	<div className='bodynotfound'>
		<h1 className='text-not-found'>404</h1>
		<p className='pnotfound'>Oops! Something is wrong.</p>
		<button className='back-button' onClick={history.goBack}>Go back in initial page, is better.</button>
	</div>
);

export default withRouter(PageNotFound);