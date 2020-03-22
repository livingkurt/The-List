// React
import React from "react";
// Styles
import './text_field.css'


const TextField = ({ children }) => {
  return (
    <div className="text_container">
      <div contenteditable="true" className="text_field">
        {children}
      </div>

    </div>
  );
}

export default TextField;
