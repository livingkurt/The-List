import React, { useState, useEffect } from 'react';
import './App.css';
import Background from './components/Background/Background';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import Header from './components/Header/Header';
import ListItem from './components/ListItem/ListItem';
import ScrollContainer from './components/ScrollContainer/ScrollContainer.js';
import Title from './components/Title/Title';
import TextField from './components/TextField/TextField';
import TitleField from './components/TitleField/TitleField';
import AddButton from './components/AddButton/AddButton';
import API from "./utils/API";

const App = () => {
  const [master_todo_state, set_master_todo_state] = useState([])
  const [todo_dump_state, set_todo_dump_state] = useState([])
  const [note_state, set_note_state] = useState({
    title: "",
    description: "",
  })
  console.log(note_state)

  useEffect(() => {
    // get_notes();
  }, []);

  const get_notes = () => {
    API.get_notes()
      .then(res => {
        set_todo_dump_state(res.data)
      })
      .catch(err => console.log(err));
  };

  const new_note = () => {
    // let new_state = todo_dump_state + 
    console.log(note_state)
  }

  const handle_text_field_change = (e) => {
    console.log(note_state)
    set_note_state({ ...note_state, description: e.target.value })
  }

  return (
    <div >
      <Background>
        <Header></Header>
        <Container>
          <Section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>
                Create Note
              </Title>
              <AddButton onClick={() => new_note()} />
            </div>
            <div style={{ padding: "10px" }}>
              {/* <TitleField
                onChange={e => set_note_state({ ...note_state, title: e.target.value })}
              >
                {note_state.title}
              </TitleField> */}
              <input
                className="title_field"
                onChange={e => set_note_state({ ...note_state, title: e.target.value })}
                placeholder="Title"
                onBlur={(e) => e.target.placeholder = "Title"}
                onFocus={(e) => e.target.placeholder = ""}></input>

              <textarea
                className="text_field"
                onChange={e => set_note_state({ ...note_state, description: e.target.value })}
              />
              {/* <TextField
                onChange={e => handle_text_field_change(e)}
              >
                {note_state.description}
              </TextField> */}
            </div>
          </Section>

          <Section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>
                Todo Dump
            </Title>
              <AddButton />
            </div>
            <ScrollContainer>
              {todo_dump_state}
              <ListItem>List Item 1</ListItem>
              {/* <ListItem>List Item 2</ListItem>
              <ListItem>List Item 3</ListItem>
              <ListItem>List Item 4</ListItem>
              <ListItem>List Item 5</ListItem>
              <ListItem>List Item 6</ListItem>
              <ListItem>List Item 7</ListItem>
              <ListItem>List Item 8</ListItem>
              <ListItem>List Item 9</ListItem>
              <ListItem>List Item 10</ListItem>
              <ListItem>List Item 11</ListItem>
              <ListItem>List Item 12</ListItem>
              <ListItem>List Item 13</ListItem>
              <ListItem>List Item 14</ListItem>
              <ListItem>List Item 15</ListItem> */}
            </ScrollContainer>
          </Section>
          <Section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>
                Master Todo List
              </Title>
              <AddButton onclick={new_note} />
            </div>
            <ScrollContainer>
              <ListItem>List Item 1</ListItem>
              {/* <ListItem>List Item 2</ListItem>
              <ListItem>List Item 3</ListItem>
              <ListItem>List Item 4</ListItem>
              <ListItem>List Item 5</ListItem>
              <ListItem>List Item 6</ListItem>
              <ListItem>List Item 7</ListItem>
              <ListItem>List Item 8</ListItem>
              <ListItem>List Item 9</ListItem>
              <ListItem>List Item 10</ListItem>
              <ListItem>List Item 11</ListItem>
              <ListItem>List Item 12</ListItem>
              <ListItem>List Item 13</ListItem>
              <ListItem>List Item 14</ListItem>
              <ListItem>List Item 15</ListItem> */}
            </ScrollContainer>
          </Section>
        </Container>
        <Container>
          <Section width="100%"></Section>
        </Container>

      </Background >
    </div >
  );
}

export default App;
