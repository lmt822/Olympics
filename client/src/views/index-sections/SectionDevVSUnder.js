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
import DevVSUnderRow from '../../components/DevVSUnderRow';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import DevVSUnderHeader from "components/Headers/DevVSUnderHeader.js"
import DemoFooter from "components/Footers/DemoFooter.js";
import ApexCharts from "react-apexcharts";

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


export default class DevVSUnderPage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    this.state = {
      sport: [],
      country: [],
      series1: [],
      series2: [],
      options: {
        legend: {
          show: true,
          position: 'right',
        },
        chart: {
          height: 1000,
          type: 'treemap'
        },
        title: {
          text: ''
        }
      }
    };
  };


 // React function that is called when the page load.
componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/getUnderdeveloped", {
      method: "GET", // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(participationList => {
        var data = [];
        for (var i=0; i<participationList.length;i++) {
          let tmp = {x:participationList[i].Sport,y:participationList[i].Medals};
          data.push(tmp);
        }
        let tmp_series = [{'data':data}];
        this.setState({
          series1: tmp_series
        });
      })
      .catch(err => console.log(err)); // Print the error if there is one.

      // Send an HTTP request to the server.
      fetch("http://localhost:8081/getDeveloped", {
        method: "GET", // The type of HTTP request.
      })
        .then(res => res.json()) // Convert the response data to a JSON.
        .then(participationList => {
         var data = [];
          for (var i=0; i<participationList.length;i++) {
            let tmp = {x:participationList[i].Country,y:participationList[i].Medals};
            data.push(tmp);
          }
        let tmp_series = [{'data':data}];
        this.setState({
          series2: tmp_series
        });

        })
        .catch(err => console.log(err)); // Print the error if there is one.

  }


render() {
    return (
      <>
      <IndexNavbar />
      <DevVSUnderHeader />
            <br />
            <div className="container" style={{backgroundColor: "White"}}>
              <div className="sports-container">
              <div className="h2">Olympic Performance of Developed Countries (GDP per capita > 12,000 USD per year) </div>
                <div id="chart" >
                  <ApexCharts options={this.state.options} series={this.state.series2} type='treemap' height='300' />
              </div>
              </div>
            </div>


            <br />
            <div className="container" style={{backgroundColor: "White"}}>
              <div className="h2"> Sports Underdeveloped Countries Win Most Medals In (GDP per capita lower than 1,000 USD per year) </div>
                <div id="chart" >
                  <ApexCharts options={this.state.options} series={this.state.series1} type='treemap' height='300' />
              </div>
              </div>



      <DemoFooter />

      </>
    );
  };
};



// export default SectionButtons;
