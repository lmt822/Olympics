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
import NameRow from '../../components/NameRow';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import SportHeader from "components/Headers/SportHeader.js"
import DemoFooter from "components/Footers/DemoFooter.js";


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


export default class SportPage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of countries,
    // and a list of sports for a specified country.
    this.state = {
        sport_options: [],
        names: [],
        selectedSport: "Aeronautics"
    };

    this.submitFilter = this.submitFilter.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
  };

componentDidMount() {
    fetch("http://localhost:8081/getsport", {
      method: 'GET' 
      }).then((res) => {
    // Convert the response data to a JSON.
    return res.json()
    }, err => {
    // Print the error if there is one.
      console.log(err);
    }).then((sportList) => {
      if (!sportList) return;

    // Map each country in this.state.countries to an HTML element:
    // A button which triggers the showSports function for each country.

    const sportOpt = sportList.map((sportObj, i) =>
    <option className="sportOption" value={sportObj.sport}>{sportObj.sport}</option>
    );
  
    // Set the state of the countries list to the value returned by the HTTP response from the server.
    this.setState({
      sport_options: sportOpt,
    });
  }, err => {
    // Print the error if there is one.
    console.log(err);
  })
};


    handleSportChange(e) {
      this.setState({
        selectedSport: e.target.value
      });
	};


  submitFilter() {
        fetch("http://localhost:8081/sport/" + this.state.selectedSport,
		{
			method: 'GET' 
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(athleteList => {
            console.log(athleteList);
			let athleteDivs = athleteList.map((athlete, i) => 
            <NameRow 
                name = {athlete.Name}
                medals = {athlete.gold} 
            /> 
			);		
			this.setState({
				names: athleteDivs
				});
			}, err => {
				console.log(err);
			});
	};


  render() {    
    return (
      <>
      <IndexNavbar />
      <SportHeader/>
      <br />
        <div className="container" style={{backgroundColor: "white"}}>
            <h2> Popular Sports with Brief Description </h2>
            <br />

            <Button
            className="btn-round mr-1"
            color="danger"
            href="https://www.google.com/search?q=Acrobatic Gymnastics"
            targe="_blank"
            id="tooltip392938669"
            outline
            >
              Acrobatic Gymnastics
            </Button>
          
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938669"
            >
              Acrobatic gymnastics is a competitive gymnastic discipline where partnerships of gymnasts 
              work together and perform figures consisting of acrobatic moves, dance and tumbling, set to music. 
              There are three types of routines; a 'balance' routine where the focus is on strength, 
              poise and flexibility; a 'dynamic' routine which includes throws, somersaults and catches, 
              and a 'combined' routine which includes elements from both balance and dynamic.
            </UncontrolledTooltip>
      

            <Button
              className="btn-round mr-1"
              color="info"
              href="https://www.google.com/search?q=Archery"
              targe="_blank"
              id="tooltip392938670"
              outline
            >
              Archery
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938670"
            >
              Archery is the art, sport, practice, or skill of using a bow to shoot arrows.
              The word comes from the Latin arcus for bow. Historically, archery has been used for 
              hunting and combat. In modern times, it is mainly a competitive sport and recreational activity. 
              A person who participates in archery is typically called an archer or a bowman, 
              and a person who is fond of or an expert at archery is sometimes called a toxophilite or 
              a marksman.
            </UncontrolledTooltip>

            <Button
              className="btn-round mr-1"
              href="https://www.google.com/search?q=Artistic gymnastics"
              targe="_blank"
              color="warning"
              id="tooltip392938671"
              outline
            >
              Artistic gymnastics
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938671"
            >
              Artistic gymnastics is a discipline of gymnastics in which athletes perform short routines 
              (ranging from about 30 to 90 seconds) on different apparatuses, with less time for vaulting. 
              The sport is governed by the Fédération Internationale de Gymnastique (FIG), 
              which designs the code of points and regulates all aspects of international elite competition. 
              Within individual countries, gymnastics is regulated by national federations, 
              such as Gymnastics Canada, British Gymnastics, and USA Gymnastics. 
              Artistic gymnastics is a popular spectator sport at many competitions, 
              including the Summer Olympic Games.
            </UncontrolledTooltip>

            <Button
              className="btn-round mr-1"
              href="https://www.google.com/search?q=Artistic gymnastics"
              targe="_blank"
              color="primary"
              id="tooltip392938672"
              outline
            >
              Athletics
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938672"
            >
              Athletics is a group of sporting events that involves competitive running, jumping, throwing, 
              and walking. The most common types of athletics competitions are track and field, 
              road running, cross country running, and racewalking.
            </UncontrolledTooltip>

            <Button
              className="btn-round mr-1"
              href="https://www.google.com/search?q=biathlon"
              targe="_blank"
              color="success"
              id="tooltip392938673"
              outline
            >
              BIATHLON
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938673"
            >
              The biathlon is a winter sport that combines cross-country skiing and rifle shooting. 
              It is treated as a race, with contestants skiing through a cross-country trail whose distance 
              is divided into shooting rounds. The shooting rounds are not timed per se, 
              but depending on the competition missed shots result in extra distance or time being 
              added to the contestant's total.
            </UncontrolledTooltip>

            <Button
              className="btn-round mr-1"
              href="https://www.google.com/search?q=BMX freestyle"
              targe="_blank"
              color="info"
              id="tooltip392938674"
              outline
            >
              BMX Freestyle
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938674"
            >
              Freestyle BMX is bicycle motocross stunt riding on BMX bikes. 
              It is an extreme sport descended from BMX racing that consists of five disciplines: 
              street, park, vert, trails, and flatland. 
              In June 2017, the International Olympic Committee announced that it was to be added 
              as an Olympic event to the 2020 Summer Olympics.
            </UncontrolledTooltip>

            <Button
              className="btn-round mr-1"
              href="https://www.google.com/search?q=bobsleigh"
              targe="_blank"
              color="danger"
              id="tooltip392938675"
              outline
            >
              BOBSLEIGH
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938675"
            >
              Bobsleigh or bobsled is a team winter sport that involves making timed runs down narrow, 
              twisting, banked, iced tracks in a gravity-powered sleigh. 
              International bobsleigh competitions are governed by the International Bobsleigh 
              and Skeleton Federation, also known as FIBT from the French Fédération 
              Internationale de Bobsleigh et de Tobogganing. 
              National competitions are often governed by bodies such as the United States Bobsled 
              and Skeleton Federation and Bobsleigh Canada Skeleton.
            </UncontrolledTooltip>

            <Button
              className="btn-round mr-1"
              href="https://www.google.com/search?q=modern pentathlon"
              targe="_blank"
              color="warning"
              id="tooltip392938676"
              outline
            >
              MODERN PENTATHLON
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938676"
            >
              The modern pentathlon is an Olympic sport that comprises five different events; 
              fencing, freestyle swimming (200 m), equestrian show jumping (15 jumps), 
              and a final combined event of pistol shooting and cross country running (3200 m). 
              This last event is now referred to as the laser-run, 
              since it alternates four legs of laser pistol shooting followed by an 800 m run 
              (for 3200 m in total). The event is inspired by the traditional pentathlon held during 
              the ancient Olympics; as the original events were patterned on the skills needed by an 
              ideal Greek soldier of the era, the modern pentathlon is similarly patterned on events 
              representing the skills needed by cavalry behind enemy lines.
            </UncontrolledTooltip>

            <Button
              className="btn-round mr-1"
              href="https://www.google.com/search?q=skeleton"
              targe="_blank"
              color="info"
              id="tooltip392938677"
              outline
            >
              Skeleton
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938677"
            >
              Skeleton is a winter sliding sport in which a person rides a small sled, 
              known as a skeleton bobsled (or -sleigh), down a frozen track while lying 
              face down and head-first. The sport and the sled may have been named from the bony 
              appearance of the sled.
              Unlike other sliding sports of bobsleigh and luge, the race always involves single riders. 
              Like bobsleigh, but unlike luge, the race begins with a running start from the opening gate 
              at the top of the course. The skeleton sled is thinner and heavier than the luge sled, 
              and skeleton affords the rider more precise control of the sled. Skeleton is the slowest 
              of the three sliding sports, as skeleton's face-down, head-first riding position is less 
              aerodynamic than luge's face-up, feet-first ride.
            </UncontrolledTooltip>

            <Button
              className="btn-round mr-1"
              href="https://www.google.com/search?q=Trampoline"
              targe="_blank"
              color="success"
              id="tooltip392938678"
              outline
            >
              Trampoline
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938678"
            >
              Trampolining or trampoline gymnastics is a recreational activity, acrobatic 
              training tool as well as a competitive Olympic sport in which athletes perform 
              acrobatics while bouncing on a trampoline.[2] In competition, these can include 
              simple jumps in the straight, pike, tuck, or straddle position to more complex 
              combinations of forward and/or backward somersaults and twists. Scoring is based on 
              the difficulty and on the total seconds spent in the air. Points are deducted for bad 
              form and horizontal displacement from the center of the bed.
              Outside of the Olympics, competitions are referred to as Gym sport, Trampoline Gymnastics (TG)
              , or Gymnastics, which includes the events of Trampoline, Synchronised Trampoline, 
              Double Mini-Trampoline and Tumbling.
            </UncontrolledTooltip>

            <Button
              className="btn-round mr-1"
              href="https://www.google.com/search?q=triathlon"
              targe="_blank"
              color="warning"
              id="tooltip392938679"
              outline
            >
              TRIATHLON
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="bottom"
              target="tooltip392938679"
            >
              A triathlon is an endurance multisport race consisting of swimming, cycling, 
              and running over various distances. Triathletes compete for fastest overall 
              completion time, racing each segment sequentially with the time transitioning 
              between the disciplines included.
              The sport has its roots in multi-event races held in France during the 1920s, 
              with more specified rules and races forming during the late 1970s as sports 
              clubs and individuals developed the sport. This history has meant that variations 
              of the sport were created and still exist, it also lead to other three stage races 
              to use the name triathlon despite not being continuous or not consisting of swim bike 
              and run elements.
              Triathletes train to achieve endurance, strength, speed, requiring 
              focused persistent and periodised training for each of the three disciplines, 
              as well as combination workouts and general strength conditioning.
            </UncontrolledTooltip>
        <br />

        <div className="container" style={{backgroundColor: "white"}}>
                <h2>Athletes with the most gold medals (in a given sport)</h2>
                <div className="dropdown-container">
                    <select value={this.state.selectedSport} onChange={this.handleSportChange} className="dropdown" id="sportDropdown">
                        {this.state.sport_options}
                    </select>
                   <Button color='info'className="btn-round mr-1" type="button" onClick={this.submitFilter}>Submit</Button>
            </div>

            <br />
            <div className="container" style={{backgroundColor: "White"}}>
              <div className="country-container" style={{backgroundColor: "white"}}>
                <div className="sport">
                  <div className="h3"><strong>Athlete</strong></div>
                  <div className="h3" style={{'text-align': 'left'}}><strong>Number of Gold Medals</strong></div>
                </div>
                  {this.state.names}
              </div>
            </div>

        </div>
      </div> 
      <DemoFooter />    
      </>      
    );
  };
};


// export default SectionButtons;


