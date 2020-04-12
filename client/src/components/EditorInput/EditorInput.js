// React
import React from "react";
// Styles
import './editor_input.css'


const EditorInput = (props) => {

  return (
    <div style={{ width: "100%" }}>
      <input
        defaultValue={props.value}
        onBlur={e => props.on_change_function(e)}
        className="editor_input"
        style={props.styles}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name} />
    </div>
  );
}

export default EditorInput;

