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
import SportRow from '../../components/SportRow';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import CountryHeader from "components/Headers/CountryHeader.js"

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


export default class CountryPage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of countries,
    // and a list of sports for a specified country.
    this.state = {
      countries: [],
      sports: [],
      country_options: [],
			selectedCountry: "",
    };

    this.showSports = this.showSports.bind(this);
    this.submitCountry = this.submitCountry.bind(this);
		this.handleCountryChange = this.handleCountryChange.bind(this);
  };

componentDidMount() {
  Promise.all([
    fetch("http://localhost:8081/getTop20Countries", {
      method: 'GET' 
      }),
    fetch("http://localhost:8081/getcountry", {
      method: 'GET' 
      })
    ]).then(([res0, res1]) => {
    // Convert the response data to a JSON.
    return Promise.all([res0.json(), res1.json()])
    }, err => {
    // Print the error if there is one.
    console.log(err);
    }).then(([countryList, optionsList]) => {
    if (!countryList || !optionsList) return;

    // Map each country in this.state.countries to an HTML element:
    // A button which triggers the showSports function for each country.
    const countriesDivs = countryList.map((countryObj, i) =>
      <Button 
        id={"button-" + countryObj.Country_name} 
        onClick={() => this.showSports(countryObj.Country_name)} 
        country={countryObj.Country_name} 
      >{countryObj.Country_name}</Button>
    );

    const countriesOpt = optionsList.map((countryObj, i) =>
    <option className="countriesOption" value={countryObj.Country_name}>{countryObj.Country_name}</option>
  );
  
    // Set the state of the countries list to the value returned by the HTTP response from the server.
    this.setState({
      countries: countriesDivs,
      country_options: countriesOpt
    });
  }, err => {
    // Print the error if there is one.
    console.log(err);
  })
};


  handleCountryChange(e) {
		this.setState({
			selectedCountry: e.target.value
		});
    console.log(this.state.selectedCountry)
	};


  submitCountry() {
		fetch("http://localhost:8081/country/" + this.state.selectedCountry,
		{
			method: 'GET' 
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(sportsList => {
			let sportDivs = sportsList.map((sport, i) => 
        <SportRow 
          sports = {sport.sports} 
          medals = {sport.medals}
          /> 
			);		
			this.setState({
				sports: sportDivs
				});
			}, err => {
				console.log(err);
			});
	};


  showSports(keyword) {
    fetch("http://localhost:8081/country/" + keyword,
    {
      method: 'GET' 
    }).then(res => { 
      return res.json();
    }, err => { 
      console.log(err);
    }).then(sportsList => { 
      let sportsDivs = sportsList.map((sport, i) => 
        <SportRow 
        sports = {sport.sports} 
        medals = {sport.medals}
        /> 
      );
      this.setState({
          sports: sportsDivs
        });
      })
      .catch(err => console.log(err))
  };


  render() {    
    return (
      <>
      <IndexNavbar />
      <CountryHeader />
      <div className="section section-buttons">


        <br />
        <div className="container countries-container">
          <div className="jumbotron">
            <div className="h5">Popular Countries</div>
            <div className="countries-container">
              {this.state.countries}
            </div>
          </div>

          <br />
          <div className="container countries-container">
            <div className="jumbotron">
              <div className="h5">Select Country</div>
              <div className="dropdown-container">
                <select value={this.state.selectedCountry} onChange={this.handleCountryChange} className="dropdown" id="countriesDropdown">
                  {this.state.country_options}
                </select>
                <button className="submit-btn" id="submitBtn" onClick={this.submitCountry}>Submit</button>
              </div>
            </div>

            <br />
            <div className="jumbotron">
              <div className="sports-container">
                <div className="sport">
                  <div className="header-lg"><strong>Sport</strong></div>
                  <div className="header"><strong>Medal</strong></div>
                </div>
                <div className="sports-container" id="results">
                  {this.state.sports}
                </div>
              </div>
            </div>
			  </div>


        </div>
      </div>     
      </>      
    );
  };
};


// export default SectionButtons;
