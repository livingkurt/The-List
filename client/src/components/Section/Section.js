// React
import React from "react";
// Styles
import './section.css'


function Section({ children }) {
  return (
    <div className="section fade_in">
      {children}
    </div>
  );
}

export default Section;
