import React, { useRef } from 'react';
import { useProvider } from '../provider';
import Select from 'react-select';
import 'rc-slider/assets/index.css';
import Slider from '@mui/material/Slider';


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
            <div className='select row'>
                <span className='label'>Algorithm:</span>
                <SelectAlgorithm onChange={onSelectAlgorithm} />
                <span className='label'>Speed:</span>
                <SelectSpeed />
            </div>
            <div className="row" style={{ position: 'relative', top: 80 }}>
                <input className='input' onChange={onWordChange} name='word' type={'text'} maxLength={16} />
                <input type={'submit'} onClick={onSubmit} className='submit' />
            </div>
        </form>
    );
}

function SelectAlgorithm({ onChange }) {
    const { algos } = useProvider();
    const options = algos.map((algo, i) => ({ value: i, label: algo.algoName }));
    const styles = {
        option: (provided, _) => ({
            ...provided,
            color: 'black',
        }),
        singleValue: (provided, _) => ({
            ...provided,
            color: 'black',
        }),
        control: (provided, state) => ({
            ...provided,
            height: 40,
            width: 180,
            borderRadius: 10,
        })
    };

    return (
        <Select
            styles={styles}
            defaultValue={options[0]}
            options={options}
            onChange={onChange}
        />
    );
}

function SelectSpeed() {
    const { setDelay, running } = useProvider();

    function handleSliderChange(_, newValue) {
        setDelay(getDelay(newValue));
    }

    function getDelay(value) {
        return 800 - value * 10;
    }

    return (
        <Slider
            style={{ color: 'red' }}
            size="small"
            sx={{ width: 150 }}
            defaultValue={35}
            min={20}
            max={50}
            aria-label="Small"
            onChange={handleSliderChange}
            disabled={running}
        />
    );
}