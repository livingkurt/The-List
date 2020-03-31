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
  console.log(all_todo_state)

  const date = new Date()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let year = date.getFullYear();
  useEffect(() => {
    get_all_notes_by_list_id("master");
    get_all_notes_by_list_id("dump");
    // get_all_notes();
  }, []);

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

  const get_all_notes = async (list_id) => {
    try {
      const res = await API.get_all_notes(list_id)
      set_all_todo_state(res.data)
    }
    catch (err) {
      console.log(err);
    }
  };

  const create_empty_list_item = async (list_id) => {
    const res = await API.get_notes_by_list_id(list_id)
    const new_data = [...res.data, { ...todo_state, list_id: list_id }]
    if (list_id === "dump") {
      set_todo_dump_state(new_data)
    }
    else if (list_id === "master") {
      set_todo_master_state(new_data)
    }
    new_note(list_id);
  };

  const new_note = async (list_id, create_id) => {
    const res = await API.post_note(create_id ? note_state : { ...todo_state, list_id: list_id })
    set_note_state({ title: "", body: "" })
    get_all_notes_by_list_id(list_id);
    document.querySelector(".title_field").value = ""
    document.querySelector(".text_field").value = ""
  }

  // const new_note = async (list_id, create_id) => {
  //   console.log({ "new_note": note_state })
  //   const res = await API.post_note(create_id ? note_state : ...todo_state, list_id: list_id)
  //   set_note_state({
  //     title: "",
  //     body: "",
  //     folder_id: "",
  //     list_id: "",
  //     priority: "Low",
  //     scheduled: false,
  //     scheduled_date_time: "",
  //     completed: false,
  //   })
  //   get_all_notes_by_list_id(list_id);
  //   document.querySelector(".title_field").value = ""
  //   document.querySelector(".text_field").value = ""
  // }

  // const new_note = async () => {
  //   const res = await API.post_note({
  //     title: todo_state.title,
  //     body: todo_state.body,
  //     folder_id: todo_state.folder_id,
  //     list_id: todo_state.list_id,
  //     priority: todo_state.priority,
  //     scheduled: todo_state.scheduled,
  //     scheduled_date_time: todo_state.scheduled_date_time,
  //     completed: todo_state.completed
  //   })
  //   set_note_state({ title: "", body: "" })
  //   get_all_notes_by_list_id(todo_state.list_id);
  //   document.querySelector(".title_field").value = ""
  //   document.querySelector(".text_field").value = ""
  // }


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

  const update_note = async (e) => {
    e.persist();
    const todo_id = e.target.id
    const todo_data = e.target.value
    const field_name = e.target.name
    console.log(field_name)
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
              {/* <AddButton data={new_note} /> */}
              <button onClick={() => new_note("dump", "create")} className="add_button">+</button>
            </div>
            <div className="todays_date" >Create a New Note Below</div>
            <div>
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
              <div>
                <label className="modal_labels">Priority: </label>
                <input
                  defaultValue={note_state.priority}
                  onChange={e => set_note_state({ ...note_state, priority: e.target.value })}
                  className="priority_input modal_inputs"
                  placeholder="High, Medium, Low"
                  name="priority" />
              </div>
              <div>
                <label className="modal_labels">List Name: </label>
                <input
                  defaultValue={note_state.list_id}
                  onChange={e => set_note_state({ ...note_state, list_id: e.target.value })}
                  className="list_id_input modal_input modal_inputs"
                  placeholder="List Name"
                  name="list_id" />
              </div>
              <label className="modal_labels">Date Created: {month}/{day}/{year}</label>
              <div className="modal_scheduled_field ">
                <label className="modal_labels">Schedule: </label>
                <Checkbox />
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
            <div className="todays_date" >Today {month}/{day}/{year}</div>
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


