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


export default class AverageMedalPage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    this.state = {
      countries: [],
      series: [],
      options: {
          chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {}
    }
  }
};


 // React function that is called when the page load.
componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/getAverageMedalsPerAthlete", {
      method: "GET", // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(participationList => {
        var series = [];
        var labels = [];

        for (var i=0; i < participationList.length; i++) {
          labels.push(participationList[i].Country);
          series.push(participationList[i].Medal_Per_Athlete);
        }
        let tmp_options = {...this.state.options, xaxis:{'categories':labels}};
        let tmp_series = [{'name': 'medals per athlete', 'data':series}];

        this.setState({
          series: tmp_series,
          options: tmp_options
        });
      })
      .catch(err => console.log(err)); // Print the error if there is one.
};

render() {
    return (
      <>
      <IndexNavbar />
      <AverageHeader />

            <br />
            <div id="chart" style={{'margin-left': '100px', 'margin-right': '500px'}}>
             <ApexCharts options={this.state.options} series={this.state.series} type="bar" width="1000"/>
              </div>
      <DemoFooter />

      </>
    );
  };
};



// export default SectionButtons;
