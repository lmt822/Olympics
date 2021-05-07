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
import StatsRow from '../../components/StatsRow';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import StatsHeader from "components/Headers/StatsHeader.js"
import DemoFooter from "components/Footers/DemoFooter.js";
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


export default class StatsPage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of countries,
    // and a list of sports for a specified country.
    this.state = {
        sport_options: [],
        stats: [],
        selectedSport: "Aeronautics"
    };

    this.submitFilter = this.submitFilter.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
  };

componentDidMount() {
    fetch("http://localhost:8081/getsport", {
      method: 'GET' 
      }).then((res) => {
    // Convert the response data to a JSON.
    return res.json()
    }, err => {
    // Print the error if there is one.
    console.log(err);
    }).then((sportList) => {
    if (!sportList) return;

    // Map each country in this.state.countries to an HTML element:
    // A button which triggers the showSports function for each country.

    const sportOpt = sportList.map((sportObj, i) =>
    <option className="sportOption" value={sportObj.sport}>{sportObj.sport}</option>
    );
  
    // Set the state of the countries list to the value returned by the HTTP response from the server.
    this.setState({
      sport_options: sportOpt,
    });
  }, err => {
    // Print the error if there is one.
    console.log(err);
  })
};


    handleSportChange(e) {
      this.setState({
        selectedSport: e.target.value
      });
	};


  submitFilter() {
        fetch("http://localhost:8081/getHeightandWeight/" + this.state.selectedSport,
		{
			method: 'GET' 
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(statsList => {

      Object.keys(statsList).forEach(function(key) {
        if(statsList[key].decade_year === null){
          statsList[key].decade_year = "Not Available";
        }
        if(statsList[key].height === null){
          statsList[key].height = "Not Available";
        }
        if(statsList[key].weight === null){
          statsList[key].weight = "Not Available";
        }
      })

			let statsDivs = statsList.map((stat, i) => 
            <StatsRow 
                height = {stat.height}
                weight = {stat.weight} 
                decade_year = {stat.decade_year}
            /> 
			);		
			this.setState({
				stats: statsDivs
				});
			}, err => {
				console.log(err);
			});
	};


  render() {    
    return (
      <>
      <IndexNavbar />
      <StatsHeader/>
        <div className="container" style={{backgroundColor: "White"}}>
                <div className="h2">Physical Stats of winners</div>
                <div className="dropdown-container">
                    <select value={this.state.selectedSport} onChange={this.handleSportChange} className="dropdown" id="sportDropdown">
                        {this.state.sport_options}
                    </select>
                    <Button color='info'className="btn-round mr-1" type="button"  onClick={this.submitFilter}>Submit</Button>
                </div>
            </div>

            <br />
              <div className="stats-container">
                <div className="stats">
                  <div className="h7" style={{'text-align': 'left', 'margin-left': '100px'}}><strong>Height (cm)</strong></div>
                  <div className="h7" style={{'text-align': 'center'}}><strong>Weight (kg)</strong></div>
                  <div className="h7" style={{'text-align': 'right', 'margin-right': '100px'}}><strong>Decade</strong></div>
                </div>
                <div className="sports-container" id="results">
                  {this.state.stats}
                </div>
              </div>
     <DemoFooter />
      </>      
    );
  };
};


// export default SectionButtons;
