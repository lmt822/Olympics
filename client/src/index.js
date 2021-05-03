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
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import MapPage from "views/examples/MapPage.js";
import CountryPage from "views/index-sections/SectionCountry.js";
import AgePage from "views/index-sections/SectionAge.js";
// import StatsPage from "views/index-sections/SectionStats.js";
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
        path="/nucleo-icons"
        render={(props) => <NucleoIcons {...props} />}
      />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route
        path="/country"
        render={(props) => <CountryPage {...props} />}
      />
      <Route
        path="/map"
        render={(props) => <MapPage {...props} />}
      />
      <Route
        path="/athlete/age"
        render={(props) => <AgePage {...props} />}
      />
      {/* <Route
        path="/athlete/physical"
        render={(props) => <StatsPage {...props} />}
      /> */}
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
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
