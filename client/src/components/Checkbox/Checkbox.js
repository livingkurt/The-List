// React
import React, { useState, useEffect } from "react";
// Styles
import './checkbox.css'
import API from "../../utils/API";


function Checkbox(props) {
  const [checkboxState, setCheckboxState] = useState(false)

  useEffect(() => {
    get_checkbox_state();
  }, [])

  const save_check_status = () => {
    console.log("Hello")
    console.log(props.id)
    if (checkboxState === false) {
      setCheckboxState(true)
      // console.log({ "false": checkboxState })
      update_note(props.id, true)
    }
    if (checkboxState === true) {
      setCheckboxState(false)
      // console.log({ "true": checkboxState })
      update_note(props.id, false)
    }
  }

  const update_note = async (id, completed) => {
    const todo_id = id
    try {
      const res = await API.get_note(todo_id)
      const update_todo = { ...res.data, completed: completed }
      API.update_note(todo_id, update_todo)
    }
    catch (err) {
      console.log({ "update_note": err });
    }
  }

  const get_checkbox_state = async () => {
    const todo_id = props.id
    console.log(todo_id)
    if (todo_id != undefined) {
      try {
        const res = await API.get_note(todo_id)
        console.log(res.data.completed)
        setCheckboxState(res.data.completed)
        // console.log(res.data.completed)
        // const update_todo = { ...res.data, completed: completed }
      }
      catch (err) {
        console.log({ "get_checkbox_state": err });
      }
    }

  }
  // if (props.list_item_state === "true") {
  //   document.getElementById("checkbox_state-toggle").checked = false;
  // }
  // else {
  //   document.getElementById("checkbox_state-toggle").checked = true;
  // }

  return (
    <div >
      <label >
        <input id="checked_or_not" type='checkbox' checked={checkboxState} />
        <span onClick={() => save_check_status()}></span>
      </label>
    </div>
  );
}

export default Checkbox;
