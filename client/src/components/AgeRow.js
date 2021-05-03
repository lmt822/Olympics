import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default class AgeRow extends React.Component {

	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show an average age row. */
	render() {
		return (
			<div className="sport">
                <div className="average_age">{this.props.average_age}</div>
			</div>
		);
	};
};
