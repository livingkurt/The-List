// React
import React, { useState, useEffect } from "react";
// Styles
import './list_item_modal.css'
// import Checkbox from '../Checkbox/Checkbox';
import DeleteButton from '../DeleteButton/DeleteButton';
import Checkbox from '../Checkbox/Checkbox';
import API from "../../utils/API";


const ListItemModal = (props) => {

  // const [todo_state, set_todo_state] = useState("")

  const [note_state, set_note_state] = useState({
    title: "",
    body: "",
    folder_id: "",
    list_id: "",
    priority: "",
    scheduled: false,
    scheduled_date_time: "",
    completed: false,
  })

  const [dropdown_state, set_dropdown_state] = useState("none")
  const [date_state, set_date_state] = useState({
    date_created: "",
    date_modified: "",
  })

  useEffect(() => {
    get_note()
  }, [])

  const update_note = async (e) => {
    e.persist();
    const todo_id = e.target.id
    const todo_data = e.target.value
    const field_name = e.target.name
    console.log(field_name)
    if (todo_id != undefined) {
      try {
        const res = await API.get_note(todo_id)
        const update_todo = {
          ...res.data,
          [field_name]: todo_data
        }
        API.update_note(todo_id, update_todo)
      }
      catch (err) {
        console.log(err);
      }
    }

  }
  const get_note = async () => {
    const todo_id = props.id
    if (todo_id != undefined) {
      try {
        const res = await API.get_note(todo_id)
        set_note_state(res.data)
        set_date_state({
          ...date_state,
          date_created: format_date(res.data.date_created),
          date_modified: format_date(res.data.date_modified)
        })
      }
      catch (err) {
        console.log(err);
      }
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

  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  const format_date = unformatted_date => {
    unformatted_date = unformatted_date.toString()
    const year = unformatted_date.slice(0, 4)
    const month = unformatted_date.slice(5, 7)
    const day = unformatted_date.slice(8, 10)
    const formatted_date = `${month}/${day}/${year}`
    return formatted_date;
  }




  return (
    <div style={{ display: props.show_modal_state }} className="list_modal zoom">
      <div className="title_close_div">
        <input
          defaultValue={note_state.title}
          className="title_input modal_inputs"
          name="title"
          placeholder="Title"
          id={props.id}
          onBlur={e => update_note(e)} />
        <button onClick={props.show_modal} className="show_modal_button"></button>
      </div>
      <textarea
        defaultValue={note_state.body}
        className="modal_text_field"
        onChange={e => set_note_state({ ...note_state, body: e.target.value })}
        placeholder="Description"
        name="body"
        id={props.id}
        onBlur={(e) => {
          e.target.placeholder = "Description"
          update_note(e)
        }
        }
        onFocus={(e) => e.target.placeholder = ""}
      />
      {/* <div className="dropdown">
        <button onClick={() => drop_down()} className="dropbtn">Priority</button>
        <div style={{ display: dropdown_state }} id="myDropdown" className="dropdown-content">
          <li>High Priority</li>
          <li>Medium Priority</li>
          <li>Low Priority</li>
        </div>
      </div> */}
      <div>
        <label className="modal_labels">Priority: </label>
        <input
          defaultValue={note_state.priority}
          onChange={e => set_note_state({ ...note_state, priority: e.target.value })}
          className="priority_input modal_inputs"
          placeholder="High, Medium, Low"
          name="priority"
          id={props.id}
          onBlur={e => update_note(e)} />
      </div>
      <div>
        <label className="modal_labels">List Name: </label>
        <input
          defaultValue={note_state.list_id}
          onChange={e => set_note_state({ ...note_state, list_id: e.target.value })}
          className="list_id_input modal_input modal_inputs"
          placeholder="List Name"
          name="list_id"
          id={props.id}
          onBlur={e => update_note(e)} />
      </div>
      <label className="modal_labels">Date Modified: {date_state.date_modified}</label>
      <label className="modal_labels">Date Created: {date_state.date_created}</label>
      <div className="modal_scheduled_field ">
        <label className="modal_labels">Schedule: </label>
        <Checkbox id={props.id} />
      </div>
      <DeleteButton index={props.id} get_all_notes_by_list_id={props.get_all_notes_by_list_id} id={props.id}>
        Delete
      </DeleteButton>
    </div>
  );
}

export default ListItemModal;
