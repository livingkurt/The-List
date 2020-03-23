// React
import React, { useState } from "react";
// Styles
import './text_field.css'


const TextField = ({ children }) => {
  const [textState, setTextState] = useState("")

  const handle_text_input = () => {
    if (Number.isInteger(textState[0]))
      return (<ol contenteditable="true" >
        <li contenteditable="true" ></li>
      </ol>)
  }

  return (
    <div className="text_container">
      <div contenteditable="true" className="text_field">
        {textState}
        {handle_text_input}
      </div>

    </div>
  );
}

export default TextField;
