import React, { useState, useEffect } from 'react';
import './App.css';
import Background from './components/Background/Background';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import Header from './components/Header/Header';
import ListItem from './components/ListItem/ListItem';
import ScrollContainer from './components/ScrollContainer/ScrollContainer.js';
import Title from './components/Title/Title';
import NoteContainer from './components/NoteContainer/NoteContainer';
import Note from './components/Note/Note';
import NoteAttributeEditor from './components/NoteAttributeEditor/NoteAttributeEditor';
import NoteTextEditor from './components/NoteTextEditor/NoteTextEditor';
import PriorityContainer from './components/PriorityContainer/PriorityContainer';
import TodoContainer from './components/TodoContainer/TodoContainer';
import FolderContainer from './components/FolderContainer/FolderContainer';
import FolderNoteContainer from './components/FolderNoteContainer/FolderNoteContainer';
import PriorityTitle from './components/PriorityTitle/PriorityTitle';
import FolderTitle from './components/FolderTitle/FolderTitle';
import ButtonSymbol from './components/ButtonSymbol/ButtonSymbol';
import ButtonWord from './components/ButtonWord/ButtonWord';
import NoteEditor from './components/NoteEditor/NoteEditor';

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
      document.querySelector(".title_field").defaultValue = ""
      document.querySelector(".text_field").defaultValue = ""
      document.querySelector(".priority_input").defaultValue = "Low"
      document.querySelector(".list_id_input").defaultValue = "dump"
      document.querySelector(".folder_id_input_2").defaultValue = ""
      document.querySelector("#checkbox_input").checked = false
    }
    catch (err) {
      console.log(err);
    }
  }

  const [sidebar_state, set_sidebar_state] = useState(false)

  const sidebar_show_hide = () => {
    if (sidebar_state) {
      document.querySelector(".note_archive").classList.remove("open");
      set_sidebar_state(false)
    }
    else {
      document.querySelector(".note_archive").classList.add("open");
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



  // const sidebar_show_hide = () => {
  //   if (sidebar_state) {
  //     document.querySelector(".sidebar").classList.remove("open");
  //     set_sidebar_state(false)
  //   }
  //   else {
  //     document.querySelector(".sidebar").classList.add("open");
  //     set_sidebar_state(true)
  //   }
  // }

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

  const [folders_state, set_folders_state] = useState([])

  const create_new_folder = async () => {
    const blank_folder = {
      folder_name: "",
      folder_id: "",
      notes: [],
      folders: []
    }
    try {
      const res = await API.post_folder(blank_folder)
      console.log(res.data)
      get_all_folders();
    }
    catch (err) {
      console.log(err);
    }
  };

  const get_all_folders = async () => {
    try {
      const res = await API.get_all_folders()
      set_folders_state(res.data)
      let array = []
      res.data.map(folder => {
        // console.log({ "folder": folder._id })
        let id = folder._id
        array = { ...array, [id]: "0px" }

      })
      // set_folder_view_state()
      set_folder_view_state(array)
      // console.log({ "App.js - get_all_folders": res.data })
      // console.log({ "folder_view_state": folder_view_state })
    }
    catch (err) {
      console.log(err);
    }
  };



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
    }
    else if (priority_state[field_name] === "0px") {
      set_priority_state({ ...priority_state, [field_name]: "100%" })
    }
  }


  const [folder_view_state, set_folder_view_state] = useState([])

  const show_hide_by_folder = (folder_id) => {

    if (folder_view_state[folder_id] === "100%") {
      set_folder_view_state({ ...folder_view_state, [folder_id]: "0px" })
    }
    else if (folder_view_state[folder_id] === "0px") {
      set_folder_view_state({ ...folder_view_state, [folder_id]: "100%" })
    }
  }

  const [folder_state, set_folder_state] = useState({})

  const on_change_folder_editor = async (e) => {
    const folder_id = e.target.id
    const folder_data = e.target.value
    const field_name = e.target.name
    console.log(folder_id, folder_data, field_name)
    set_folder_state({ ...folder_state, [field_name]: folder_data })
    try {
      const res = await API.get_folder(folder_id)

      const update_folder = {
        ...res.data,
        [field_name]: folder_data
      }
      console.log({ "update_folder": update_folder })
      API.update_folder(folder_id, update_folder)
      // get_all_folders();
    }
    catch (err) {
      console.log({ "on_change_folder_editor": err });
    }

  }
  const [create_note_state, set_create_note_state] = useState("none")
  // const [new_note_button_state, set_new_note_button_state] = useState("New Note")
  const [show_hide_create_note_state, set_show_hide_create_note_state] = useState({
    name: "Create New Note",
    display: "none"
  })
  const [show_hide_master_state, set_show_hide_master_state] = useState({
    name: "Hide Todo Master",
    display: "block"
  })
  const [show_hide_dump_state, set_show_hide_dump_state] = useState({
    name: "Hide Todo Dump",
    display: "block"
  })

  const show_hide_master = () => {

    if (show_hide_master_state.display === "none") {
      set_show_hide_master_state({ ...show_hide_master_state, name: "Hide Todo Master", display: "block" })
    }
    else if (show_hide_master_state.display === "block") {
      set_show_hide_master_state({ ...show_hide_master_state, name: "Show Todo Master", display: "none" })
    }
  }

  const show_hide_dump = () => {

    if (show_hide_dump_state.display === "none") {
      set_show_hide_dump_state({ ...show_hide_dump_state, name: "Hide Todo Dump", display: "block" })
    }
    else if (show_hide_dump_state.display === "block") {
      set_show_hide_dump_state({ ...show_hide_dump_state, name: "Show Todo Dump", display: "none" })
    }
  }

  // const show_hide_new_note = () => {

  //   if (show_hide_dump_state.display === "none") {
  //     set_show_hide_dump_state({ ...show_hide_dump_state, name: "Hide Todo Dump", display: "block" })
  //   }
  //   else if (show_hide_dump_state.display === "block") {
  //     set_show_hide_dump_state({ ...show_hide_dump_state, name: "Show Todo Dump", display: "none" })
  //   }
  // }

  const show_create_note_container = () => {
    if (show_hide_create_note_state.display === "none") {
      // set_create_note_state("block")
      set_show_hide_create_note_state({ ...show_hide_create_note_state, name: "Hide New Note", display: "block" })
      // set_new_note_button_state("Discard Changes")
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
      document.querySelector(".title_field").defaultValue = ""
      document.querySelector(".text_field").defaultValue = ""
      document.querySelector(".priority_input").defaultValue = "Low"
      document.querySelector(".list_id_input").defaultValue = "dump"
      document.querySelector(".folder_id_input").defaultValue = ""
      document.querySelector("#checkbox_input").checked = false
    }
    else if (show_hide_create_note_state.display === "block") {
      set_show_hide_create_note_state({ ...show_hide_create_note_state, name: "Create New Note", display: "none" })
      // set_create_note_state("none")
      // set_new_note_button_state("New Note")
    }
  }

  // const [sidebar_state, set_sidebar_state] = useState(false)

  // // const openMenu = () => {
  // //   document.querySelector(".sidebar").classList.add("open");
  // // }
  // // const closeMenu = () => {
  // //   document.querySelector(".sidebar").classList.remove("open")
  // // }

  // const sidebar_show_hide = () => {
  //   if (sidebar_state) {
  //     document.querySelector(".sidebar").classList.add("open");
  //     set_sidebar_state(false)
  //   }
  //   else if (sidebar_state) {
  //     document.querySelector(".sidebar").classList.remove("open");
  //     set_sidebar_state(false)
  //   }
  // }

  // const [folder_modal_state, set_folder_modal_state] = useState("none")

  // const show_hide_folder_modal = async (e) => {
  //   const todo_id = e.target.list_id
  //   console.log(todo_id)
  //   // if (folder_modal_state === "none") {
  //   //   set_folder_modal_state("block")
  //   // }
  //   // else {
  //   //   set_folder_modal_state("none")
  //   // }
  // }

  const [folder_modal_state, set_folder_modal_state] = useState([])

  const show_hide_folder_modal = (folder_id) => {

    if (folder_modal_state[folder_id] === "block") {
      set_folder_modal_state({ ...folder_modal_state, [folder_id]: "none" })
    }
    else if (folder_modal_state[folder_id] === "none") {
      set_folder_modal_state({ ...folder_modal_state, [folder_id]: "block%" })
    }
  }



  return (
    <div >
      <Background>
        <Header sidebar_show_hide={sidebar_show_hide}>
          <Title margin="0px">TheList</Title>
          {/* <ButtonWord margin="auto 20px" padding="20px" on_click_function={sidebar_show_hide} className="nav_button"><i className="fas fa-bars"></i></ButtonWord> */}
          <button onClick={sidebar_show_hide} className="nav_button"><i className="fas fa-bars"></i></button>

          <ButtonWord margin="20px" on_click_function={show_create_note_container} >{show_hide_create_note_state.name}</ButtonWord>
          <ButtonWord margin="20px" on_click_function={show_hide_master} >{show_hide_master_state.name}</ButtonWord>
          <ButtonWord margin="20px" on_click_function={show_hide_dump} >{show_hide_dump_state.name}</ButtonWord>
        </Header>
        <Container>

          <NoteContainer >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title >Notes</Title>

              <ButtonWord on_click_function={create_new_folder} >New Folder</ButtonWord>
            </div>
            <ScrollContainer height={"77vh"}>

              {folders_state.map((folder, index) => {
                return <FolderContainer >
                  <FolderTitle show_hide_by_folder={show_hide_by_folder} show_hide_folder_modal={show_hide_folder_modal} on_change_folder_editor={on_change_folder_editor} fontSize="16px" folder_id={folder._id} margin="10px">{folder.folder_name}</FolderTitle>
                  <FolderNoteContainer height={folder_view_state[folder._id]}>
                    {all_todo_state.map((note, index) => {
                      if (note.folder_id === folder._id) {
                        return <Note show_create_note_container={show_create_note_container} get_all_notes={get_all_notes} index={note._id} id={note._id} key={note._id}>{note.title}</Note>
                      }
                    })}

                  </FolderNoteContainer>
                </FolderContainer>
              })}
            </ScrollContainer>
          </NoteContainer>

          {/* <Section show_hide={create_note_state}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title >Create Note</Title>
              <ButtonSymbol margin="18px 0px 18px 18px" on_click_function={create_new_note} >+</ButtonSymbol>
            </div>
            <Title margin="-30px 0px 0px 0px" fontSize="16px">Create a New Note Below</Title>
            <div>
              <NoteTextEditor
                note_state={note_state}
                on_change_note_editor={on_change_note_editor} />
              <NoteAttributeEditor
                note_state={note_state}
                formatted_date_slash={formatted_date_slash}
                formatted_date_dash={formatted_date_dash}
                on_change_note_editor={on_change_note_editor}
                show_scheduling={show_scheduling}
                schedule_state={schedule_state} />
            </div>
          </Section> */}
          <NoteEditor show_hide={show_hide_create_note_state.display}
            create_new_note={create_new_note}
            note_state={note_state}
            formatted_date_slash={formatted_date_slash}
            formatted_date_dash={formatted_date_dash}
            on_change_note_editor={on_change_note_editor}
            show_scheduling={show_scheduling}
            schedule_state={schedule_state} />
          <Section show_hide={show_hide_master_state.display}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>Master Todo List:</Title>
              <ButtonSymbol margin="18px 0px 18px 18px" on_click_function={create_empty_list_item} list_id="master" >+</ButtonSymbol>
            </div>
            <Title margin="-30px 0px 0px 0px" fontSize="16px">Today {formatted_date_slash}</Title>
            <ScrollContainer>
              {priority_state.priorites.map((priority, index) => {
                return <PriorityContainer key={index}>
                  <PriorityTitle fontSize="16px" on_click_function={show_hide_by_priority} list_id="master" priority={priority} border="1px solid silver" margin="10px">{priority} Priority</PriorityTitle>
                  <TodoContainer className={"master_" + priority.toLowerCase()} height={priority_state["master_" + priority.toLowerCase()]}>
                    {todo_master_state.map((note, index) => {
                      if (note.priority === priority) {
                        return <ListItem show_create_note_container={show_create_note_container} get_all_notes_by_list_id={get_all_notes_by_list_id} index={note._id} id={note._id} key={note._id}>{note.title}</ListItem>
                      }
                    })}
                  </TodoContainer>
                </PriorityContainer>
              })}
            </ScrollContainer>
          </Section>
          <Section show_hide={show_hide_dump_state.display}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>Todo Dump</Title>
              <ButtonSymbol margin="18px 0px 18px 18px" on_click_function={create_empty_list_item} list_id="dump" >+</ButtonSymbol>
            </div>
            <Title margin="-30px 0px 0px 0px" fontSize="16px">Get your Ideas Down Fast</Title>
            <ScrollContainer>
              {priority_state.priorites.map((priority, index) => {
                return <PriorityContainer key={index}>
                  <PriorityTitle fontSize="16px" on_click_function={show_hide_by_priority} list_id="dump" priority={priority} border="1px solid silver" margin="10px">{priority} Priority</PriorityTitle>
                  <TodoContainer className={"dump_" + priority.toLowerCase()} height={priority_state["dump_" + priority.toLowerCase()]}>
                    {todo_dump_state.map((note, index) => {
                      if (note.priority === priority) {
                        return <ListItem show_create_note_container={show_create_note_container} get_all_notes_by_list_id={get_all_notes_by_list_id} index={note._id} id={note._id} key={note._id}>{note.title}</ListItem>
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


