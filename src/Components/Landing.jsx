import React from "react";
import "../styles/Landing.css";
import Form from './Form.jsx';
import Footer from './Footer.jsx';
import Results from "./Results";


function Landing() {

  return (
    <>
      <div className="header">
        <h1>Pace Reading Planner</h1>
        <h4>FOR PLANNERS & PROCRASTINATORS ALIKE</h4>
      </div>
      <Form />
      <Results />
      <Footer />
    </>
  );
}

export default Landing;
