import { Container } from "postcss";
import React from "react";
import "../styles/Landing.css";
import arrow from '../assets/down-arrow.png';
import Form from "./Form";

// import arrowdark from '../assets/down-arrow-dark.png';

function Landing() {

  return (
    <>
      <div className="banner">
        <div className="header">
          <h1>PA</h1>
          <h2>CE</h2>
          <h3>a reading planner for procrastinators & planners alike</h3>
          <a href='#form'>
            <div>
              <img src={arrow} alt="down arrow"/>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
