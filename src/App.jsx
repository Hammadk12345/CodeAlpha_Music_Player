import React from 'react';
// import Card from './Card'
import Player from './Player';
import styled from 'styled-components';
import "./App.css";

const Container = styled.div`
  padding: 0;
  margin: 0;
  background-color: black;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 20px; /* Adds space between title and Player */
  font-weight: bold;
`;

function App() {
  return (
    <Container>
      <Title>Music Player</Title>
      <Player />
    </Container>
  );
}

export default App;
