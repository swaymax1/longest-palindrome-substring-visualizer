import React, { useRef, useState } from 'react';
import { useProvider } from './provider';
import Select from 'react-select';
import 'rc-slider/assets/index.css';
import Slider from '@mui/material/Slider';
import { FormControl, InputLabel } from '@mui/material';


export function WordRow() {
    const { word, selected, found } = useProvider();

    if (!word.length) return (<div style={{ fontSize: 30 }}>Enter the word</div>);
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

export function Box({ letter, selected, inAnswer }) {

    let boxColor = '#c8c8c8';
    if (selected) boxColor = 'grey';
    if (inAnswer) boxColor = 'green';

    return (
        <div className='box center'
            style={{ '--box-color': boxColor }}>{letter}</div>
    );
}

export function Controls() {
    const { running, algos, run, updateApp, updateColor } = useProvider();
    const formRef = useRef();

    const onSubmit = e => {
        e.preventDefault();
        formRef.current.blur();
        run();
    }

    const onWordChange = (e) => {
        if (!running) {
            updateApp({ word: e.target.value });
            updateColor({ found: [-1, -1], longest: [-1, -1] });
        }
    }

    const onSelectAlgorithm = (selected) => {
        updateApp({ selectedAlgo: algos[selected.value] });
    }

    return (
        <form ref={formRef} autoComplete={'off'}>
            <SelectAlgorithm onChange={onSelectAlgorithm} />
            <SelectSpeed />
            <input className='input' onChange={onWordChange} name='word' type={'text'} maxLength={16} />
            <input type={'submit'} onClick={onSubmit} className='submit' />
        </form>
    );
}

function SelectAlgorithm({ onChange }) {
    const { algos } = useProvider();
    const options = algos.map((algo, i) => ({ value: i, label: algo.algoName }));

    return (
        <Select
            className='select'
            defaultValue={options[0]}
            options={options}
            onChange={onChange}
        />
    );
}


function SelectSpeed() {

    const [value, setValue] = useState(50);
    const { setDelay, running } = useProvider();

    function handleSliderChange(_, newValue) {
        setValue(newValue);
        setDelay(getDelay(newValue));
    }

    function getDelay(value) {
        return 750 - value * 10;
    }

    return (
        <div style={{ "width": 200, 'marginTop': 50 }}>
            <Slider
                size="small"
                sx={{ width: 150 }}
                defaultValue={35}
                min={20}
                max={50}
                aria-label="Small"
                color='secondary'
                onChange={handleSliderChange}
                disabled={running}
            />
        </div>
    );
}

export function Answer() {
    const { word, longest } = useProvider();

    const current = word ? word.substring(longest[0], longest[1] + 1) : '';
    return (
        <div className='answer center'>
            {current && current}
        </div>
    );
}

export function Title() {

    return (
        <h1>Longest Palindrome Substring Visualizer</h1>
    );
}