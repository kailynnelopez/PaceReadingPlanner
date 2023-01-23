import React from 'react';
import './Landing.css';

function Landing() {
    const handleClick = () => {
        var inputValue = form.item.value;
     alert ("You typed: " + inputValue);

    };

  return ( 
    <>
        <div className='header'>
            <h1>Pace Reading Planner</h1>
            <p>For Planners & Procrastinators Alike</p>
        </div>

        <div className='center-nodal'>
            <form action="/" className='form'>
                <div class="item">
                    <p>Book Info</p>
                    <div class="item">
                        <input type="text" name="title" placeholder="Book Title"/>
                    </div>
                    <div class="item">
                        <input type="number" placeholder="Total Pages"/>
                    </div>
                    <div class="item">
                        <p>Start Date</p>
                        <input type="date" name="startDate"/>
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="item">
                        <p>Due Date</p>
                        <input type="date" name="dueDate"/>
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                </div>
                {/* <div class="item">
            <p>Phone</p>
            <input type="text" name="name"/>
            </div>
            <div class="question">
            <p>Vehicle</p>
            <div class="question-answer">
                <div>
                <input type="radio" value="none" id="radio_1" name="vehicle" />
                <label for="radio_1" class="radio"><span>Limousine (8-12 person)</span></label>
                </div>
                <div>
                <input type="radio" value="none" id="radio_2" name="vehicle" />
                <label for="radio_2" class="radio"><span>SUV (6-7 person)</span></label>
                </div>
                <div>
                <input type="radio" value="none" id="radio_3" name="vehicle" />
                <label for="radio_3" class="radio"><span>Van (12-15 person)</span></label>
                </div>
                <div>
                <input type="radio" value="none" id="radio_4" name="vehicle" />
                <label for="radio_4" class="radio"><span>Bus (50+ person)</span></label>
                </div>
                <div>
                <input type="radio" value="none" id="radio_5" name="vehicle" />
                <label for="radio_5" class="radio other"><span>other:</span></label>
                <input class="other" type="text" name="name" />
                </div>
            </div>
            </div>
            <div class="item">
            <p>Pick Up Date</p>
            <input type="date" name="bdate" />
            <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="item">
            <p>Pick Up Time</p>
            <input type="time" name="name" />
            <i class="fas fa-clock"></i>
            </div>
            <div class="item">
            <p>If pick up from the airport, please enter airport name</p>
            <input type="text" name="name"/>
            </div>
            <div class="item">
            <p>Flight Number</p>
            <input type="text" name="name"/>
            </div> */}
            <div class="btn-block">
                <button type="submit" href="/" onClick={handleClick}>Generate Plan</button>
            </div> 
      </form>

        </div>
    </>

  )
}

export default Landing;
