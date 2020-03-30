// React
import React, { useState, useEffect } from "react";
// Styles
import './list_item.css'
import Checkbox from '../Checkbox/Checkbox';
import ListItemButton from '../ListItemButton/ListItemButton';
import ListItemModal from '../ListItemModal/ListItemModal';
import API from "../../utils/API";


const ListItem = (props) => {
  const [modal_state, set_modal_state] = useState("none")

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

  const show_modal = async (e) => {
    const todo_id = props.id
    console.log(todo_id)
    if (modal_state === "none") {
      set_modal_state("flex")
    }
    else {
      set_modal_state("none")
    }


    //   try {
    //     const res = await API.get_note(todo_id)
    //   }
    //   catch (err) {
    //     console.log(err);
    //   }
  }

  return (
    <div className="list_div zoom">
      <Checkbox id={props.id} />
      <input
        defaultValue={props.children}
        className="list_input"
        placeholder="Title"
        id={props.id}
        onBlur={e => update_note(e)} />
      {/* <ListItemButton index={props.id} get_all_notes_by_list_id={props.get_all_notes_by_list_id} id={props.id} /> */}
      <button onClick={() => show_modal()} className="show_modal_button"></button>
      <ListItemModal id={props.id} show_modal={modal_state} get_all_notes_by_list_id={props.get_all_notes_by_list_id} />
    </div>
  );
}

export default ListItem;
