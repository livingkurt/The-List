// React
import React from "react";
// Styles
import './calender_columns.css'


const CalenderColumns = (props) => {

  return (
    <div className="calender_columns" >
      {props.children}
    </div>
  );
}

export default CalenderColumns;