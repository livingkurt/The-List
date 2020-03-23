// React
import React, { useState } from "react";
// Styles
import './text_field.css'


const TextField = ({ children }) => {
  const [textState, setTextState] = useState("")

  const handle_text_input = () => {
    if (Number.isInteger(textState[0]))
      return (<ol contentEditable="true" >
        <li contentEditable="true" ></li>
      </ol>)
  }

  return (
    <div className="">
      <textarea className="text_field"></textarea>
    </div>
  );
}

export default TextField;
