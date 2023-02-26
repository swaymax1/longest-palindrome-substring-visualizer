import './App.css';
import React, { useEffect, useRef } from 'react';
import { useProvider } from './provider';
import { bruteForce } from './components/utils';

export default function App() {
  const { state: { word, running }, } = useProvider();

  // useEffect(() => {
  //   if (!word || !word.length) return;
  //   bruteForce(word, update);
  // }, [running]);

  return (
    <div className='container'>
      <InputForm />
      <WordRow />
    </div>
  );
}

function WordRow() {
  const { state: { selected, word, result } } = useProvider();

  if (!word.length) return (<div style={{ fontSize: 30 }}>Enter a word</div>);
  return (
    <div className='word-row'>
      {word.split('').map((letter, i) => <Box
        key={i}
        letter={letter}
        inAnswer={i >= result[0] && i <= result[1]}
        selected={i >= selected[0] && i <= selected[1]} />)}
    </div>
  );
}

function Box({ letter, selected, inAnswer }) {

  let boxColor = '';
  if (selected) boxColor = 'red';
  if (inAnswer) boxColor = 'green';

  return (
    <div className='box'
      style={{ '--box-color': boxColor }}>{letter}</div>
  );
}


function InputForm() {
  const { update, run, running } = useProvider();
  const formRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
    formRef.current.blur();
    run();
  }

  const onChange = (e) => {
    if (!running) {
      update({ word: e.target.value, result: [-1,-1] });
    }
  }

  return (
    <form onSubmit={onSubmit} ref={formRef} autoComplete={'off'}>
      <input className='input' onChange={onChange} name='word' type={'text'} maxLength={16} />
      <input className='submit' type={'submit'} value={'Start'} />
    </form>
  );
}