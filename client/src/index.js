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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import Index from "views/Index.js";
import AboutPage from "views/examples/AboutPage.js";
import MapPage from "views/examples/MapPage.js";
import CountryPage from "views/index-sections/SectionCountry.js";
import SportPage from "views/index-sections/SectionSport.js";
import AgePage from "views/index-sections/SectionAge.js";
import StatsPage from "views/index-sections/SectionStats.js";
import DistributionPage from "views/index-sections/SectionDistribution.js";
import ParticipationPage from "views/index-sections/SectionParticipation.js";
import AveregeMedalPage from "views/index-sections/SectionAverageMedal.js";
import DevVSUnderPage from "views/index-sections/SectionDevVSUnder.js";

// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/country"
        render={(props) => <CountryPage {...props} />}
      />
      <Route
        path="/sport"
        render={(props) => <SportPage {...props} />}
      />
      <Route
        path="/map"
        render={(props) => <MapPage {...props} />}
      />
      <Route
        path="/athlete/age"
        render={(props) => <AgePage {...props} />}
      />
      <Route
        path="/athlete/physical"
        render={(props) => <StatsPage {...props} />}
      />
      <Route
        path="/medal/country"
        render={(props) => <DistributionPage {...props} />}
      />
      <Route
        path="/medal/participation"
        render={(props) => <ParticipationPage {...props} />}
      />
      <Route
        path="/medal/average"
        render={(props) => <AveregeMedalPage {...props} />}
      />
      <Route
        path="/medal/developed"
        render={(props) => <DevVSUnderPage {...props} />}
      />
      <Route
        path="/about"
        render={(props) => <AboutPage {...props} />}
      />
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
