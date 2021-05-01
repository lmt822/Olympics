import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default class ParticipationRow extends React.Component {

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a sports row. */
	render() {
		return (
			<div className="sport">
				<div className="name">{this.props.name}</div>
				<div className="population">{this.props.population}</div>
				<div className="participants">{this.props.participants}</div>
				<div className="ratio">{this.props.ratio}</div>
			</div>
		);
	};
};
