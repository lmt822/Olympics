/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// plugin that creates slider
import Slider from "nouislider";
import AgeRow from '../../components/AgeRow';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import AgeHeader from "components/Headers/AgeHeader.js"

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  CustomInput,
} from "reactstrap";


export default class AgePage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of countries,
    // and a list of sports for a specified country.
    this.state = {
        decade_options: [],
        sport_options: [],
        age: [],
        selectedDecade: "1890",
        selectedSport: "Aeronautics"
    };

    this.submitFilter = this.submitFilter.bind(this);
	this.handleDecadeChange = this.handleDecadeChange.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
  };

componentDidMount() {
  Promise.all([
    fetch("http://localhost:8081/getdecade", {
      method: 'GET' 
      }),
    fetch("http://localhost:8081/getsport", {
      method: 'GET' 
      })
    ]).then(([res0, res1]) => {
    // Convert the response data to a JSON.
    return Promise.all([res0.json(), res1.json()])
    }, err => {
    // Print the error if there is one.
    console.log(err);
    }).then(([decadeList, sportList]) => {
    if (!decadeList || !sportList) return;

    // Map each country in this.state.countries to an HTML element:
    // A button which triggers the showSports function for each country.

    const decadeOpt = decadeList.map((decadeObj, i) =>
    <option className="deacadeOption" value={decadeObj.decade}>{decadeObj.decade}</option>
    );

    const sportOpt = sportList.map((sportObj, i) =>
    <option className="sportOption" value={sportObj.sport}>{sportObj.sport}</option>
    );
  
    // Set the state of the countries list to the value returned by the HTTP response from the server.
    this.setState({
      decade_options: decadeOpt,
      sport_options: sportOpt,
    });
  }, err => {
    // Print the error if there is one.
    console.log(err);
  })
};

    handleDecadeChange(e) {
      this.setState({
          selectedDecade: e.target.value
      });
    };

    handleSportChange(e) {
      this.setState({
        selectedSport: e.target.value
      });
	  };


  submitFilter() {
        fetch("http://localhost:8081/getAverageAge/" + this.state.selectedDecade + "/" + this.state.selectedSport,
		{
			method: 'GET' 
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(ageList => {
            console.log(ageList);
		  let ageDivs = ageList.map((age, i) => 
            <AgeRow 
                average_age = {age.average_age} 
            /> 
			);		
			this.setState({
				age: ageDivs
				});
			}, err => {
				console.log(err);
			});
	};


  render() {    
    return (
      <>
      <IndexNavbar />
      <AgeHeader/>
      <div className="section section-buttons">

        <div className="container age-container">
            <div className="jumbotron">
                <div className="h5">Average Age of Medal Winners</div>
                <div className="dropdown-container">
                    <select value={this.state.selectedDecade} onChange={this.handleDecadeChange} className="dropdown" id="decadeDropdown">
                        {this.state.decade_options}
                    </select>
                    <select value={this.state.selectedSport} onChange={this.handleSportChange} className="dropdown" id="sportDropdown">
                        {this.state.sport_options}
                    </select>
                    <button className="submit-btn" id="submitBtn" onClick={this.submitFilter}>Submit</button>
                </div>
            </div>

            <br />
            <container>
            <div className="jumbotron">
              <div className="sports-container">
                <div className="sport">
                  <div className="header"><strong>Average Age</strong></div>
                </div>
                <div className="sports-container" id="results">
                  {this.state.age}
                </div>
              </div>
            </div>
            </container>

        </div>
      </div>     
      </>      
    );
  };
};


// export default SectionButtons;
