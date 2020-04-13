// React
import React from "react";
// Styles
import './calender_rows.css'


const CalenderRows = (props) => {


  return (
    <div className="calender_rows" >
      {props.children}
    </div>
  );
}

export default CalenderRows;