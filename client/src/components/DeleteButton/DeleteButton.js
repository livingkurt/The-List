// React
import React, { useState } from "react";
import API from "../../utils/API";
// Styles
import './delete_button.css'


function DeleteButton(props) {

  const [todo_state, set_todo_state] = useState("")

  const delete_note = async (e) => {
    const todo_id = e.target.id
    try {
      const res = await API.delete_note(todo_id)
      props.get_all_notes("dump", props.index)
      props.get_all_notes("master", props.index)
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <button index={props.index} id={props.id} onClick={e => delete_note(e)} className="delete_button"></button>
    </div>
  );
}

export default DeleteButton;

// );