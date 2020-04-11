// React
import React from "react";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// Styles
import './scroll_container.css'


const ScrollContainer = (props) => {


  return (
    <div className="scroll_container" style={props.styles}>
      {props.children}
    </div>
  );
}

export default ScrollContainer;