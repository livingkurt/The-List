// React
import React, { useState, useEffect } from "react";
// Styles
import './list_item.css'
import Checkbox from '../Checkbox/Checkbox';
import ListItemButton from '../ListItemButton/ListItemButton';
import NoteEditor from '../NoteEditor/NoteEditor';
import ListItemModal from '../ListItemModal/ListItemModal';
import ButtonSymbol from '../ButtonSymbol/ButtonSymbol';
import ListItemEditNote from '../ListItemEditNote/ListItemEditNote';
import API from "../../utils/API";


const ListItem = (props) => {

  const [list_item_state, set_list_item_state] = useState({})

  useEffect(() => {
    get_checkbox_state();
  }, [])

  const update_note = async (e) => {
    e.persist();
    const todo_id = e.target.id
    const todo_data = e.target.value
    try {
      const res = await API.get_note(todo_id)
      set_list_item_state(res.data)
      const update_todo = { ...res.data, title: todo_data }
      API.update_note(todo_id, update_todo)
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
    console.log("Hello")
    console.log(props.id)
    if (checkboxState === false) {
      setCheckboxState(true)
      // console.log({ "false": checkboxState })
      update_note_checkbox(props.id, true)
    }
    if (checkboxState === true) {
      setCheckboxState(false)
      // console.log({ "true": checkboxState })
      update_note_checkbox(props.id, false)
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
      }
      catch (err) {
        console.log({ "get_checkbox_state": err });
      }
    }

  }

  return (
    <div className="list_item zoom">
      <Checkbox checkboxState={checkboxState} update_note_checkbox={update_note_checkbox} onCheck={save_check_status} list_item_state={list_item_state} id={props.id} />
      <input
        defaultValue={props.children}
        className="list_input"
        placeholder="Title"
        id={props.id}
        onBlur={e => update_note(e)} />
      {/* <ListItemButtonSymbol index={props.id} get_all_notes_by_list_id={props.get_all_notes_by_list_id} id={props.id} /> */}
      {/* <ButtonSymbol onClick={() => show_modal()} className="show_modal_ButtonSymbol zoom"><i className="fas fa-sort-up"></i></ButtonSymbol> */}
      <ButtonSymbol margin="0px" padding="0px 2px 7px 0px" on_click_function={show_modal} ><i className="fas fa-sort-up"></i></ButtonSymbol>
      <ListItemModal id={props.id} show_modal={show_modal} show_modal_state={modal_state} get_all_notes_by_list_id={props.get_all_notes_by_list_id}></ListItemModal>
      {/* <ListItemEditNote title="Edit Note" id={props.id} show_hide={show_modal} show_modal_state={modal_state} get_all_notes_by_list_id={props.get_all_notes_by_list_id}></ListItemEditNote> */}

    </div>
  );
}

export default ListItem;
