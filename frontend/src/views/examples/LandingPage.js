import React from "react";
import  "./LandingPage.css"
import { render } from "react-dom";
import "react-animated-slider/build/horizontal.css";
import "./slider-animations.css";
import "./sliderstyles.css";
import ProdDrop from "./ProdDrop"
import LastPart from "./Lastpart";
import Navbaar from "./navbaar";
import Hamber from "./Hamber";
import Mycard from "./card";
import SearchBar from "../Search_Bar"
import Slider from "react-animated-slider";
import SecNav from"./secNav";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import test from "./test.jpg";
import visualisations from "./Visualisations.jpg";
import aiml from "./AIML.jpg"
import aidb from "./AIDB.png"
import NewFooter from "./NewFooter";
import DemoDrop from "./demodropdowns";


const content = [
  {
    title: "AIDatabases",
    description:
      "Maintaining Economic, Socio-Economic and Financial Databases",
    button: "Read More",
    image: aidb,
    path: "/About",
    // user: "Luan Gjokaj",
    // userProfile: "https://i.imgur.com/JSW6mEk.png"
  },
  {
    title: "AI and ML Tools",
    description:
      "Leveraging the tools of AI and ML in the world of Finance",
    button: "Read More ",
    image: aiml,
    path: "/About",
    // user: "Bruno Vizovskyy",
    // userProfile: "https://i.imgur.com/4KeKvtH.png"
  },
  {
    title: "Intuitive Search !",
    description:
      "Revolutionising Search with attribute locking, Auto-suggestion and Auto-complete Featutre",
    button: "Read More",
    image: test,
    path: "/About",
    // user: "Luan Gjokaj",
    // userProfile: "https://i.imgur.com/JSW6mEk.png"
  },
  {
    title: "Data Visualisation",
    description:
      "Elegant Information Visualisations for every data Point",
    button: "Read more",
    image: visualisations,
    path: "/About",
    // user: "Erich Behrens",
    // userProfile: "https://i.imgur.com/0Clfnu7.png"
  },
  
  
];

const Slide = () => (
  
  <div className= "slider-main">
    {/* <h1>{content.length} elements autoplay 1s</h1> */}
    <Slider className="slider-wrapper" autoplay={2000}>
      {content.map((item, index) => (
        <div
          key={index}
          className="slider-content"
          style={{ background: `url('${item.image}') no-repeat center center` }}
        >
          <div className="inner">
            <div className="slide-title"><h1>{item.title}</h1></div>
            <div className="slide-p"><p>{item.description}</p></div>
            <div className="slide-btn"><button onClick={(e) => {e.preventDefault();window.location.href= `${item.path}`;}}>{item.button}</button></div>
          </div>

        </div>
      ))}
    </Slider>

  </div>
);

    

function LandingPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  const footer = {
      paddingTop: '50px'
  };

  return (
   <>
      <Slide />
      <SearchBar />
      <Mycard />
    </>
  );
}

export default LandingPage;