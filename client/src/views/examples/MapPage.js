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

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import { WorldMap } from "react-svg-worldmap"
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";


function MapPage() {

    const data =
      [
        { country: "cn", value: 1389618778 }, // china
        { country: "in", value: 1311559204 }, // india
        { country: "us", value: 331883986 },  // united states
        { country: "id", value: 264935824 },  // indonesia
        { country: "pk", value: 210797836 },  // pakistan
        { country: "br", value: 210301591 },  // brazil
        { country: "ng", value: 208679114 },  // nigeria
        { country: "bd", value: 161062905 },  // bangladesh
        { country: "ru", value: 141944641 },  // russia
        { country: "mx", value: 127318112 },  // mexico
        { country: "jp", value: 10 }
      ]
  return (
    <>
        <IndexNavbar />
        <LandingPageHeader />
       <WorldMap color="red" title="" value-suffix="people" size="xxl" data={data} />
    </>
  );
}

export default MapPage;
