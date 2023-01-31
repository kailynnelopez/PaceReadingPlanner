import React, {Component} from "react";
// import {useState} from 'react';
import Form from './Form.jsx';
import '../styles/Results.css';

function Table({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.age}</td>
            <td>{row.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Results() {
  const data = [
    { name: "John Doe", age: 32, city: "New York" },
    { name: "Jane Doe", age: 28, city: "London" },
    { name: "Jim Smith", age: 40, city: "Paris" }
  ];

  return <Table data={data} />;
}

export default Results;

