import React, { useMemo } from 'react';
import { useProvider } from '../provider';


export function WordRow() {
    const { word, selected, found, notFound } = useProvider();

    if (!word.length) return (<div className='word-row' style={{ fontSize: 30 }}>Enter the word</div>);
    return (
        <div className='word-row'>
            {word.split('').map((letter, i) => <Box
                key={i}
                letter={letter}
                found={i >= found[0] && i <= found[1]}
                notFound={i == notFound[0] || i == notFound[1]}
                selected={i >= selected[0] && i <= selected[1]} />)}
        </div>
    );
}


function Box({ letter, selected, found, notFound }) {

    let boxColor = '#c8c8c8';
    if (selected) boxColor = 'grey';
    if (found) boxColor = 'green';
    if (notFound) boxColor = 'red';
    return (
        <div className='box center'
            style={{ '--box-color': boxColor }}>{letter}</div>
    );
}