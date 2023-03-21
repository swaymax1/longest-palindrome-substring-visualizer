import './App.css';
import React from 'react';
import { Controls, Status, WordRow, Answer } from './components';

export default function App() {

  return (
    <div className='container'>
      <Controls />
      <WordRow />
      <Status />
      <Answer />
    </div>
  );
}
