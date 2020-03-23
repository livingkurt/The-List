// React
import React from "react";
// Styles
import './title_field.css'


const TitleField = ({ children }) => {
  return (
    <div
      className="title_container"
      placeholder="Title"
      onBlur={(e) => e.target.placeholder = "Title"}
      onFocus={(e) => e.target.placeholder = ""}
    >
      <input className="title_field" />

    </div>
  );
}

export default TitleField;
