import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default class DistributionRow extends React.Component {

	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a medal distribution row. */
	render() {
		return (
			<div className="sport">
                <div className="country">{this.props.country}</div>
				<div className="medals">{this.props.medals}</div>
			</div>
		);
	};
};
