// React
import React from "react";
// Styles
import './section.css'


const Section = (props) => {


  return (
    <div style={{ display: props.show_hide }} className="section">
      {props.children}
    </div>
  );
}

export default Section;
