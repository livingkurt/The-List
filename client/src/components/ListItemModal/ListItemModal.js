// React
import React, { useState, useEffect } from "react";
// Styles
import './list_item_modal.css'
// import Checkbox from '../Checkbox/Checkbox';
import DeleteButton from '../DeleteButton/DeleteButton';
import API from "../../utils/API";


const ListItem = (props) => {

  // const [todo_state, set_todo_state] = useState("")

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
    <div style={{ display: props.show_modal }} className="list_modal zoom">
      <input
        defaultValue={props.children}
        className="list_input"
        placeholder="Title"
        id={props.id}
        onBlur={e => update_note(e)} />
      <DeleteButton index={props.id} get_all_notes_by_list_id={props.get_all_notes_by_list_id} id={props.id} />
    </div>
  );
}

export default ListItem;
