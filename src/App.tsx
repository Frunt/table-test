import React from 'react';
import styled from 'styled-components';
import './App.css';
import { Table } from './components/Table';

const Container = styled.div`
margin-left: auto;
margin-right: auto;
padding-left: 10px;
padding-right: 10px;
display: flex;
justify-content: center;
align-items: center;
// overflow: hidden;

@media (max-width: 850px) {
  display: block;
}
`

function App() {
  return (
    <Container>
      <Table />
    </Container>
  );
}

export default App;
