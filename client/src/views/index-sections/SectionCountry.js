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
import SportRow from '../../components/SportRow';
import SportRow1 from '../../components/SportRow1';
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
  UncontrolledTooltip,
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
			selectedCountry: "Afghanistan",
    };

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
      let countriesDivs = countryList.map((countryObj, i) => (
            <SportRow1
                countries = {countryObj.Country_name}
                medals = {countryObj.medals}
            />
      ));

      const countriesOpt = optionsList.map((countryObj, i) =>
        <option className="countriesOption" value={countryObj.Country_name}>{countryObj.Country_name}</option>
      );
    
      // Set the state of the countries list to the value returned by the HTTP response from the server.
      this.setState({
        countries: countriesDivs,
        country_options: countriesOpt
      })
    })
  .catch(err => console.log(err));
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


  render() {    
    return (
      <>
      <IndexNavbar />
      <CountryHeader />
      <div className="section section-buttons">

        <br />
        <div className="container countries-container">
          <div className = 'jumbotron'>
            <h5>Popular Countries with Brief Description</h5>
            <Button
            // className="btn-round mr-1"
            color="default"
            id="tooltip392938669"
            outline
            >
              UNITED STATES OF AMERICA
            </Button>
          
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938669"
            >
              The United States of America, commonly known as the United States (U.S. or US) or America,
              is a country primarily located in North America. It consists of 50 states, a federal district,
              five major self-governing territories, 326 Indian reservations, and some minor possessions.
              At 3.8 million square miles (9.8 million square kilometers),
              it is the world's third- or fourth-largest country by total area. 
              With a population of more than 324 million people, 
              it is the third most populous country in the world. 
              The national capital is Washington, D.C., and the most populous cities include New York City, Chicago, Boston, Los Angeles, and San Francisco etc.
            </UncontrolledTooltip>
      

            <Button
              // className="btn-round mr-1"
              color="default"
              id="tooltip392938670"
              outline
            >
              CHINA
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938670"
            >
              China, officially the People's Republic of China (PRC), is a country in East Asia. 
              It is the world's most populous country, with a population of around 1.4 billion. 
              China covers an area of approximately 9.6 million square kilometers (3.7 million mi2), 
              it is the world's third or fourth-largest country.
              The country is officially divided into 23 provinces, five autonomous regions, 
              four direct-controlled municipalities (Beijing, Tianjin, Shanghai, and Chongqing), 
              and two special administrative regions of Hong Kong and Macau.
            </UncontrolledTooltip>

            <Button
              // className="btn-round mr-1"
              color="default"
              id="tooltip392938671"
              outline
            >
              UNITED KINGDOM
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938671"
            >
              The United Kingdom of Great Britain and Northern Ireland, 
              commonly known as the United Kingdom (UK) or Britain, 
              is a sovereign country in north-western Europe, 
              off the north-­western coast of the European mainland.
              The United Kingdom includes the island of Great Britain, 
              the north-­eastern part of the island of Ireland, 
              and many smaller islands within the British Isles. 
              The Irish Sea separates Great Britain and Ireland. 
              The total area of the United Kingdom is 94,000 square miles (240,000 km2).
            </UncontrolledTooltip>

            <Button
              // className="btn-round mr-1"
              color="default"
              id="tooltip392938672"
              outline
            >
              FRANCE
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938672"
            >
              France is a country primarily located in Western Europe, 
              consisting of metropolitan France and several overseas regions and territories.
              The metropolitan area of France extends from the Rhine to the Atlantic Ocean 
              and from the Mediterranean Sea to the English Channel and the North Sea. 
              The overseas territories include French Guiana in South America and several islands 
              in the Atlantic, Pacific and Indian Oceans.  
              The country's eighteen integral regions (five of which are situated overseas) span 
              a combined area of 643,801 km2 (248,573 sq mi) and a total population of 65 million. 
              France is a unitary semi-presidential republic with its capital in Paris, 
              the country's largest city and main cultural and commercial centre. 
            </UncontrolledTooltip>

            <Button
              // className="btn-round mr-1"
              color="default"
              id="tooltip392938673"
              outline
            >
              CANADA
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938673"
            >
              Canada is a country in North America. 
              Its ten provinces and three territories extend from the Atlantic 
              to the Pacific and northward into the Arctic Ocean, 
              covering 9.98 million square kilometres (3.85 million square miles), 
              making it the world's second-largest country by total area. 
              Its southern and western border with the United States, 
              stretching 8,891 kilometres (5,525 mi), 
              is the world's longest bi-national land border. 
              Canada's capital is Ottawa, 
              and its three largest metropolitan areas are Toronto, Montreal, and Vancouver.
            </UncontrolledTooltip>

            <Button
              // className="btn-round mr-1"
              color="default"
              id="tooltip392938674"
              outline
            >
              RUSSIA
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938674"
            >
              Russia, or the Russian Federation, is a country spanning Eastern Europe and North Asia. 
              It is the largest country in the world, covering over 17 million square kilometres 
              (6.6 sq mi), and encompassing more than one-eighth of the Earth's inhabited land area. 
              Russia extends across eleven time zones, and has borders with sixteen sovereign nations. 
              It has a population of 144 million; and is the most populous country in Europe. 
              Moscow, the capital, is the largest city in Europe, 
              while Saint Petersburg is the nation's second-largest city and cultural centre. 
              Russians are the largest Slavic and European nation; 
              they speak Russian, the most spoken Slavic language, 
              and the most spoken native language in Europe.
            </UncontrolledTooltip>

            <Button
              // className="btn-round mr-1"
              color="default"
              id="tooltip392938675"
              outline
            >
              SPAIN
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938675"
            >
              Spain is a country in Southwestern Europe 
              with some pockets of territory across the Strait of Gibraltar and the Atlantic Ocean.
              Its continental European territory is situated on the Iberian Peninsula. 
              Its territory also includes two archipelagos: 
              the Canary Islands off the coast of North Africa, 
              and the Balearic Islands in the Mediterranean Sea. 
              The African exclaves of Ceuta, Melilla, and Peñón de Vélez de la Gomera 
              make Spain the only European country to have a physical border with an African country 
              (Morocco). 
            </UncontrolledTooltip>

            <Button
              // className="btn-round mr-1"
              color="default"
              id="tooltip392938676"
              outline
            >
              JAPAN
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938676"
            >
              Japan or Nihon is an island country in East Asia, located in the northwest Pacific Ocean. 
              It is bordered on the west by the Sea of Japan, and extends from the Sea of Okhotsk 
              in the north toward the East China Sea and Taiwan in the south. 
              Part of the Ring of Fire, Japan spans an archipelago of 6852 islands covering 377,975 
              square kilometers (145,937 sq mi); the five main islands are Hokkaido, 
              Honshu, Shikoku, Kyushu, and Okinawa. 
              Tokyo is Japan's capital and largest city; 
              other major cities include Yokohama, Osaka, Nagoya, Sapporo, Fukuoka, Kobe, and Kyoto.
            </UncontrolledTooltip>

            <Button
              // className="btn-round mr-1"
              color="default"
              id="tooltip392938677"
              outline
            >
              ITALY
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938677"
            >
              Italy is a country consisting of a continental part, delimited by the Alps,
              a peninsula and several islands surrounding it. 
              Italy is located in Southern Europe, and is also considered part of Western Europe.
              A unitary parliamentary republic with Rome as its capital, 
              the country covers a total area of 301,340 km2 (116,350 sq mi) and shares land borders 
              with France, Switzerland, Austria, Slovenia, and the enclaved microstates of Vatican 
              City and San Marino. Italy has a territorial enclave in Switzerland (Campione) 
              and a maritime exclave in Tunisian waters (Lampedusa). With around 60 million inhabitants, 
              Italy is the third-most populous member state of the European Union.
            </UncontrolledTooltip>

            <Button
              // className="btn-round mr-1"
              color="default"
              id="tooltip392938678"
              outline
            >
              GERMANY
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938678"
            >
              Germany officially the Federal Republic of Germany, is a country in Central Europe. 
              It is the second-most populous country in Europe after Russia, 
              and the most populous member state of the European Union. 
              Germany is situated between the Baltic and North seas to the north, 
              and the Alps to the south; covering an area of 357,022 square kilometres (137,847 sq mi), 
              with a population of over 83 million within its 16 constituent states. 
              It borders Denmark to the north, Poland and the Czech Republic to the east, 
              Austria and Switzerland to the south, and France, Luxembourg, Belgium, 
              and the Netherlands to the west. The nation's capital and largest city is Berlin, 
              and its financial centre is Frankfurt; the largest urban area is the Ruhr.
            </UncontrolledTooltip>


          </div> 
        </div>
          

        <br />
        <div className="container countries-container">
          <div className="jumbotron">
<<<<<<< HEAD
            <div className="h5">Top 20 Countries with the most gold medals in Olympics history
              <div className="header-lg"><strong>Country</strong></div>
              <div className="header"><strong>Number of Gold Medals</strong></div>
            </div>
=======
            <div className="h5">Top 20 Countries with the most gold medals in Olympics history</div>
>>>>>>> 98465405a774486f19ab8591df2ac4f4cf1449c7
            <div className="countries-container">
              {this.state.countries}
            </div>
          </div>

          <br />
          <div className="container countries-container">
            <div className="jumbotron">
              <div className="h5">Individual Country Olympic Performance</div>
              <div className="dropdown-container">
                <select value={this.state.selectedCountry} onChange={this.handleCountryChange} className="dropdown" id="countriesDropdown">
                  {this.state.country_options}
                </select>
                <button className="submit-btn" id="submitBtn" onClick={this.submitCountry}>Submit</button>
              </div>
            </div>

            <br />
            <container>
            <div className="jumbotron">
              <div className="sports-container">
                <div className="sport">
                  <div className="header-lg"><strong>Sport</strong></div>
                  <div className="header"><strong>Number of Gold Medals</strong></div>
                </div>
                <div className="sports-container" id="results">
                  {this.state.sports}
                </div>
              </div>
            </div>
            </container>
			  </div>


        </div>
      </div>     
      </>      
    );
  };
};


// export default SectionButtons;
