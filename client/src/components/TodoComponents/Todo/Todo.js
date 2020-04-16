// React
import React, { useState, useEffect } from "react";
// Components
import { Checkbox, ButtonSymbol, EditorInput } from '../../UtilityComponents';
import TodoModal from '../TodoModal/TodoModal';
// Styles
import './todo.css'
// Utils
import { API } from "../../../utils";


const Todo = (props) => {

  const [todo_state, set_todo_state] = useState({})

  const [note_state, set_note_state] = useState(props.note)
  useEffect(() => {
    get_checkbox_state();
  }, [])

  // useEffect(() => {
  //   console.log("Reload")
  // }, [note_state])


  const update_note = async (e) => {
    e.persist();
    const todo_id = e.target.id
    const todo_data = e.target.value
    try {
      const res = await API.get_note(todo_id)
      set_todo_state(res.data)
      const update_todo = { ...res.data, title: todo_data }
      API.update_note(todo_id, update_todo)
      props.get_all_notes_by_list_id("Master")
      props.get_all_notes_by_list_id("Dump")
      API.update_note(todo_id, update_todo)
      props.get_all_notes_by_list_id("Master")
      props.get_all_notes_by_list_id("Dump")
    }
    catch (err) {
      console.log(err);
    }
  }

  const [modal_state, set_modal_state] = useState("none")

  const show_modal = async (e) => {
    const todo_id = props.id
    console.log(todo_id)
    if (modal_state === "none") {
      set_modal_state("block")
    }
    else {
      set_modal_state("none")
    }
  }

  const [checkboxState, setCheckboxState] = useState(false)

  const save_check_status = () => {
    if (checkboxState === false) {
      setCheckboxState(true)
      // console.log({ "false": checkboxState })
      update_note_checkbox(props.id, true)
      document.getElementById(props.id).setAttribute("style", "color: gray; text-decoration: line-through;")
    }
    if (checkboxState === true) {
      setCheckboxState(false)
      // console.log({ "true": checkboxState })
      update_note_checkbox(props.id, false)
      document.getElementById(props.id).setAttribute("style", "color: black; text-decoration: none;")
    }
  }

  const update_note_checkbox = async (id, completed) => {
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
    if (todo_id != undefined) {
      try {
        const res = await API.get_note(todo_id)
        setCheckboxState(res.data.completed)
        if (res.data.completed === false) {
          // setCheckboxState(false)
          document.getElementById(props.id).setAttribute("style", "color: black; text-decoration: none;")
        }
        if (res.data.completed === true) {
          // setCheckboxState(true)

          document.getElementById(props.id).setAttribute("style", "color: gray; text-decoration: line-through;")
        }

      }
      catch (err) {
        console.log({ "get_checkbox_state": err });
      }
    }

  }



  const on_change_note_editor = async (e) => {

    const note_id = note_state._id
    const note_data = e.target.value
    const field_name = e.target.name
    console.log({ "note_id": note_id, "note_data": note_data, "field_name": field_name })
    try {
      const update_note = {
        ...note_state,
        [field_name]: note_data
      }
      console.log({ "update_note": update_note })
      const res = await API.update_note(note_id, update_note)
      set_note_state(res.data)
    }
    catch (err) {
      console.log({ "on_change_note_editor": err });
    }

  }

  return (
    <div className="todo zoom">
      <Checkbox checkboxState={checkboxState} update_note_checkbox={update_note_checkbox} onCheck={save_check_status} todo_state={todo_state} id={props.id} />
      <EditorInput
        value={props.children}
        // className="todo_input"
        placeholder="Title"
        styles={{ boxShadow: "unset", width: "100%" }}
        id={props.id}
        name="title"
        on_change_function={on_change_note_editor} />

      <ButtonSymbol styles={{ margin: "0px", padding: "0px" }} on_click_function={show_modal} ><i className="fas fa-bars"></i></ButtonSymbol>
      <TodoModal key={props.id} index={props.id} id={props.id} note_state={note_state} show_modal={show_modal} show_modal_state={modal_state} get_all_notes_by_list_id={props.get_all_notes_by_list_id}></TodoModal>
    </div>
  );
}

export default Todo;
