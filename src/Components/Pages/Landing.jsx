import React from "react";
import "./Landing.css";
import Form from '../Form.jsx';
import Footer from '../Footer.jsx';


function Landing() {

  return (
    <>
      <div className="header">
        <h1>Pace Reading Planner</h1>
        <p>For Planners & Procrastinators Alike</p>
      </div>
      <Form />
      <Footer />
    </>
  );
}

export default Landing;
