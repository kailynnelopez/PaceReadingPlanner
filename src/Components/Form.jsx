import React, {Component} from "react";
import {useState} from 'react';
import "../styles/Form.css";
import "../styles/App.css";


function calcDate(date1, date2){
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
    const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
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
    const total_days = (years_passed * 365) + (months_passed * 30.417) + days_passed;

    //display result with custom text
    const result = ((years_passed == 1) ? years_passed + ' ' + yrsTxt[0] + ' ' : (years_passed > 1) ?
        years_passed + ' ' + yrsTxt[1] + ' ' : '') +
        ((months_passed == 1) ? months_passed + ' ' + mnthsTxt[0] : (months_passed > 1) ?
            months_passed + ' ' + mnthsTxt[1] + ' ' : '') +
        ((days_passed == 1) ? days_passed + ' ' + daysTxt[0] : (days_passed > 1) ?
            days_passed + ' ' + daysTxt[1] : '');

    //return the result
    // return {
    //     "total_days": Math.round(total_days),
    //     "result": result.trim()
    // }
    return Math.round(total_days + 1); // add one to include the starting date but leave out the due date 
}

function calcDailyPages(dateDiff, totalPages) {
    if (totalPages % dateDiff == 0)
    {   
        let dailyPages = [];
        let evenReadingDivision = totalPages / dateDiff;

        for (let d = 0; d<dateDiff; d++){
            dailyPages.push(evenReadingDivision)
        }
        return dailyPages;
    }
    else 
    {
        let r = totalPages % dateDiff;
        let divisibleTotalPages = totalPages - r;
        let evenReadingDivision = divisibleTotalPages / dateDiff;

        let dailyPages = [];

        for (let d = 0; d<dateDiff; d++){
            dailyPages.push(evenReadingDivision)
        }
        for (let d=0; d<r; d++){
            dailyPages[d] += 1;
        }
        
        return dailyPages;
    }

}

function generatePlan(dailyPages, bookTitle, dueDate) {
    // a map that holds the day as a key and the pages to read for that day as the value 
    let plan = [];
    plan['Due Date'] = dueDate;
    for (let d=0; d<dailyPages.length; d++){
        let temp = {};
        temp['Book Title'] = bookTitle;
        temp['day'] = d+1;
        temp['pages'] = dailyPages[d] + ' pages';
        plan.push(temp);
        //  plan[d+1] = (dailyPages[d] + " pages");
    } 

    return plan;
}

// const exportPlanData = Object.values(this.state.registeredData).map(
//     (data) => {
//         return Object.entries(data).map((key,value) => {
//             return `${key}: ${value}`;
//         });


function clearInputs() {
    setBookTitle('');
    setTotalPages();
    setStartDate('');
    setDueDate('');
    setTotalPages('');
}

export default function Form() {

    const [bookTitle, setBookTitle] = useState('');

    const [totalPages, setTotalPages] = useState('');

    const [startDate, setStartDate] = useState('');

    const [dueDate, setDueDate] = useState('');

    const [dailyPages, setDailyPages] = useState('');

    const [plan, setPlan] = useState('');

    const handleSubmit = event => {
        console.log('test handleSubmit');
        event.preventDefault(); // 👈️ prevent page refresh
      
        // 👇️ access input values here
        console.log('Book Title 👉️', bookTitle);
        console.log('Total Pages 👉️', totalPages);
        console.log('Start Date 👉️', startDate);
        console.log('Due Date 👉️', dueDate);

        // Manipulate Input Data
        const dateDiff = calcDate(startDate, dueDate);
        console.log('Difference 👉️', dateDiff);

        const dailyPages = calcDailyPages(dateDiff, totalPages);
        console.log('Pages per day 👉️', dailyPages);
      

        // Create Plan
        const plan = generatePlan(dailyPages, bookTitle, dueDate);
        console.log("Plan: ", plan)
        setPlan(`${plan}`)

        
        setDailyPages(`${dailyPages}`); // Set Result Valuesh
        
        // 👇️ clear all input values in the form
        clearInputs();
    };


  return (
    <>
      <div className="center-nodal">
        <form action="/" className="form">
            <div className="form-item">
            <p>Book Info</p>
            <input 
                id='book-title'
                name="book-title" 
                type="text" 
                placeholder="Book Title" 
                onChange={event => setBookTitle(event.target.value)}
                value={bookTitle}
                />
            </div>
            <div className="form-item">
              <input 
                id='total-pages'
                name='total-pages'
                type="number" 
                placeholder="Total Pages" 
                onChange={event => setTotalPages(event.target.value)}
                value={totalPages}
                />
            </div>
            <div className="column-form-item">
                <div className="form-item">
                    <p>Start Date</p>
                    <input 
                        type="date" 
                        id='start-date' 
                        name="start-date" 
                        onChange={event => setStartDate(event.target.value)}
                        value={startDate}
                        />
                    <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="form-item">
                    <p>Due Date</p>
                    <input 
                        type="date" 
                        id="due-date" 
                        name="due-date"
                        onChange={event => setDueDate(event.target.value)}
                        value={dueDate}
                        />
                    <i className="fas fa-calendar-alt"></i>
                </div>
            </div>

          {/* ------ end of form ------ */}
          <div className="btn-block">
             <button 
                    type="submit" 
                    href="/" 
                    onClick={handleSubmit}>
                GENERATE PLAN
             </button>
          </div>
        </form>


      </div>
      <div className="center-schedule">
        <h2>Schedule</h2>
        <h4> PLAN FOR: {bookTitle} | TO FINISH BY: {dueDate} </h4>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Pages to Read</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Day 1</td>
                    <td>{dailyPages[0]}{dailyPages[1]}</td>
                </tr>
                </tbody>

                {/* <tbody>
                    {plan.map(item => {
                        return (
                            <tr key={ item.day }>
                                <td>{ item.day }</td>
                                <td>{ item.pages }</td>
                            </tr>
                        );
                    })}
                </tbody> */}
            </table>
            {/* <li>{dailyPages}</li> */}
            {/* <p>{plan}</p> */}
            {/* <p>{plan.map(reptile => (
            <li key={plan}>{setPlan}</li>
        ))}</p> */}
            {/* {Object.entries(dailyPages).map(([key, value]) => (
            <li key={key}>day {key} : {value} pages</li>
        ))} */}
      </div>
    </>
  );
}

class App extends Component {
	render() {
		var heading = ['Day', 'Pages to Read'];
		var body = 

			[['Kapil', 'Jaipur'],
			['Aakash', 'Hisar'],
			['Mani', 'Ranchi'],
			['Yash', 'Udaipur']

			];
      
		return (
			<div >
				<Table heading={heading} body={body} />,
			</div>
		);

	}
}

class Table extends Component {
	render() {
		var heading = this.props.heading;
		var body = this.props.body;
		return (
			<table style={{ width: 500 }}>
				<thead>
					<tr key='row'>
						{heading.map(head => <th>{head}</th>)}
					</tr>
				</thead>
				<tbody>
					{body.map(row => <TableRow row={row} />)}
				</tbody>
			</table>
		);
	}
}

class TableRow extends Component {
	render() {
		var row = this.props.row;
		return (
			<tr>
				{row.map(val => <td>{val}</td>)}
			</tr>
		)
	}
}

// export default Form;
