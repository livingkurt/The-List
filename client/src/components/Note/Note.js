// React
import React, { useState, useEffect } from "react";
// Styles
import './note.css'
import API from "../../utils/API";


const Note = (props) => {

  const update_note = async (e) => {
    e.persist();
    const todo_id = e.target.id
    const todo_data = e.target.value
    try {
      const res = await API.get_note(todo_id)
      const update_todo = { ...res.data, title: todo_data }
      API.update_note(todo_id, update_todo)
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="note zoom">
      {/* <Checkbox /> */}
      <input
        defaultValue={props.children}
        className="note_input"
        placeholder="Title"
        id={props.id}
        onBlur={e => update_note(e)} />
      {/* <DeleteButton index={props.id} get_all_notes={props.get_all_notes} id={props.id} /> */}
    </div>
  );
}

export default Note;
