// React
import React from "react";
// Styles
import './calender_container.css'


const CalenderContainer = (props) => {


  return (
    <div className="calender_container" style={props.style}>
      {props.children}
    </div>
  );
}

export default CalenderContainer;