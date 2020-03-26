// React
import React from "react";
// Styles
import './section.css'


const Section = ({ children }) => {
  return (
    <div className="section container-drag">
      {children}
    </div>
  );
}

export default Section;
