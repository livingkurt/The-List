// React
import React, { useState, useEffect } from "react";
// Styles
import './list_item_modal.css'
// import Checkbox from '../Checkbox/Checkbox';
import ButtonWord from '../ButtonWord/ButtonWord';
import Checkbox from '../Checkbox/Checkbox';
import API from "../../utils/API";
import NoteAttributeEditor from '../NoteAttributeEditor/NoteAttributeEditor';
import NoteTextEditor from '../NoteTextEditor/NoteTextEditor';
import ButtonSymbol from '../ButtonSymbol/ButtonSymbol';


const ListItemModal = (props) => {

  // const [todo_state, set_todo_state] = useState("")

  const [note_state, set_note_state] = useState({
    title: "",
    body: "",
    folder_id: "",
    list_id: "",
    priority: "",
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

  // const update_note = async (e) => {
  //   e.persist();
  //   const todo_id = e.target.id
  //   const todo_data = e.target.value
  //   const field_name = e.target.name
  //   console.log(field_name)
  //   if (todo_id != undefined) {
  //     try {
  //       const res = await API.get_note(todo_id)
  //       console.log({ "update_note": res.data })
  //       const update_todo = {
  //         ...res.data,
  //         [field_name]: todo_data,
  //         date_modified: new Date().setDate(new Date().getDate())
  //       }
  //       API.update_note(todo_id, update_todo)
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }
  //   }

  // }
  const get_note = async () => {
    const todo_id = props.id
    if (todo_id != undefined) {
      try {
        const res = await API.get_note(todo_id)
        set_note_state(res.data)
        // set_date_state(format_date_element(res.data.scheduled_date))
        // set_time_state(res.data.scheduled_time)

        // format_date(res.data.date_created)
        // set_note_state({
        //   ...res.data, date_modified: format_date_display(res.data.date_modified),
        //   date_created: format_date_display(res.data.date_created)
        // })
        // set_note_state({
        //   ...note_state,
        //   date_created: format_date(res.data.date_created),
        //   date_modified: format_date(res.data.date_modified)
        // })
      }
      catch (err) {
        // console.log(err);
      }
    }
  }

  const format_date_element = unformatted_date => {
    if (unformatted_date !== null || unformatted_date !== undefined) {
      // unformatted_date = unformatted_date.toString()
      let year = unformatted_date.slice(0, 4)
      let month = unformatted_date.slice(5, 7)
      let day = unformatted_date.slice(8, 10)
      // const formatted_date = `${month}-${day}-${year}`
      // return formatted_date;
      // var day = date.getDate();
      // var month = date.getMonth() + 1;
      // var year = date.getFullYear();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      var today = year + "-" + month + "-" + day;
      set_date_state(today)
      // set_note_state({ ...note_state, date_modified: today })
      return today;
    }
  }



  const format_date_display = unformatted_date => {
    if (unformatted_date !== null || unformatted_date !== undefined) {
      // unformatted_date = unformatted_date.toString()
      const year = unformatted_date.slice(0, 4)
      const month = unformatted_date.slice(5, 7)
      const day = unformatted_date.slice(8, 10)
      const formatted_date = `${month}/${day}/${year}`
      return formatted_date;
    }
  }

  const [schedule_state, set_schedule_state] = useState(false)

  const show_scheduling = () => {
    // console.log("show_scheduling")
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
  // const [date_state_2, set_date_state_2] = useState("")
  const [date_state, set_date_state] = useState("")
  const [time_state, set_time_state] = useState("")

  const date = new Date()

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

  // const date = new Date()
  let month = date.getMonth() + 1
  if (month.length === 1) {
    month = `0${month}`
  }
  let day = date.getDate()
  if (day.length === 1) {
    day = `0${day}`
  }
  let year = date.getFullYear();


  const formatted_date_slash = `${month}/${day}/${year}`

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
      // console.log({ "on_change_note_editor": field_name })
      if (field_name == "folder_id") {
        on_change_folder_editor(note_id, note_data)
        // console.log({ "on_change_note_editor": field_name })
      }
      // on_change_folder_editor(note_id, note_data)

      set_note_state({ ...note_state, [field_name]: note_data })
    }
    // console.log(field_name)
    try {
      const res = await API.get_note(note_id)
      // console.log({ "update_note": res.data })
      const update_todo = {
        ...res.data,
        [field_name]: note_data,
        // date_modified: date

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
      // console.log(update_folder)
      console.log({ "update_folder": update_folder })
      const response = await API.update_folder(folder_id, update_folder)
      // get_all_folders();

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
  // console.log({ "folder_name_dropdown_items": folder_state })



  return (
    <div style={{ display: props.show_modal_state }} className="list_modal zoom">
      <ButtonSymbol margin="-10px 0px 8px" on_click_function={props.show_modal}><i className="fas fa-times"></i></ButtonSymbol>
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
        formatted_date_slash={formatted_date_slash}
        on_change_note_editor={on_change_note_editor}
        checkboxState={note_state.completed}
        show_scheduling={show_scheduling}
        schedule_state={schedule_state} />
      <ButtonWord margin="10px 0px 0px 0px" on_click_function={delete_note} index={props.id} get_all_notes_by_list_id={props.get_all_notes_by_list_id} id={props.id}>
        Delete
      </ButtonWord>
    </div>
  );
}

export default ListItemModal;