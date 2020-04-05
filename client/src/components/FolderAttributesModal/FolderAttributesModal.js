// React
import React, { useState, useEffect } from "react";
// Styles
import './folder_attributes_modal.css'
// import Checkbox from '../Checkbox/Checkbox';
import ButtonWord from '../ButtonWord/ButtonWord';
import Checkbox from '../Checkbox/Checkbox';
import API from "../../utils/API";
import Label from '../Label/Label';
import ButtonSymbol from '../ButtonSymbol/ButtonSymbol';


const FolderAttributesModal = (props) => {

  // const [todo_state, set_todo_state] = useState("")
  const folder_id = props.id

  // console.log({ "folder_id": folder_id })

  const [folder_state, set_folder_state] = useState({
    folder_name: "",
    folders: "",
    folders: "",
    completed: "",
    date_modified: new Date().setDate(new Date().getDate())
  })

  const [dropdown_state, set_dropdown_state] = useState("none")
  // const [date_state, set_date_state] = useState({
  //   date_created: "",
  //   date_modified: "",
  // })
  // console.log(folder_state)

  useEffect(() => {
    get_folder()

  }, [])

  // const update_folder = async (e) => {
  //   e.persist();
  //   const folder_id = e.target.id
  //   const todo_data = e.target.value
  //   const field_name = e.target.name
  //   console.log(field_name)
  //   if (folder_id != undefined) {
  //     try {
  //       const res = await API.get_folder(folder_id)
  //       console.log({ "update_folder": res.data })
  //       const update_todo = {
  //         ...res.data,
  //         [field_name]: todo_data,
  //         date_modified: new Date().setDate(new Date().getDate())
  //       }
  //       API.update_folder(folder_id, update_todo)
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }
  //   }

  // }
  const get_folder = async () => {
    const folder_id = props.id
    // console.log({ "get_folder": folder_id })
    if (folder_id != undefined) {
      try {
        const res = await API.get_folder(folder_id)
        // console.log({ "get_folder": res.data })
        set_folder_state(res.data)
        set_date_state(format_date_element(res.data.scheduled_date))
        set_time_state(res.data.scheduled_time)

        // // format_date(res.data.date_created)
        set_folder_state({
          ...res.data, date_modified: format_date_display(res.data.date_modified),
          date_created: format_date_display(res.data.date_created)
        })
        // set_folder_state({
        //   ...folder_state,
        //   date_created: format_date(res.data.date_created),
        //   date_modified: format_date(res.data.date_modified)
        // })
      }
      catch (err) {
        // console.log(err);
      }
    }
  }
  // get_folder();

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
      // set_folder_state({ ...folder_state, date_modified: today })
      return today;
    }
  }

  const drop_down = () => {
    if (dropdown_state === "none") {
      set_dropdown_state("flex")
    }
    else if (dropdown_state === "flex") {
      set_dropdown_state("none")
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



  // const [date_state_2, set_date_state_2] = useState("")
  const [date_state, set_date_state] = useState("")
  const [time_state, set_time_state] = useState("")

  const date = new Date()

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

  const on_change_folder_editor = async (e) => {
    const folder_id = props.id
    let todo_data = ""
    let field_name = ""
    // const folder_id = e.target.id
    console.log({ "on_change_folder_editor": e })
    if (e.target === undefined) {
      set_folder_state({ ...folder_state, scheduled: e })
      todo_data = e
      field_name = "scheduled"
    }
    else {

      todo_data = e.target.value
      field_name = e.target.name
      set_folder_state({ ...folder_state, [field_name]: todo_data })
    }
    console.log(field_name)
    try {
      const res = await API.get_folder(folder_id)
      console.log({ "update_folder": res.data })
      const update_todo = {
        ...res.data,
        [field_name]: todo_data
      }
      API.update_folder(folder_id, update_todo)
    }
    catch (err) {
      console.log({ "save_scheduling": err });
    }

  }

  const delete_folder = async (e) => {
    const folder_id = props.id
    console.log()
    try {
      const res = await API.delete_folder(folder_id)
      props.get_all_folders()
      // props.get_all_folders_by_list_id("dump", props.index)
      // props.get_all_folders_by_list_id("master", props.index)
    }
    catch (err) {
      console.log(err);
    }
  }

  // const [folder_modal_state, set_folder_modal_state] = useState("none")

  // const show_hide_folder_modal = async (e) => {
  //   const folder_id = props.id
  //   console.log(folder_id)
  //   if (folder_modal_state === "none") {
  //     set_folder_modal_state("block")
  //   }
  //   else {
  //     set_folder_modal_state("none")
  //   }
  // }
  // const [folders_state, set_folders_state] = useState([])
  // const [folder_view_state, set_folder_view_state] = useState([])

  // const get_all_folders = async () => {
  //   try {
  //     const res = await API.get_all_folders()
  //     set_folders_state(res.data)
  //     let array = []
  //     res.data.map(folder => {
  //       // console.log({ "folder": folder._id })
  //       let id = folder._id
  //       array = { ...array, [id]: "0px" }

  //     })
  //     // set_folder_view_state()
  //     set_folder_view_state(array)
  //     // console.log({ "App.js - get_all_folders": res.data })
  //     // console.log({ "folder_view_state": folder_view_state })
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // };



  return (
    <div style={{ display: props.folder_modal_state }} className="folder_attributes_modal zoom">
      <ButtonSymbol margin="-10px 0px 8px" list_id={props.id} on_click_function={props.show_hide_folder_modal}><i className="fas fa-times"></i></ButtonSymbol>
      <div id="create_folder_fields">
        <div id="create_folder_container">
          <div >
            <div >
              <Label>Folder Name: </Label>
              <input
                defaultValue={folder_state.folder_name}
                onChange={e => props.on_change_folder_editor(e)}
                className="folder_name_input editor_inputs"
                id={props.id}
                placeholder="Folder Name"
                name="folder_name" />
            </div>
            <div>
              <Label>Folder ID: </Label>
              <input
                defaultValue={folder_state._id}
                readOnly
                onChange={e => props.on_change_folder_editor(e)}
                className="folder_id_input_2 editor_inputs"
                placeholder="Folder ID"
                id={props.id}
                name="folder_id" />
            </div>
            <div>
              <Label>Notes: </Label>
              <input
                defaultValue={folder_state.notes}
                onChange={e => props.on_change_folder_editor(e)}
                className="notes_input editor_inputs"
                placeholder="Notes"
                id={props.id}
                name="notes" />
            </div>
            <div>
              <Label>Folders: </Label>
              <input
                defaultValue={folder_state.folders}
                onChange={e => props.on_change_folder_editor(e)}
                className="folders_input editor_inputs"
                placeholder="Folders"
                id={props.id}
                name="folders" />
            </div>
            <div>
              <Label>Date Created: </Label>
              <input
                defaultValue={folder_state.date_created}
                readOnly
                onChange={e => props.on_change_folder_editor(e)}
                className="folder_id_input_2 editor_inputs"
                // placeholder="Date"
                id={props.id}
                name="folder_id" />
            </div>
            <div>
              <Label>Date Modified: </Label>
              <input
                defaultValue={folder_state.date_modified}
                readOnly
                onChange={e => props.on_change_folder_editor(e)}
                className="folder_id_input_2 editor_inputs"
                // placeholder="Folder ID"
                id={props.id}
                name="folder_id" />
            </div>
          </div>
        </div>
      </div>
      {/* <ButtonSymbol margin="-10px 0px 8px" list_id={props.id} on_click_function={props.show_hide_folder_modal}><i className="fas fa-times"></i></ButtonSymbol>
      <folderTextEditor
        folder_state={folder_state}
        on_change_folder_editor={on_change_folder_editor}
        height="30vh" />
      <folderAttributeEditor
        folder_state={folder_state}
        formatted_date_slash={formatted_date_slash}
        on_change_folder_editor={on_change_folder_editor}
        checkboxState={folder_state.completed}
        show_scheduling={show_scheduling}
        schedule_state={schedule_state} /> */}
      <ButtonWord margin="10px 0px 0px 0px" on_click_function={delete_folder} index={props.id} get_all_folders={props.get_all_folders} id={props.id}>
        Delete
      </ButtonWord>
    </div>
  );
}

export default FolderAttributesModal;