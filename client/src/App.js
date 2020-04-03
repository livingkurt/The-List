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
import NoteAttributeEditor from './components/NoteAttributeEditor/NoteAttributeEditor';
import NoteTextEditor from './components/NoteTextEditor/NoteTextEditor';
import PriorityContainer from './components/PriorityContainer/PriorityContainer';
import TodoContainer from './components/TodoContainer/TodoContainer';
import FolderContainer from './components/FolderContainer/FolderContainer';
import PriorityTitle from './components/PriorityTitle/PriorityTitle';
import Button from './components/Button/Button';
import API from "./utils/API";
// import styled from 'styled-components';

const App = () => {


  useEffect(() => {
    get_all_notes_by_list_id("master");
    get_all_notes_by_list_id("dump");
    get_all_notes();
    get_all_folders();
  }, []);


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
  const [folder_state, set_folder_state] = useState([])


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


  const get_all_notes_by_list_id = async (list_id) => {
    try {
      const res = await API.get_notes_by_list_id(list_id)
      if (list_id === "dump") {
        set_todo_dump_state(res.data)
      }
      else {
        set_todo_master_state(res.data)
      }
      return res;
    }
    catch (err) {
      console.log(err);
    }
  };

  const get_all_notes = async () => {
    try {
      const res = await API.get_all_notes()
      set_all_todo_state(res.data)
    }
    catch (err) {
      console.log(err);
    }
  };

  const create_empty_list_item = async (list_id) => {
    try {
      const res = await API.get_notes_by_list_id(list_id)
      const new_data = [...res.data, { ...todo_state, list_id: list_id }]
      const response = await API.post_note({ ...note_state, list_id: list_id })
      if (list_id === "dump") {
        set_todo_dump_state(new_data)
        set_todo_dump_state([response.data, ...todo_dump_state])
      }
      else if (list_id === "master") {
        set_todo_master_state(new_data)
        set_todo_master_state([response.data, ...todo_master_state])
      }
      get_all_notes_by_list_id(list_id);
    }
    catch (err) {
      console.log(err);
    }
  };

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
      document.querySelector(".list_id_input").value = "dump"
      document.querySelector("#checkbox_input").checked = false
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

  const on_change_note_editor = (e) => {
    if (e.target === undefined) {
      set_note_state({ ...note_state, scheduled: e })
    }
    else {
      const todo_data = e.target.value
      const field_name = e.target.name
      set_note_state({ ...note_state, [field_name]: todo_data })
    }

  }

  const [schedule_state, set_schedule_state] = useState(false)

  const show_scheduling = () => {
    if (schedule_state === false) {
      set_schedule_state(true)
      on_change_note_editor(true)
    }
    else {
      set_schedule_state(false)
      on_change_note_editor(false)
    }
  }

  const [priority_state, set_priority_state] = useState(
    {
      master_high: "100%",
      master_medium: "100%",
      master_low: "100%",
      dump_high: "100%",
      dump_medium: "100%",
      dump_low: "100%",
      priorites: ["High", "Medium", "Low"]
    }
  )

  const show_hide_by_priority = (list_id, priority) => {
    console.log({ "show_hide_by_priority": priority })

    priority = priority.toLowerCase()
    let field_name = list_id + "_" + priority
    if (priority_state[field_name] === "100%") {
      set_priority_state({ ...priority_state, [field_name]: "0px" })
      // document.querySelector(`#${field_name}`).classList.toggle = ('todo_container_collapsed')
      console.log({ "show_hide_by_priority": priority_state })
    }
    else if (priority_state[field_name] === "0px") {
      set_priority_state({ ...priority_state, [field_name]: "100%" })
      // document.querySelector(`#${field_name}`).classList.toggle = ('todo_container_collapsed')
      console.log({ "show_hide_by_priority": priority_state })
    }
  }

  const easing_functions = {
    // no easing, no acceleration
    linear: t => t,
    // accelerating from zero velocity
    easeInQuad: t => t * t,
    // decelerating to zero velocity
    easeOutQuad: t => t * (2 - t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    // accelerating from zero velocity 
    easeInCubic: t => t * t * t,
    // decelerating to zero velocity 
    easeOutCubic: t => (--t) * t * t + 1,
    // acceleration until halfway, then deceleration 
    easeInOutCubic: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    // accelerating from zero velocity 
    easeInQuart: t => t * t * t * t,
    // decelerating to zero velocity 
    easeOutQuart: t => 1 - (--t) * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    // accelerating from zero velocity
    easeInQuint: t => t * t * t * t * t,
    // decelerating to zero velocity
    easeOutQuint: t => 1 + (--t) * t * t * t * t,
    // acceleration until halfway, then deceleration 
    easeInOutQuint: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
  }

  const create_new_folder = async (list_id) => {
    try {
      const res = await API.get_notes_by_list_id(list_id)
      const new_data = [...res.data, { ...todo_state, list_id: list_id }]
      const response = await API.post_note({ ...note_state, list_id: list_id })
      if (list_id === "dump") {
        set_todo_dump_state(new_data)
        set_todo_dump_state([response.data, ...todo_dump_state])
      }
      else if (list_id === "master") {
        set_todo_master_state(new_data)
        set_todo_master_state([response.data, ...todo_master_state])
      }
      get_all_notes_by_list_id(list_id);
    }
    catch (err) {
      console.log(err);
    }
  };

  const get_all_folders = async () => {
    try {
      const res = await API.get_all_folders()
      set_folder_state(res.data)
      console.log({ "App.js - get_all_folders": res.data })
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div >
      <Background>
        <Header sidebar_show_hide={sidebar_show_hide}>
          <Title margin="0px">TheList</Title>
        </Header>
        <Container>
          <NoteArchive >
            <ScrollContainer height={"83vh"}>
              <Button margin="18px 0px 18px 18px" on_click_function={create_new_folder} >+</Button>
              {folder_state.map((folder, index) => {
                return <FolderContainer >
                  <PriorityTitle fontSize="16px" list_id="dump" margin="10px">{folder.folder_name}</PriorityTitle>
                </FolderContainer>
              })}
              {/* {all_todo_state.map((note, index) => {
                return <ArchiveItem get_all_notes={get_all_notes} index={note._id} id={note._id} key={note._id}>{note.title}</ArchiveItem>
              })} */}
              {/* {priority_state.priorites.map((priority, index) => {
                return <PriorityContainer key={index}>
                  <PriorityTitle fontSize="16px" on_click_function={show_hide_by_priority} list_id="dump" priority={priority} border="1px solid silver" margin="10px">{priority} Priority</PriorityTitle>
                  <TodoContainer id={"dump_" + priority.toLowerCase()} height={priority_state["dump_" + priority.toLowerCase()]}>
                    {todo_dump_state.map((note, index) => {
                      if (note.priority === priority) {
                        return <ListItem get_all_notes_by_list_id={get_all_notes_by_list_id} index={note._id} id={note._id} key={note._id}>{note.title}</ListItem>
                      }
                    })}
                  </TodoContainer>
                </PriorityContainer>
              })} */}
            </ScrollContainer>
          </NoteArchive>
          <Section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title >Create Note</Title>
              <Button margin="18px 0px 18px 18px" on_click_function={create_new_note} >+</Button>
            </div>
            <Title margin="-30px 0px 0px 0px" fontSize="16px">Create a New Note Below</Title>
            <div>
              <NoteTextEditor
                set_todo_state={set_todo_state}
                note_state={note_state}
                on_change_note_editor={on_change_note_editor} />
              <NoteAttributeEditor
                set_todo_state={set_todo_state}
                note_state={note_state}
                formatted_date_slash={formatted_date_slash}
                formatted_date_dash={formatted_date_dash}
                on_change_note_editor={on_change_note_editor}
                show_scheduling={show_scheduling}
                schedule_state={schedule_state} />
            </div>
          </Section>
          <Section >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>Todo Dump</Title>
              <Button margin="18px 0px 18px 18px" on_click_function={create_empty_list_item} list_id="dump" >+</Button>
            </div>
            <Title margin="-30px 0px 0px 0px" fontSize="16px">Get your Ideas Down Fast</Title>
            <ScrollContainer>
              {priority_state.priorites.map((priority, index) => {
                return <PriorityContainer key={index}>
                  <PriorityTitle fontSize="16px" on_click_function={show_hide_by_priority} list_id="dump" priority={priority} border="1px solid silver" margin="10px">{priority} Priority</PriorityTitle>
                  <TodoContainer id={"dump_" + priority.toLowerCase()} height={priority_state["dump_" + priority.toLowerCase()]}>
                    {todo_dump_state.map((note, index) => {
                      if (note.priority === priority) {
                        return <ListItem get_all_notes_by_list_id={get_all_notes_by_list_id} index={note._id} id={note._id} key={note._id}>{note.title}</ListItem>
                      }
                    })}
                  </TodoContainer>
                </PriorityContainer>
              })}
            </ScrollContainer>
          </Section>
          <Section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>Master Todo List:</Title>
              <Button margin="18px 0px 18px 18px" on_click_function={create_empty_list_item} list_id="master" >+</Button>
            </div>
            <Title margin="-30px 0px 0px 0px" fontSize="16px">Today {formatted_date_slash}</Title>
            <ScrollContainer>
              {priority_state.priorites.map((priority, index) => {
                return <PriorityContainer key={index}>
                  <PriorityTitle fontSize="16px" on_click_function={show_hide_by_priority} list_id="master" priority={priority} border="1px solid silver" margin="10px">{priority} Priority</PriorityTitle>
                  <TodoContainer id={"master_" + priority.toLowerCase()} height={priority_state["master_" + priority.toLowerCase()]}>
                    {todo_master_state.map((note, index) => {
                      if (note.priority === priority) {
                        return <ListItem get_all_notes_by_list_id={get_all_notes_by_list_id} index={note._id} id={note._id} key={note._id}>{note.title}</ListItem>
                      }
                    })}
                  </TodoContainer>
                </PriorityContainer>
              })}
            </ScrollContainer>
          </Section>
        </Container>
        <Container>
          <Section width="100%">
            <Title>Calender</Title>
          </Section>
        </Container>

      </Background >
    </div >
  );
}

export default App;


