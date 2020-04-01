// React
import React, { useState, useEffect } from "react";
// Styles
import './note_text_editor.css'


function NoteAttributeEditor(props) {


  return (
    <div id="create_note_title_description">
      <input
        className="title_field"
        onChange={e => props.on_change_note_editor(e)}
        placeholder="Title"
        name="title"
        onBlur={(e) => e.target.placeholder = "Title"}
        onFocus={(e) => e.target.placeholder = ""}></input>
      <textarea
        className="text_field"
        onChange={e => props.on_change_note_editor(e)}
        placeholder="Description"
        name="body"
        onBlur={(e) => e.target.placeholder = "Description"}
        onFocus={(e) => e.target.placeholder = ""}
      />
    </div>
  );
}

export default NoteAttributeEditor;
