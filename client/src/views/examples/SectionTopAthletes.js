import React from "react";
// plugin that creates slider
import Slider from "nouislider";
import ReactWordcloud from 'react-wordcloud';
import wiki from 'wikijs';


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
  UncontrolledTooltip
} from "reactstrap";

const options = {'rotations':0, 'enableTooltip': false};
const items = [
  {
    src: require("assets/img/0.jpg").default,
    altText: "Michael",
    caption: "",
  },
  {
    src: require("assets/img/1.jpg").default,
    altText: "larisa latynina",
  },
  {
    src: require("assets/img/2.jpg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/3.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/4.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/5.png").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/6.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/7.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/8.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/9.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/10.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/11.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/12.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/13.png").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/14.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/15.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/16.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/17.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/18.jpeg").default,
    altText: "carl lewis",
  },
  {
    src: require("assets/img/19.jpeg").default,
    altText: "carl lewis",
  }
];
function SectionTopAthletes() {
   const [keywords,setKeywords] = React.useState(null);
   const [athletesDict,setAthletesDict] = React.useState([{'text':'Michael', 'value':1}]);
   React.useEffect(() => {
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
      const keywordsDivs = keywordsList.map((keywordObj, i) => {
        var target_id = 'tooltip' + i;
        var url = "https://www.google.com/search?q="+keywordObj.Name;
        return (
          <Button id={target_id}
                className="btn-round mr-1" 
                color={colors[i%5]}
                type="button"
                href={url}
                target="_blank"
                 >
        {keywordObj.Name}
          <UncontrolledTooltip
                delay={0}
                placement="top"
                target={target_id}
              >
               <img src={items[i].src} alt={items[i].altText} className="img-rounded img-responsive"/>
          </UncontrolledTooltip>
          </Button>
          )
      });
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