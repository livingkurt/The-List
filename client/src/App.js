import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Background from './components/Background/Background';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import Header from './components/Header/Header';
import ListItem from './components/ListItem/ListItem';
import ScrollContainer from './components/ScrollContainer/ScrollContainer.js';
import Title from './components/Title/Title';

const App = () => {

  return (
    <div >
      <Background>
        <Header></Header>
        <Container>
          <Section>
            <Title>
              Master Todo List
            </Title>
            <ScrollContainer>
              <ListItem>List Item 1</ListItem>
              <ListItem>List Item 2</ListItem>
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
              <ListItem>List Item 15</ListItem>
            </ScrollContainer>
          </Section>
          <Section>
            <Title>
              Todo Dump
            </Title>
            <ScrollContainer>
              <ListItem>List Item 1</ListItem>
              <ListItem>List Item 2</ListItem>
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
              <ListItem>List Item 15</ListItem>
            </ScrollContainer>
          </Section>
          <Section>

          </Section>
        </Container>

      </Background >
    </div >
  );
}

export default App;
