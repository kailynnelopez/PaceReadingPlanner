import React from "react";
import {useState} from 'react';
import "./Landing.css";
import Form from './Form.jsx';

function Landing() {

  return (
    <>
      <div className="header">
        <h1>Pace Reading Planner</h1>
        <p>For Planners & Procrastinators Alike</p>
      </div>
      <Form />
    </>
  );
}

export default Landing;
