import React from 'react';
import { useProvider } from '../provider';


export function WordRow() {
    const { word, selected, found } = useProvider();

    if (!word.length) return (<div className='word-row' style={{ fontSize: 30 }}>Enter the word</div>);
    return (
        <div className='word-row'>
            {word.split('').map((letter, i) => <Box
                key={i}
                letter={letter}
                inAnswer={i >= found[0] && i <= found[1]}
                selected={i >= selected[0] && i <= selected[1]} />)}
        </div>
    );
}

function Box({ letter, selected, inAnswer }) {

    let boxColor = '#c8c8c8';
    if (selected) boxColor = 'grey';
    if (inAnswer) boxColor = 'green';

    return (
        <div className='box center'
            style={{ '--box-color': boxColor }}>{letter}</div>
    );
}