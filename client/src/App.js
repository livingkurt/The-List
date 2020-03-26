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
import TextField from './components/TextField/TextField';
import TitleField from './components/TitleField/TitleField';
import AddButton from './components/AddButton/AddButton';
import API from "./utils/API";
import styled from 'styled-components';

const App = () => {
  const [todo_master_state, set_todo_master_state] = useState([])
  const [todo_dump_state, set_todo_dump_state] = useState([])
  const [todo_state, set_todo_state] = useState({
    title: "",
    body: "",
    folder_id: "",
    list_id: "",
    priority: 5,
    scheduled: false,
    scheduled_date_time: "",
  })
  const [note_state, set_note_state] = useState({
    title: "",
    body: "",
    folder_id: "",
    list_id: "dump",
    priority: 5,
    scheduled: false,
    scheduled_date_time: "",
  })
  console.log(todo_dump_state)

  useEffect(() => {
    const list_ids = ["dump", "master"]
    get_all_notes("master");
    get_all_notes("dump");
  }, []);

  const get_all_notes = async (list_id) => {
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
    get_all_notes(list_id);
    document.querySelector(".title_field").value = ""
    document.querySelector(".text_field").value = ""
  }


  const [sidebar_state, set_sidebar_state] = useState(false)

  // const openMenu = () => {
  //   document.querySelector(".sidebar").classList.add("open");
  // }
  // const closeMenu = () => {
  //   document.querySelector(".sidebar").classList.remove("open")
  // }

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

          </NoteArchive>
          <Section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>
                Create Note
              </Title>
              {/* <AddButton data={new_note} /> */}
              <button onClick={() => new_note("dump", "create")} className="add_button">+</button>
            </div>
            <div style={{ padding: "10px" }}>
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
          </Section>

          <Section >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>
                Todo Dump
            </Title>
              {/* <AddButton /> */}
              <button onClick={() => create_empty_list_item("dump")} className="add_button">+</button>
            </div>
            <ScrollContainer>
              {todo_dump_state.map((note, index) => {
                return <ListItem get_all_notes={get_all_notes} index={note._id} id={note._id} key={note._id}>{note.title}</ListItem>
              })}
              {/* <ListItem>List Item 1</ListItem> */}
            </ScrollContainer>
          </Section>
          <Section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>
                Master Todo List
              </Title>
              {/* <AddButton onclick={new_note} /> */}
              <button onClick={() => create_empty_list_item("master")} className="add_button">+</button>
            </div>
            <ScrollContainer>
              {todo_master_state.map((note, index) => {
                return <ListItem get_all_notes={get_all_notes} index={note._id} id={note._id} key={note._id}>{note.title}</ListItem>
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
