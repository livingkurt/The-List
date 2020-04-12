// React
import React from "react";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// Styles
import './calender_columns.css'


const CalenderColumns = (props) => {


  return (
    <div className="calender_columns" >
      {/* <div className="scroll_container" onMouseDown={handleMouseDown}></div> */}
      {props.children}
    </div>
  );
}

export default CalenderColumns;