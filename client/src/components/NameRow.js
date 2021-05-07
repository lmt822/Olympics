import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default class NameRow extends React.Component {

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a sports row. */
	render() {
		return (
			<div className="sport">
				<div className="name">{this.props.name}</div>
				<div className="medals">{this.props.medals}</div>
			</div>
		);
	};
};
