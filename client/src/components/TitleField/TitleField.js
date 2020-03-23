// React
import React from "react";
// Styles
import './title_field.css'


const TitleField = ({ children }) => {
  return (
    <div>
      <input
        className="title_field"
        placeholder="Title"
        onBlur={(e) => e.target.placeholder = "Title"}
        onFocus={(e) => e.target.placeholder = ""}></input>
    </div>
  );
}

export default TitleField;
