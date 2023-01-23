import React from "react";
import "./Landing.css";

function Landing() {
  const handleClick = () => {
    var inputValue = form.item.value;
    alert("You typed: " + inputValue);
  };

  return (
    <>
      <div className="header">
        <h1>Pace Reading Planner</h1>
        <p>For Planners & Procrastinators Alike</p>
      </div>

      <div className="center-nodal">
        <form action="/" className="form">
            <div class="form-item">
            <p>Book Info</p>
            <input type="text" name="title" placeholder="Book Title" />
            </div>
            <div class="form-item">
              <input type="number" placeholder="Total Pages" />
            </div>
            <div class="column-form-item">
                <div class="form-item">
                    <p>Start Date</p>
                    <input type="date" name="startDate" />
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="form-item">
                    <p>Due Date</p>
                    <input type="date" name="dueDate" />
                    <i class="fas fa-calendar-alt"></i>
                </div>
            </div>

          {/* ------ end of form ------ */}
          <div class="btn-block">
            <button type="submit" href="/" onClick={handleClick}>
              Generate Plan
            </button>
          </div>

        </form>
      </div>
    </>
  );
}

export default Landing;
