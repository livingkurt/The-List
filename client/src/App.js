import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Background from './components/Background/Background';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import Header from './components/Header/Header';

function App() {
  return (
    <div >
      <Background>
        <Header></Header>
        <Container>
          <Section>

          </Section>
          <Section>

          </Section>
          <Section>

          </Section>
        </Container>

      </Background>
    </div>
  );
}

export default App;
