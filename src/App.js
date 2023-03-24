import './App.css';
import React from 'react';
import { Title } from './components/title';
import { Controls } from './components/controls';
import { WordRow } from './components/word';
import { Answer } from './components/answer';


export default function App() {

  return (
    <div className='container'>
      <Title />
      <Controls />
      <WordRow />
      <Answer />
    </div>
  );
}

