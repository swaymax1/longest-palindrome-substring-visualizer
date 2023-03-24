import './App.css';
import React from 'react';
import { Controls, WordRow, Answer, Title } from './components';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#bd0d00',
    },
    secondary: {
      main: '#00ff00',
    },
  },
});

export default function App() {

  return (
    <ThemeProvider theme={theme} >
      <div className='container'>
        <Title />
        <Controls />
        <WordRow />
        <Answer />
      </div>
    </ThemeProvider >
  );
}
