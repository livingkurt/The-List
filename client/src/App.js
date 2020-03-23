import React, { useState } from 'react';
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

const App = () => {
  const [master_todo_state, set_master_todo_state] = useState()
  const [todo_dump_state, set_todo_dump_state] = useState()

  const new_note = () => {

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
              <AddButton />
            </div>
            <div style={{ padding: "10px" }}>
              <TitleField></TitleField>
              <TextField></TextField>
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
