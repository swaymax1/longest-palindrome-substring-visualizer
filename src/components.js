import React, { useRef, useState } from 'react';
import { useProvider } from './provider';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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

    let boxColor = 'black';
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
        <form onSubmit={onSubmit} ref={formRef} autoComplete={'off'}>
            <SelectAlgorithm onChange={onSelectAlgorithm} />
            <SelectSpeed />
            <input className='input' onChange={onWordChange} name='word' type={'text'} maxLength={16} />
            <input className='submit' type={'submit'} value={'Start'} />
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


export function Answer() {
    const { word, longest } = useProvider();

    const current = word ? word.substring(longest[0], longest[1] + 1) : '';
    return (
        <div className='answer center'>
            {current && current}
        </div>
    );
}

export function Status() {
    const { status } = useProvider();
    return (
        <div className='status center'>
            {status}
        </div>
    );
}

function SelectSpeed() {

    const [value, setValue] = useState(50);
    const { setDelay } = useProvider();
    const maxDelay = 1100;

    function handleSliderChange(newValue) {
        setValue(newValue);
        setDelay(getDelay(newValue));
    }

    function getDelay(value) {
        return maxDelay - value * 10;
    }

    return (
        <div style={{ "width": 200, 'marginTop': 50 }}>
            <Slider onChange={handleSliderChange} value={value} className="speed" />
        </div>
    );
}
