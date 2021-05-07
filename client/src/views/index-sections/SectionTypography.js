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
import { WorldMap } from "react-svg-worldmap"

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function SectionTypography() {

  return (
    <>

      <Container className="tim-container">
        <div className="title">

              <blockquote className="blockquote">
                <p className="mb-0">
                <b>The modern Olympic Games are leading international sporting events featuring summer and winter sports competitions in which thousands of athletes from around the world participate in a variety of competitions. The Olympic Games are considered the world's foremost sports competition with more than 200 nations participating. The Olympic Games are normally held every four years, alternating between the Summer and Winter Olympics every two years in the four-year period.</b>
                </p>
                <br />
                <footer className="blockquote-footer">
                  <cite title="source Title">Wikipedia</cite>
                </footer>
              </blockquote>

        </div>
      </Container>
    </>
  );
}

export default SectionTypography;
