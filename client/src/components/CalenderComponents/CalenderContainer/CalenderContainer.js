// React
import React from "react";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// Styles
import './calender_container.css'


const CalenderContainer = (props) => {


  return (
    <div className="calender_container" style={props.style}>
      {/* <div className="scroll_container" onMouseDown={handleMouseDown}></div> */}
      {props.children}
    </div>
  );
}

export default CalenderContainer;