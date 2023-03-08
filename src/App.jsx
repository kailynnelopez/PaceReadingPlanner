import React from 'react';
// import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Landing from './Components/Landing';
import Form from './Components/Form';
// import Footer from './Components/Footer';
import './styles/App.css';
import './styles/Landing.css';

function App() {
  return (
    <>
      <Landing />
      <Form />
      {/* <Footer /> */}
    </>
  )
}

export default App;
