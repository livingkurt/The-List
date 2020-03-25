// React
import React, { useState } from "react";
// Styles
import './list_item.css'
import Checkbox from '../Checkbox/Checkbox';
import API from "../../utils/API";


const ListItem = (props) => {

  const [todo_state, set_todo_state] = useState({})
  console.log({ "todo_state global": todo_state })

  const update_note = (e) => {
    e.persist();
    const todo_id = e.target.id
    // console.log(todo_id)
    get_note(todo_id, e.target.value);
    // await console.log({ "update_note": todo_state })
    // await set_todo_state({ ...todo_state, title: e.target.value })
    // await console.log({ "update_note": todo_state })

    // // console.log({ "ListItem": todo_state })
    // API.update_note(todo_id, todo_state)
    //   .then(res => {
    //     console.log(res.data)
    //     // props.get_todos()
    //     // get_dump_notes();
    //     // document.querySelector(".title_field").value = ""
    //     // document.querySelector(".text_field").value = ""
    //   })
    //   .catch(err => console.log(err));
  }
  const get_note = async (todo_id, data) => {
    try {
      // console.log({ "get_note Id": todo_id })
      const res = await API.get_note(todo_id)
      console.log({ "get_note data": res.data })
      const update_todo = { ...res.data, title: data }
      const response = await API.update_note(todo_id, update_todo)
      // set_todo_state(res.data)
      console.log({ "todo_state not global": todo_state })
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
        // onClick={e => update_note(e)} />
        onBlur={e => update_note(e)} />


      {/* </div> */}
    </div>
  );
}

export default ListItem;
