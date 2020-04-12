// React
import React from "react";
// Styles
import './editor_input.css'


const EditorInput = (props) => {

  return (
    <div >
      <input
        defaultValue={props.value}
        onBlur={e => props.on_change_function(e)}
        className="editor_inputs"
        style={props.styles}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name} />
    </div>
  );
}

export default EditorInput;

