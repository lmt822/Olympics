import React from "react";
// plugin that creates slider
import Slider from "nouislider";
import ReactWordcloud from 'react-wordcloud';


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

const options = {'rotations':0, 'enableTooltip': false};
function SectionTopAthletes() {
   const [keywords,setKeywords] = React.useState(null);
   const [athletesDict,setAthletesDict] = React.useState([{'text':'Michael', 'value':1}]);
   React.useEffect(() => {
    console.log(1);
    // Update the document title using the browser API
    fetch("http://localhost:8081/getTop20Athletes",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(keywordsList => {
      if (!keywordsList) return;

      // Map each keyword in this.state.keywords to an HTML element:
      // A button which triggers the showMovies function for each keyword.
      var colors = ['danger', 'warning', 'success', 'info', 'default']
      const keywordsDivs = keywordsList.map((keywordObj, i) =>
        <Button id={i}
                className="btn-round mr-1" 
                color={colors[i%5]}
                type="button"
                href="/athlete/physical" >
        {keywordObj.Name}
        </Button>
      );
      setKeywords(keywordsDivs);
      var tmp = [{'text':'Michael', 'value':1}];
      console.log(tmp);
      for (var i=0;i<keywordsList.length;i++) {
        tmp.push({'text': keywordsList[i].Name, 'value': 100/(i+1)});
      }

      setAthletesDict(tmp);
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }, []);
 
  return (
    <div className="section">
      <Container>
          <div className="title">
            <h2>Top performing athletes in history</h2>
          </div>
      {keywords}
    </Container>
    <Container>
      <div className="title">
            <h2>Hall of fame</h2>
          </div>
     <ReactWordcloud words={athletesDict} options={options}/>
    </Container>
    </div>
    )
};
export default SectionTopAthletes;