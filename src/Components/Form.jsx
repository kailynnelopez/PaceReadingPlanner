import React, { Component } from "react";
import { useState } from "react";
import "../styles/Form.css";
import "../styles/App.css";

function calcDate(date1, date2) {
    /*
     * calcDate() : Calculates the difference between two dates
     * @date1 : "First Date in the format MM-DD-YYYY"
     * @date2 : "Second Date in the format MM-DD-YYYY"
     * return : Array
     */
    //new date instance
    const dt_date1 = new Date(date1);
    const dt_date2 = new Date(date2);
  
    //Get the Timestamp
    const date1_time_stamp = dt_date1.getTime();
    const date2_time_stamp = dt_date2.getTime();
  
    let calc;
  
    //Check which timestamp is greater
    if (date1_time_stamp > date2_time_stamp) {
      calc = new Date(date1_time_stamp - date2_time_stamp);
    } else {
      calc = new Date(date2_time_stamp - date1_time_stamp);
    }
    //Retrieve the date, month and year
    const calcFormatTmp =
      calc.getDate() + "-" + (calc.getMonth() + 1) + "-" + calc.getFullYear();
    //Convert to an array and store
    const calcFormat = calcFormatTmp.split("-");
    //Subtract each member of our array from the default date
    const days_passed = Number(Math.abs(calcFormat[0]) - 1);
    const months_passed = Number(Math.abs(calcFormat[1]) - 1);
    const years_passed = Number(Math.abs(calcFormat[2]) - 1970);
  
    //Set up custom text
    const yrsTxt = ["year", "years"];
    const mnthsTxt = ["month", "months"];
    const daysTxt = ["day", "days"];
  
    //Convert to days and sum together
    const total_days = years_passed * 365 + months_passed * 30.417 + days_passed;
  
    //display result with custom text
    const result =
      (years_passed == 1
        ? years_passed + " " + yrsTxt[0] + " "
        : years_passed > 1
        ? years_passed + " " + yrsTxt[1] + " "
        : "") +
      (months_passed == 1
        ? months_passed + " " + mnthsTxt[0]
        : months_passed > 1
        ? months_passed + " " + mnthsTxt[1] + " "
        : "") +
      (days_passed == 1
        ? days_passed + " " + daysTxt[0]
        : days_passed > 1
        ? days_passed + " " + daysTxt[1]
        : "");
  
    //return the result
    // return {
    //     "total_days": Math.round(total_days),
    //     "result": result.trim()
    // }
    return Math.round(total_days + 1); // add one to include the starting date but leave out the due date
  }

function calcDailyPages(dateDiff, totalPages) {
  if (totalPages % dateDiff == 0) {
    let dailyPages = [];
    let evenReadingDivision = totalPages / dateDiff;

    for (let d = 0; d < dateDiff; d++) {
      dailyPages.push(evenReadingDivision);
    }
    return dailyPages;
  } else {
    let r = totalPages % dateDiff;
    let divisibleTotalPages = totalPages - r;
    let evenReadingDivision = divisibleTotalPages / dateDiff;

    let dailyPages = [];

    for (let d = 0; d < dateDiff; d++) {
      dailyPages.push(evenReadingDivision);
    }
    for (let d = 0; d < r; d++) {
      dailyPages[d] += 1;
    }

    return dailyPages;
  }
}

function Test() {
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    startDate: '',
    dueDate: '',
    number: '',
    string: '',
    dateDiff: '',
    dailyPages: '',
  });
  const [submittedData, setSubmittedData] = useState([]);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
    const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedData([...submittedData, formData]);

    const dateDiff = calcDate(formData.startDate, formData.dueDate);
    formData.dateDiff = dateDiff;
    console.log('dateDiff:', dateDiff);

    const dailyPages = calcDailyPages(dateDiff, formData.number);
    formData.dailyPages = dailyPages;

    setRows(
        Array.from({ length: dateDiff }, (_, index) => (
          <tr key={index}>
            <td>{(index + 1)}</td>
            <td>{dailyPages[index]}</td>
          </tr>
        ))
      );
  
    
    setFormData({
      startDate: '',
      dueDate: '',
      number: '',
      string: '',
      dateDiff: '',
      dailyPages: '',
    });
  };

  return (
    <div className="center-nodal">
      <form class='form' onSubmit={handleSubmit}>
      <div className="form-item">
        <p>Book Info</p>
        <input
            type="text"
            name="string"
            placeholder="Book Title"
            value={formData.string}
            onChange={handleChange}
          />
      </div>
      <div className="form-item">
      <input
            type="number"
            name="number"
            placeholder="Total Pages"
            value={formData.number}
            onChange={handleChange}
          />
      </div>
      <div className="column-form-item">
        {" "}
        <div className="form-item">
            <p>Start Date</p>
            <input
            type="date"
            name="startDate"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
            <p>Due Date</p>
            <input
            type="date"
            name="dueDate"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="dual-button">
        <div className="btn-block">
            <button type="reset">
                RESET
            </button>
        </div>
        {" "}
        <div className="btn-block">
            <button type="submit">
                GENERATE PLAN
            </button>
        </div>
      </div>
      </form>

      <div className="center-schedule">
        
        <p class='schedule-text'>
            {submittedData.map((data, index) => (
            <>
              <h2>Schedule</h2>
              <p class='schedule-text'>Plan For: {data.string}</p>
              <p class='schedule-text'>Starting On: {data.startDate}</p>
              <p class='schedule-text'>Ending by: {data.dueDate}</p>
            </>
            ))} 
        </p>
        {submittedData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Reading Day</th>
              <th>Pages Per Day</th>
            </tr>
          </thead>
          {rows.length > 0 && (<tbody>{rows}</tbody>)}
            
        </table>
      )}
      </div>
    </div>
  );
}

{/* {submittedData.map((data, index) => (
              <tr key={index}>
                <td>{data.string}</td>
                <td>{data.number}</td>
                <td>{data.startDate}</td>
                <td>{data.dueDate}</td>
                <td>{data.dateDiff}</td>
                <td>{data.dailyPages}</td>
              </tr>
            ))} */}

export default Test;
