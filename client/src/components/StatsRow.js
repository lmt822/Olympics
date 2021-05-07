import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default class StatRow extends React.Component {

	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a physical stats row. */
	render() {
		return (
			<div className="sport">
                <div className="height">{this.props.height}</div>
                <div className="weight" style={{'text-align': 'center'}}>{this.props.weight}</div>
                <div className="decade_year" style={{'text-align': 'right'}}>{this.props.decade_year}</div>
			</div>
		);
	};
};
