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
import '../../assets/css/SectionCountry.css';
import AverageRow from '../../components/AverageRow';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import AverageHeader from "components/Headers/AverageHeader.js"

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


export default class AverageMedalPage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    this.state = {
      countries: []
    };
  };


 // React function that is called when the page load.
componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/getAverageMedalsPerAthlete", {
      method: "GET", // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(participationList => {
        // Map each attribute of a person in this.state.people to an HTML element
        let participationDivs = participationList.map((country, i) => (
              <AverageRow
                  name = {country.Country}
                  ratio = {country.Medal_Per_Athlete}

              />
        ));

        // Set the state of the person list to the value returned by the HTTP response from the server.
        this.setState({
          countries: participationDivs,
        });
      })
      .catch(err => console.log(err)); // Print the error if there is one.
  }


render() {
    return (
      <>
      <IndexNavbar />
      <AverageHeader />
      <div className="section section-buttons">

            <br />
            <container>
            <div className="jumbotron">
              <div className="sports-container">
                <div className="sport">
                  <div className="header-lg"><strong>Country</strong></div>
                  <div className="header"><strong>Average Medals per Athelete</strong></div>
                </div>
                <div className="sports-container" id="results">
                  {this.state.countries}
                </div>
              </div>
            </div>
            </container>
        </div>
      </>
    );
  };
};



// export default SectionButtons;
