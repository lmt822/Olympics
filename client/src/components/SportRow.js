import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default class SportRow extends React.Component {

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a sports row. */
	render() {
		return (
			<div className="sport">
				<div className="sports">{this.props.sports}</div>
				<div className="medals" style={{'text-align': 'right'}}>{this.props.medals}</div>
			</div>
		);
	};
};
