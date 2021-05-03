import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default class StatRow extends React.Component {

	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a physical stats row. */
	render() {
		return (
			<div className="sport">
                <div className="height">{this.props.height}</div>
                <div className="weight">{this.props.weight}</div>
                <div className="decade_year">{this.props.decade_year}</div>
			</div>
		);
	};
};
