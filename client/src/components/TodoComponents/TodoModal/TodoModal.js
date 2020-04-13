// React
import React, { useState, useEffect } from "react";
// Components
import { ButtonWord, ButtonSymbol } from '../../UtilityComponents';
import { NoteAttributeEditor, NoteTextEditor } from '../../NoteComponents/';
// Utils
import { API } from "../../../utils";
import { format_date_element, format_date_display } from "../../../utils/HelperFunctions";
// Styles
import './todo_modal.css'

const TodoModal = (props) => {

  // const [todo_state, set_todo_state] = useState("")

  const [note_state, set_note_state] = useState({
    title: "",
    body: "",
    folder_id: "",
    list_id: "",
    priority: "",
    category_id: "",
    scheduled: false,
    scheduled_date: "",
    scheduled_time: "",
    completed: false,
    date_created: "",
    date_modified: "",
  })

  // const [dropdown_state, set_dropdown_state] = useState("none")
  // const [date_state, set_date_state] = useState({
  //   date_created: "",
  //   date_modified: "",
  // })
  useEffect(() => {
    get_note()
    // get_formatted_date();
    // get_formatted_time();
    get_checkbox_state();
    // get_all_folders();
  }, [])

  const get_note = async () => {
    const todo_id = props.id
    if (todo_id != undefined) {
      try {
        const res = await API.get_note(todo_id)
        set_note_state(res.data)

      }
      catch (err) {
        // console.log(err);
      }
    }
  }


  // const format_date_display = unformatted_date => {
  //   const date = new Date(unformatted_date)
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   const formatted_date = `${month}/${day}/${year}`
  //   return formatted_date;
  // }

  // const format_date_element = unformatted_date => {
  //   const date = new Date(unformatted_date)
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   const formatted_date = `${month}-${day}-${year}`
  //   return formatted_date;
  // }

  const [schedule_state, set_schedule_state] = useState(false)

  const show_scheduling = () => {
    if (schedule_state === false) {
      set_schedule_state(true)
      set_note_state({ ...note_state, scheduled: false })

      update_scheduled_checkbox(props.id, true)

    }
    else {
      set_schedule_state(false)

      set_note_state({ ...note_state, scheduled: true })
      update_scheduled_checkbox(props.id, true)
    }
    console.log(note_state)

  }


  const update_scheduled_checkbox = async (id, scheduled) => {
    const todo_id = id
    try {
      const res = await API.get_note(todo_id)
      const update_todo = { ...res.data, scheduled: scheduled }
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
        set_schedule_state(res.data.scheduled)
      }
      catch (err) {
        console.log({ "get_checkbox_state": err });
      }
    }

  }

  const on_change_note_editor = async (e) => {
    const note_id = props.id
    let note_data = ""
    let field_name = ""

    if (e.target === undefined) {
      set_note_state({ ...note_state, scheduled: e })
      note_data = e
      field_name = "scheduled"
    }
    else {
      note_data = e.target.value
      field_name = e.target.name
      if (field_name == "folder_id") {
        on_change_folder_editor(note_id, note_data)
      }
      console.log({ "field_name": field_name });
      set_note_state({ ...note_state, [field_name]: note_data })
    }
    // console.log(field_name)
    try {
      const res = await API.get_note(note_id)
      const update_todo = {
        ...res.data,
        [field_name]: note_data,
      }
      API.update_note(note_id, update_todo)
      props.get_all_notes_by_list_id("Dump")
      props.get_all_notes_by_list_id("Master")
    }
    catch (err) {
      console.log({ "save_scheduling": err });
    }

  }

  const on_change_folder_editor = async (note_id, folder_id) => {
    try {
      const res = await API.get_folder(folder_id)

      console.log({ "on_change_folder_editor": res.data })
      console.log({ "note_id": note_id })
      console.log({ "folder_id": folder_id })
      const update_folder = {
        ...res.data,
        notes: [...res.data.notes, note_id]
      }
      console.log({ "update_folder": update_folder })
      const response = await API.update_folder(folder_id, update_folder)

    }
    catch (err) {
      console.log({ "on_change_folder_editor": err });
    }

  }

  const delete_note = async (e) => {
    const todo_id = props.id
    try {
      const res = await API.delete_note(todo_id)
      props.get_all_notes_by_list_id("Dump")
      props.get_all_notes_by_list_id("Master")
    }
    catch (err) {
      console.log(err);
    }
  }
  const [dropdown_state, set_dropdown_state] = useState("none")

  const show_dropdown = () => {

    if (dropdown_state === "none") {
      set_dropdown_state("flex")
      console.log("show_dropdown")
    }
    else if (dropdown_state === "flex") {
      set_dropdown_state("none")
      console.log("hide_dropdown")
    }
  }

  const on_attribute_change = async (e) => {

    const note_id = props.id
    const attribute_data = e.target.id
    const field_name = e.target.name
    console.log({ "note_id": note_id, "attribute_data": attribute_data, "field_name": field_name })
    try {
      const res = await API.get_note(note_id)
      // console.log({ "update_note": res.data })
      const update_todo = {
        ...res.data,
        [field_name]: attribute_data
      }
      const resp = await API.update_note(note_id, update_todo)
      props.get_all_notes_by_list_id("Dump")
      props.get_all_notes_by_list_id("Master")
      API.update_note(note_id, update_todo)
      props.get_all_notes_by_list_id("Dump")
      props.get_all_notes_by_list_id("Master")
    }
    catch (err) {
      console.log({ "save_scheduling": err });
    }
  }

  // window.onclick = function (event) {
  //   if (!event.target.matches('.dropbtn')) {
  //     var dropdowns = document.getElementsByClassName("dropdown-content");
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains('show')) {
  //         openDropdown.classList.remove('show');
  //       }
  //     }
  //   }


  // }

  // const [folder_state, set_folder_state] = useState({})

  // const get_all_folders = async () => {
  //   try {
  //     const res = await API.get_all_folders()
  //     const folders = res.data
  //     set_folder_state(folders)

  //     // return folders;
  //     // console.log({ "get_all_folders": res.data })
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // };


  const priority_dropdown_items = ["High", "Medium", "Low"]
  const list_name_dropdown_items = ["Master", "Dump", "No List"]
  const folder_name_dropdown_items = props.folder_state

  return (
    <div style={{ display: props.show_modal_state }} className="todo_modal zoom">
      <ButtonSymbol styles={{ margin: "-10px 0px 8px" }} on_click_function={props.show_modal}><i className="fas fa-times"></i></ButtonSymbol>
      <NoteTextEditor
        note_state={note_state}
        on_change_note_editor={on_change_note_editor}
        height="30vh" />
      <NoteAttributeEditor
        note_state={note_state}
        folders_state={props.folders_state}
        on_attribute_change={on_attribute_change}
        priority_dropdown_items={priority_dropdown_items}
        list_name_dropdown_items={list_name_dropdown_items}
        folder_name_dropdown_items={folder_name_dropdown_items}
        dropdown_state={dropdown_state}
        show_dropdown={show_dropdown}
        formatted_date_slash={format_date_display(new Date())}
        formatted_date_dash={format_date_element(new Date())}
        on_change_note_editor={on_change_note_editor}
        checkboxState={note_state.completed}
        show_scheduling={show_scheduling}
        schedule_state={schedule_state} />

      <ButtonWord styles={{ margin: "10px 0px 0px 0px" }} on_click_function={delete_note} index={props.id} get_all_notes_by_list_id={props.get_all_notes_by_list_id} id={props.id}>
        Delete
      </ButtonWord>
    </div>
  );
}

export default TodoModal;