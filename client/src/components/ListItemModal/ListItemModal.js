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
    get_formatted_date();
    get_formatted_time();
    get_checkbox_state();
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
  const [date_state_2, set_date_state_2] = useState("")
  const [time_state, set_time_state] = useState("")

  const date = new Date()
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
  const formatted_date_dash = `${year}-${month}-${day}`

  const get_formatted_date = () => {
    var hours = date.getHours();
    var seconds = date.getMinutes();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = hours + ":" + seconds
    set_time_state(today)
    // document.getElementById("scheduled_time").value = today;

  }

  const get_formatted_time = () => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    set_date_state(today)
    return today;
    // document.getElementById("scheduled_date").value = today;
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
        <button onClick={props.show_modal} className="show_modal_button"><i className="fas fa-times"></i></button>
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
      <div id="modal_fields_container" style={{ border: 0 }}>
        {/* <div id="create_note_container_modal"> */}
        <div id="modal_fields_section">
          <div style={{ display: "flex" }} >
            <div id="modal_priority_list_name" >
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
            </div>

            <div id="modal_dates" >
              <label className="modal_labels">Date Modified:</label>
              <label className="modal_labels">{date_state.date_modified}</label>
              <label className="modal_labels">Date Created:</label>
              <label className="modal_labels">{date_state.date_created}</label>
            </div>
          </div>
          <div className="modal_scheduled_field ">
            <label className="modal_labels">Schedule: </label>
            {console.log({ "Modal": schedule_state })}
            <Checkbox id={props.id} onCheck={show_scheduling} checkboxState={schedule_state} />
          </div>
        </div>

        <div id="modal_schedule_div" style={{ display: schedule_state ? "flex" : "none" }}>
          <label className="modal_labels">Date: </label>
          <input id="scheduled_date" type="date"
            defaultValue={date_state_2}
            onChange={e => set_note_state({ ...note_state, scheduled_date: e.target.value })}
            placeholder="List Name"
            name="scheduled_date" />
          <label className="modal_labels"> Time: </label>
          <input id="scheduled_time" type="time"
            defaultValue={time_state}
            onChange={e => set_note_state({ ...note_state, scheduled_time: e.target.value })}
            placeholder="List Name"
            name="scheduled_time" />
        </div>
        {/* </div> */}
      </div>
      <DeleteButton index={props.id} get_all_notes_by_list_id={props.get_all_notes_by_list_id} id={props.id}>
        Delete
      </DeleteButton>
    </div>
  );
}

export default ListItemModal;
