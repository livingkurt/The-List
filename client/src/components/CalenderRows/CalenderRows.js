// React
import React from "react";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// Styles
import './calender_rows.css'


const CalenderRows = (props) => {


  return (
    <div className="calender_rows" >
      {/* <div className="scroll_container" onMouseDown={handleMouseDown}></div> */}
      {props.children}
    </div>
  );
}

export default CalenderRows;