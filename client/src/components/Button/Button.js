// React
import React from "react";
// Styles
import './button.css'


const Button = (props) => {

  return (
    <div>
      <button onClick={() => props.onclick_function(props.listId)} className="button">{props.children}</button>
    </div>
  );
}

export default Button;
