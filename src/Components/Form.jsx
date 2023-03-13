import React, { Component } from "react";
import { useState } from "react";
import "../styles/Form.css";
import "../styles/App.css";


// Find Difference between 2 dates  -----------------------------------------
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

function getDates (startDate, endDate) {
  const dates = [];
  let currentDate = startDate;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}

// Format Date for Table Display -----------------------------------------
function formatDate(newDate) {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  }
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const d = newDate
  const year = d.getFullYear()
  const date = d.getDate()
  const monthIndex = d.getMonth()
  const monthName = months[d.getMonth()]
  const dayName = days[d.getDay()] // Thu
  const formatted = `${dayName}, ${monthName} ${date}`
  return formatted.toString()
};

function Form() {
  const [rows, setRows] = useState([]);

  const [formData, setFormData] = useState({
    startDate: '' ,
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

    const dailyPages = calcDailyPages(dateDiff, formData.number);
    formData.dailyPages = dailyPages;

    formData.startDate = formatDate(new Date(formData.startDate));
    formData.dueDate = formatDate(new Date(formData.dueDate));

    // const dateArray = getDates(formData.startDate, formData.dueDate);

    setRows(
        Array.from({ length: dateDiff }, (_, index) => (
          <tr key={index}>
            <td>{(index + 1)}</td>
            {/* <td>{dateArray[index]}</td> */}
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


  // Calculate Minimum Start Date Value -----------------------------------------
  var curr = new Date();
  // curr.setDate(curr.getDate() - 1);
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0,10);

  return (
    <section className="form-section" id='form'>
      <div className="nodal">
        <form onSubmit={handleSubmit}>
          <div className="form-item">
             <p>Book Title *</p>
              <input
                  type="text"
                  name="string"
                  placeholder="Book Title"
                  value={formData.string}
                  onChange={handleChange}
              />
              <p>Total <b>Pages</b> *</p>
              <input
                  type="number"
                  name="number"
                  placeholder="Total Pages"
                  value={formData.number} //remove to keep previous value
                  onChange={handleChange}
                  min="0"
              />
              <div className="form-item">
                  <p>Start Date *</p>
                  <input
                      type="date"
                      name="startDate"
                      onChange={handleChange}
                      // defaultValue={date}
                      min={date}
                      value={formData.startDate}
              />
              </div>
              <div className="form-item">
                  <p>Due Date *</p>
                  <input
                      type="date"
                      name="dueDate"
                      // defaultValue={date}
                      value={formData.dueDate}
                      min={date}
                      onChange={handleChange}
              />
              </div>
          </div>
          <button 
              disabled={!formData.string || !formData.number || !formData.startDate || !formData.dueDate}
              type="submit">Generate Plan
          </button>
        </form>
        <div className="center-schedule">
          {submittedData.length > 0 && (
          <div className='schedule-text'>
            {submittedData.map((data, index) => (
            <>
              <table>
                <thead>
                    <tr>
                      <th className="plan-info" colSpan="3">Title: {data.string}</th>
                    </tr>
                    <tr>
                      <th className="plan-info">Starting On: {data.startDate}</th>
                      <th className="plan-info">Finish By: {data.dueDate}</th>
                      <th className="plan-info">Total Pages: {data.number}</th>
                    </tr>
                </thead>
              </table>
            </>
            ))} 
          </div> )}
          {submittedData.length > 0 && (
              <table>
              <thead>
                  <tr>
                    <th>Reading Day</th>
                    {/* <th>Date</th> */}
                    <th>Pages Per Day</th>
                  </tr>
              </thead>
              {rows.length > 0 && (<tbody>{rows}</tbody>)}
                  
              </table>
          )}
        </div> 
      </div>
    </section>
  );
}


export default Form;
