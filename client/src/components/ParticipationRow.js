import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default class ParticipationRow extends React.Component {

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a sports row. */
	render() {
		return (
			<div className="participation">
				<div className="name" style={{'text-align': 'left'}}>{this.props.name}</div>
				<div className="population" style={{'text-align': 'left'}}>{this.props.population}</div>
				<div className="participants" style={{'text-align': 'right'}}>{this.props.participants}</div>
				<div className="ratio" style={{'text-align': 'right', 'margin-right': '200px'}}>{this.props.ratio}</div>
			</div>
		);
	};
};
