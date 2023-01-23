import React from "react";
import {useState} from 'react';
import "./Form.css";

function Landing() {
    const [bookTitle, setBookTitle] = useState('');

    const [totalPages, setTotalPages] = useState('');

    const handleSubmit = event => {
        console.log('handleSubmit ran');
        event.preventDefault(); // 👈️ prevent page refresh
      
        // 👇️ access input values here
        console.log('Book Title 👉️', bookTitle);
        console.log('Total Pages 👉️', totalPages);
      
        // setMessage(`${bookTitle} has ${totalPages} pages`);
      
        // 👇️ clear all input values in the form
        setBookTitle('');
        setTotalPages('');

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
                    <input type="date" name="start-date" />
                    <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="form-item">
                    <p>Due Date</p>
                    <input type="date" name="due-date" />
                    <i className="fas fa-calendar-alt"></i>
                </div>
            </div>

          {/* ------ end of form ------ */}
          <div className="btn-block">
            <button type="submit" href="/" onClick={handleSubmit}>
              Create My Plan
            </button>
          </div>

        </form>
      </div>
    </>
  );
}

export default Landing;
