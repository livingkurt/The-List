// React
import React, { useState, useEffect } from "react";
// Styles
import './list_item_modal.css'
// import Checkbox from '../Checkbox/Checkbox';
import DeleteButton from '../DeleteButton/DeleteButton';
import API from "../../utils/API";


const ListItemModal = (props) => {

  // const [todo_state, set_todo_state] = useState("")

  const [note_state, set_note_state] = useState({
    title: "",
    body: "",
    folder_id: "",
    list_id: "dump",
    priority: 5,
    scheduled: false,
    scheduled_date_time: "",
    completed: false,
  })

  useEffect(() => {
    get_note()
  }, [])

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
  const get_note = async () => {
    const todo_id = props.id
    try {
      const res = await API.get_note(todo_id)
      set_note_state(res.data)
    }
    catch (err) {
      console.log(err);
    }
  }




  return (
    <div style={{ display: props.show_modal_state }} className="list_modal zoom">
      <div className="title_close_div">
        <input
          defaultValue={note_state.title}
          className="list_input"
          placeholder="Title"
          id={props.id}
          onBlur={e => update_note(e)} />
        <button onClick={props.show_modal} className="show_modal_button"></button>
      </div>
      <textarea
        defaultValue={note_state.body}
        className="modal_text_field"
        onChange={e => set_note_state({ ...note_state, body: e.target.value })}
        placeholder="Description"
        onBlur={(e) => e.target.placeholder = "Description"}
        onFocus={(e) => e.target.placeholder = ""}
      />
      {/* <input
        defaultValue={note_state.body}
        onChange={e => set_note_state({ ...note_state, body: e.target.value })}
        className="list_input"
        placeholder="Description"
        id={props.id}
        onBlur={e => update_note(e)} /> */}
      <DeleteButton index={props.id} get_all_notes_by_list_id={props.get_all_notes_by_list_id} id={props.id}>
        Delete
      </DeleteButton>
    </div>
  );
}

export default ListItemModal;
