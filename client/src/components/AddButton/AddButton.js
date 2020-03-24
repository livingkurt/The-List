// React
import React from "react";
// Styles
import './add_button.css'


const AddButton = (props) => {

  return (
    <div>
      <button onClick={() => props.data} className="add_button">+</button>
    </div>
  );
}

export default AddButton;
