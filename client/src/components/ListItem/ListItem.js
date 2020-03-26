// React
import React, { useState } from "react";
// Styles
import './list_item.css'
import Checkbox from '../Checkbox/Checkbox';
import API from "../../utils/API";


const ListItem = (props) => {

  const [todo_state, set_todo_state] = useState({})
  // console.log({ "todo_state global": todo_state })


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
    <div className="list_div zoom">
      <Checkbox />
      <input
        defaultValue={props.children}
        className="list_item list_input"
        placeholder="Title"
        id={props.id}
        onBlur={e => update_note(e)} />


      {/* </div> */}
    </div>
  );
}

export default ListItem;
