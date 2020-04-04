// React
import React from "react";
// Styles
import './button_symbol.css'


const ButtonSymbol = (props) => {

  return (
    <div >
      <button style={{ margin: props.margin, padding: props.padding }} onClick={() => props.on_click_function(props.list_id, props.priority)} className="button">{props.children}</button>
    </div>
  );
}

export default ButtonSymbol;
