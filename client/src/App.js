import React, { useState, useEffect } from 'react';
import './App.css';
import Background from './components/Background/Background';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import Header from './components/Header/Header';
import ListItem from './components/ListItem/ListItem';
import ScrollContainer from './components/ScrollContainer/ScrollContainer.js';
import Title from './components/Title/Title';
import NoteArchive from './components/NoteArchive/NoteArchive';
import ArchiveItem from './components/ArchiveItem/ArchiveItem';
import Checkbox from './components/Checkbox/Checkbox';
import ListItemModal from './components/ListItemModal/ListItemModal';
import TextField from './components/TextField/TextField';
import TitleField from './components/TitleField/TitleField';
import AddButton from './components/AddButton/AddButton';
import API from "./utils/API";
import styled from 'styled-components';

const App = () => {
  const [todo_master_state, set_todo_master_state] = useState([])
  const [todo_dump_state, set_todo_dump_state] = useState([])
  const [all_todo_state, set_all_todo_state] = useState([])
  const [todo_state, set_todo_state] = useState({
    title: "",
    body: "",
    folder_id: "",
    list_id: "",
    priority: "Low",
    scheduled: false,
    scheduled_date_time: "",
    completed: false,
  })
  const [note_state, set_note_state] = useState({
    title: "",
    body: "",
    folder_id: "",
    list_id: "dump",
    priority: "Low",
    scheduled: false,
    scheduled_date_time: "",
    completed: false,
  })

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



  const [date_state, set_date_state] = useState("")
  const [time_state, set_time_state] = useState("")



  const formatted_date_slash = `${month}/${day}/${year}`
  const formatted_date_dash = `${year}-${month}-${day}`


  useEffect(() => {
    get_all_notes_by_list_id("master");
    get_all_notes_by_list_id("dump");
    get_all_notes();
    get_formatted_date();
    get_formatted_time();
  }, []);



  const get_formatted_time = () => {
    var hours = date.getHours();
    var seconds = date.getMinutes();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = hours + ":" + seconds
    set_time_state(today)
    // document.getElementById("scheduled_time").value = today;

  }

  const get_formatted_date = () => {
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

  const get_all_notes_by_list_id = async (list_id) => {
    try {
      const res = await API.get_notes_by_list_id(list_id)
      if (list_id === "dump") {
        set_todo_dump_state(res.data)
      }
      else {
        set_todo_master_state(res.data)
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  const get_all_notes = async () => {
    // if (list_id != undefined) {
    try {
      const res = await API.get_all_notes()
      set_all_todo_state(res.data)
    }
    catch (err) {
      console.log(err);
    }
    // }


  };

  const create_empty_list_item = async (list_id) => {
    try {
      const res = await API.get_notes_by_list_id(list_id)
      const new_data = [...res.data, { ...todo_state, list_id: list_id }]
      if (list_id === "dump") {
        set_todo_dump_state(new_data)
      }
      else if (list_id === "master") {
        set_todo_master_state(new_data)
      }
      new_note(list_id);
    }
    catch (err) {
      console.log(err);
    }

  };

  const new_note = async (list_id) => {
    try {
      const res = await API.post_note({ ...note_state, list_id: list_id })
      if (list_id === "dump") {
        set_todo_dump_state([res.data, ...todo_dump_state])
      }
      else if (list_id === "master") {
        set_todo_master_state([res.data, ...todo_master_state])
      }
      set_note_state({ title: "", body: "" })
      get_all_notes_by_list_id(list_id);
      document.querySelector(".title_field").value = ""
      document.querySelector(".text_field").value = ""
    }
    catch (err) {
      console.log(err);
    }

  }

  const create_new_note = async () => {
    try {
      const res = await API.post_note(note_state)
      get_all_notes_by_list_id("master");
      get_all_notes_by_list_id("dump");
      set_note_state({
        title: "",
        body: "",
        folder_id: "",
        list_id: "dump",
        priority: "Low",
        scheduled: false,
        scheduled_date_time: "",
        completed: false,
      })
      document.querySelector(".title_field").value = ""
      document.querySelector(".text_field").value = ""
      document.querySelector(".priority_input").value = "Low"
      document.querySelector(".list_id_input").value = "dump"
    }
    catch (err) {
      console.log(err);
    }
  }




  const [sidebar_state, set_sidebar_state] = useState(false)

  const sidebar_show_hide = () => {
    if (sidebar_state) {
      document.querySelector(".sidebar").classList.remove("open");
      set_sidebar_state(false)
    }
    else {
      document.querySelector(".sidebar").classList.add("open");
      set_sidebar_state(true)
    }
  }


  const [schedule_state, set_schedule_state] = useState(false)

  const show_scheduling = () => {
    // console.log("show_scheduling")
    if (schedule_state === false) {
      set_schedule_state(true)
      set_note_state({ ...note_state, scheduled: false })

      // update_scheduled_checkbox(props.id, true)

    }
    else {
      set_schedule_state(false)
      // update_scheduled_checkbox(props.id, true)
      set_note_state({ ...note_state, scheduled: true })
    }
    console.log(note_state)

  }



  return (
    <div >
      <Background>
        <Header sidebar_show_hide={sidebar_show_hide}>
          <Title margin="0px">
            TheList
        </Title>
        </Header>
        <Container>
          <NoteArchive >
            <ScrollContainer height={"83vh"}>
              {all_todo_state.map((note, index) => {
                return <ArchiveItem get_all_notes={get_all_notes} index={note._id} id={note._id} key={note._id}>{note.title}</ArchiveItem>
              })}
            </ScrollContainer>
          </NoteArchive>
          <Section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>
                Create Note
              </Title>
              <button onClick={() => create_new_note()} className="add_button">+</button>
            </div>
            <div className="todays_date" >Create a New Note Below</div>
            <div>
              <div id="create_note_title_description">
                <input
                  className="title_field"
                  onChange={e => set_note_state({ ...note_state, title: e.target.value })}
                  placeholder="Title"
                  onBlur={(e) => e.target.placeholder = "Title"}
                  onFocus={(e) => e.target.placeholder = ""}></input>
                <textarea
                  className="text_field"
                  onChange={e => set_note_state({ ...note_state, body: e.target.value })}
                  placeholder="Description"
                  onBlur={(e) => e.target.placeholder = "Description"}
                  onFocus={(e) => e.target.placeholder = ""}
                />
              </div>

              <div id="create_note_fields">
                <div id="create_note_container">
                  <div style={{ width: "55%" }}>
                    <div >
                      <label className="modal_labels">Priority: </label>
                      <input
                        defaultValue={note_state.priority}
                        onChange={e => set_note_state({ ...note_state, priority: e.target.value })}
                        className="priority_input create_note_inputs"
                        placeholder="High, Medium, Low"
                        name="priority" />
                    </div>
                    <div>
                      <label className="modal_labels">List Name: </label>
                      <input
                        defaultValue={note_state.list_id}
                        onChange={e => set_note_state({ ...note_state, list_id: e.target.value })}
                        className="list_id_input modal_input create_note_inputs"
                        placeholder="List Name"
                        name="list_id" />
                    </div>
                    <label className="modal_labels">Date Created: {formatted_date_slash}</label>
                    <div className="modal_scheduled_field ">
                      <label className="modal_labels">Schedule: </label>
                      <Checkbox onCheck={show_scheduling} checkboxState={schedule_state} />
                    </div>
                  </div>

                  <div id="schedule_div" style={{ display: schedule_state ? "flex" : "none" }}>
                    <label className="modal_labels">Date: </label>
                    <input id="scheduled_date" type="date"
                      defaultValue={date_state}
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
                </div>
              </div>
            </div>
          </Section>

          <Section >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>
                Todo Dump
            </Title>

              <button onClick={() => create_empty_list_item("dump")} className="add_button">+</button>
            </div>
            <div className="todays_date" >Get your Ideas Down Fast</div>
            <ScrollContainer>
              {todo_dump_state.map((note, index) => {
                return <ListItem get_all_notes_by_list_id={get_all_notes_by_list_id} index={note._id} id={note._id} key={note._id}>{note.title}</ListItem>
              })}
            </ScrollContainer>
          </Section>
          <Section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>
                Master Todo List:
              </Title>
              <button onClick={() => create_empty_list_item("master")} className="add_button">+</button>
            </div>
            <div className="todays_date" >Today {formatted_date_slash}</div>
            <ScrollContainer>
              {todo_master_state.map((note, index) => {
                return <ListItem get_all_notes_by_list_id={get_all_notes_by_list_id} index={note._id} id={note._id} key={note._id}>{note.title}</ListItem>
              })}
            </ScrollContainer>
          </Section>
        </Container>
        <Container>
          <Section width="100%">
            <Title>
              Calender
              </Title>
          </Section>
        </Container>

      </Background >
    </div >
  );
}

export default App;


