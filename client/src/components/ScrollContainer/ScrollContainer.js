// React
import React from "react";
// Styles
import './scroll_container.css'


const ScrollContainer = ({ children }) => {

  return (
    <div className="scroll_container">
      {children}
    </div>
  );
}

export default ScrollContainer;
