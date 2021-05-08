import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default class StatRow extends React.Component {

	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a physical stats row. */
	render() {
		return (
			<div className="stats">
                <div className="height" style={{'text-align': 'left', 'margin-left': '100px'}}>{this.props.height}</div>
                <div className="weight" style={{'text-align': 'center'}}>{this.props.weight}</div>
                <div className="decade_year" style={{'text-align': 'right', 'margin-right': '300px'}}>{this.props.decade_year}</div>
			</div>
		);
	};
};
