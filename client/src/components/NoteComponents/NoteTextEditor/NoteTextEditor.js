// React
import React, { useState, useEffect } from "react";
// Styles
import './note_text_editor.css'


function NoteTextEditor(props) {
  // console.log(props.note_state)

  return (
    <div id="create_note_title_description">
      <input
        className="title_field"
        defaultValue={props.note_state.title}
        // onChange={e => props.on_change_note_editor(e)}
        placeholder="Title"
        name="title"
        onBlur={(e) => {
          e.target.placeholder = "Title"
          props.on_change_note_editor(e)
        }}
        onFocus={(e) => e.target.placeholder = ""}></input>
      <textarea
        className="text_field"
        // onChange={e => props.on_change_note_editor(e)}
        placeholder="Description"
        defaultValue={props.note_state.body}
        name="body"
        style={{ height: props.height }}
        onBlur={(e) => {
          e.target.placeholder = "Description"
          props.on_change_note_editor(e)
        }
        }
        onFocus={(e) => e.target.placeholder = ""}
      />
    </div>
  );
}

export default NoteTextEditor;