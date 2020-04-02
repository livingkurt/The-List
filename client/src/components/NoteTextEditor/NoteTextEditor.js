// React
import React, { useState, useEffect } from "react";
// Styles
import './note_text_editor.css'


function NoteTextEditor(props) {
  console.log(props.note_state)

  return (
    <div id="create_note_title_description">
      <input
        className="title_field"
        defaultValue={props.note_state.title}
        onChange={e => props.on_change_note_editor(e)}
        placeholder="Title"
        name="title"
        onBlur={(e) => {
          e.target.placeholder = "Title"
          props.update_note(e)
        }}
        onFocus={(e) => e.target.placeholder = ""}></input>
      <textarea
        className="text_field"
        onChange={e => props.on_change_note_editor(e)}
        placeholder="Description"
        defaultValue={props.note_state.body}
        name="body"
        style={{ height: props.height }}
        onBlur={(e) => {
          e.target.placeholder = "Description"
          props.update_note(e)
        }
        }
        onFocus={(e) => e.target.placeholder = ""}
      />
    </div>
  );
}

export default NoteTextEditor;

{/* <div className="title_close_div">
        <input
          defaultValue={note_state.title}
          className="title_input modal_inputs"
          name="title"
          placeholder="Title"
          id={props.id}
          onBlur={e => update_note(e)} />
        <button onClick={props.show_modal} className="show_modal_button"><i className="fas fa-times"></i></button>
      </div>
      <textarea
        defaultValue={note_state.body}
        className="modal_text_field"
        onChange={e => set_note_state({ ...note_state, body: e.target.value })}
        placeholder="Description"
        name="body"
        id={props.id}
        onBlur={(e) => {
          e.target.placeholder = "Description"
          update_note(e)
        }
        }
        onFocus={(e) => e.target.placeholder = ""}
      /> */}