// React
import React from "react";
// Styles
import './title.css'


const Title = ({ children }) => {



  return (
    <div className="title">
      <h2>{children}</h2>
    </div>
  );
}

export default Title;
