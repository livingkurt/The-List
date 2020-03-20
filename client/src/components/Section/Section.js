// React
import React from "react";
// Styles
import './section.css'


function Section({ children }) {
  return (
    <div className="section">
      {children}
    </div>
  );
}

export default Section;
