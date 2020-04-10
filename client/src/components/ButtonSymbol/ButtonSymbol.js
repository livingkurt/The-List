// React
import React from "react";
// Styles
import './button_symbol.css'


const ButtonSymbol = (props) => {
  // console.log({ "props.list_id": props.list_id })

  return (
    <div >
      <button style={{ margin: props.margin, padding: props.padding }} id={props.id} onClick={() => props.on_click_function(props.id, props.priority)} className="button_symbol">{props.children}</button>
    </div>
  );
}

export default ButtonSymbol;
