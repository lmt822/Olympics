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
import DistributionRow from '../../components/DistributionRow';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import DistributionHeader from "components/Headers/DistributionHeader.js"
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


export default class DistributionPage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of countries,
    // and a list of sports for a specified country.
    this.state = {
        decade_options: [],
        sport_options: [],
        medalType_options: [],
        distribution: [],
        selectedDecade: "1890",
        selectedSport: "Aeronautics",
        selectedMedalType: "Gold"
    };

    this.submitFilter = this.submitFilter.bind(this);
	this.handleDecadeChange = this.handleDecadeChange.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleMedalTypeChange = this.handleMedalTypeChange.bind(this);
  };

componentDidMount() {
  Promise.all([
    fetch("http://localhost:8081/getdecade", {
      method: 'GET' 
      }),
    fetch("http://localhost:8081/getsport", {
      method: 'GET' 
      }),
      fetch("http://localhost:8081/getmedaltype", {
      method: 'GET' 
      })
    ]).then(([res0, res1, res2]) => {
    // Convert the response data to a JSON.
    return Promise.all([res0.json(), res1.json(), res2.json()])
    }, err => {
    // Print the error if there is one.
    console.log(err);
    }).then(([decadeList, sportList, medalTypeList]) => {
    if (!decadeList || !sportList || !medalTypeList) return;

    // Map each country in this.state.countries to an HTML element:
    // A button which triggers the showSports function for each country.

    const decadeOpt = decadeList.map((decadeObj, i) =>
    <option className="deacadeOption" value={decadeObj.decade}>{decadeObj.decade}</option>
    );

    const sportOpt = sportList.map((sportObj, i) =>
    <option className="sportOption" value={sportObj.sport}>{sportObj.sport}</option>
    );
    
    const medalTypeOpt = medalTypeList.map((medalTypeObj, i) =>
    <option className="medalTypeOption" value={medalTypeObj.medalType}>{medalTypeObj.medalType}</option>
    );
  
    // Set the state of the countries list to the value returned by the HTTP response from the server.
    this.setState({
      decade_options: decadeOpt,
      sport_options: sportOpt,
      medalType_options: medalTypeOpt
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

    handleMedalTypeChange(e) {
      this.setState({
        selectedMedalType: e.target.value
      });
    };


  submitFilter() {
        fetch("http://localhost:8081/macroMedals/" + this.state.selectedDecade + "/" + this.state.selectedSport + "/" + this.state.selectedMedalType,
		{
			method: 'GET' 
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(distributionList => {
            console.log(distributionList);
			let distributionDivs = distributionList.map((distribution, i) => 
            <DistributionRow 
                country = {distribution.country}
                medals = {distribution.medals} 
            /> 
			);	

      if(distributionDivs.length == 0){
        distributionDivs = "Not Available"
      }

			this.setState({
				distribution: distributionDivs
				});
			}, err => {
				console.log(err);
			});
	};


  render() {    
    return (
      <>
      <IndexNavbar />
      <DistributionHeader/>
        <div className="container"style={{backgroundColor: "White"}}>
                <div className="h2">Medal Distribution</div>
                <div className="dropdown-container">
                    <select value={this.state.selectedDecade} onChange={this.handleDecadeChange} className="dropdown" id="decadeDropdown">
                        {this.state.decade_options}
                    </select>
                    <select value={this.state.selectedSport} onChange={this.handleSportChange} className="dropdown" id="sportDropdown">
                        {this.state.sport_options}
                    </select>
                    <select value={this.state.selectedMedalType} onChange={this.handleMedalTypeChange} className="dropdown" id="medalTypeDropdown">
                        {this.state.medalType_options}
                    </select>
                    <Button color='info'className="btn-round mr-1" type="button" onClick={this.submitFilter}>Submit</Button>
                </div>
            </div>

            <br />
            <container>
            <div className="jumbotron">
              <div className="sports-container">
                <div className="sport">
                  <div className="header-lg"><strong>Country</strong></div>
                  <div className="header"><strong>Medals</strong></div>
                </div>
                <div className="sports-container" id="results">
                  {this.state.distribution}
                </div>
              </div>
            </div>
            </container>
 
      <DemoFooter />   
      </>      
    );
  };
};


// export default SectionButtons;
