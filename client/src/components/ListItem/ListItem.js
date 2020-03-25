// React
import React, { useState } from "react";
// Styles
import './list_item.css'
import Checkbox from '../Checkbox/Checkbox';
import API from "../../utils/API";


const ListItem = (props) => {
  const [itemState, setItemState] = useState("false")

  const [todo_state, set_todo_state] = useState({
    title: "",
    body: "",
    folder_id: "",
    list_id: "",
    priority: 5,
    scheduled: false,
    scheduled_date_time: "",
  })

  const update_note = (e) => {
    const todo_id = e.target.id
    console.log(todo_id)
    set_todo_state({ ...todo_state, title: e.target.value })
    console.log(todo_state)
    API.update_note(todo_id, todo_state)
      .then(res => {
        console.log(res.data)
        // props.get_todos()
        // get_dump_notes();
        // document.querySelector(".title_field").value = ""
        // document.querySelector(".text_field").value = ""
      })
      .catch(err => console.log(err));
  }


  return (
    <div className="list_div zoom">
      <Checkbox />
      <input
        defaultValue={props.children}
        className="list_item list_input"
        placeholder="Title"
        id={props.id}
        // onClick={e => update_note(e)} />
        onBlur={e => update_note(e)} />


      {/* </div> */}
    </div>
  );
}

export default ListItem;
