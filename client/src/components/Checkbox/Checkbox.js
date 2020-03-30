// React
import React, { useState } from "react";
// Styles
// import './checkbox.css'
import API from "../../utils/API";


function Checkbox(props) {
  const [checkboxState, setCheckboxState] = useState(false)

  const save_check_status = () => {
    console.log("Hello")
    console.log(props.id)
    if (checkboxState === false) {
      setCheckboxState(true)
      console.log({ "false": checkboxState })
      update_note(props.id, true)
    }
    if (checkboxState === true) {
      setCheckboxState(false)
      console.log({ "true": checkboxState })
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
      console.log(err);
    }
  }

  return (
    <div onClick={() => save_check_status()}>
      <label>
        <input type='checkbox' />
        <span></span>
      </label>
    </div>
  );
}

export default Checkbox;
