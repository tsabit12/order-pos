import React from "react";
import "../css/Notfound.css";

const PageNotFound = () => (
	<div className='bodynotfound'>
		<h1 className='text-not-found'>404</h1>
		<p className='pnotfound'>Oops! Something is wrong.</p>
		<a className="back-button" href="#/dashboard">Go back in initial page, is better.</a>
	</div>
);

export default PageNotFound;