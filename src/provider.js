import React, { createContext, useContext, useState, useEffect } from 'react'
import { bruteForce, middleOut } from './utils';


const Context = createContext();
export const useProvider = () => useContext(Context);

function getInitialState() {
    return {
        speed: 1,
        selected: [-1, -1],
        word: '',
        result: [-1, -1],
        running: false,
        flag: false,
        status: '',
        algos: [bruteForce, middleOut,],
        selectedAlgo: bruteForce,
    }
}

function updateState(state, data) {
    return { ...state, ...data };
}


export default function Provider({ children }) {
    const [state, setState] = useState(getInitialState());
    const update = (data) => setState(updateState(state, data));
    const setStatus = (status) => update({ status: status });
    const run = () => {
        if (!state.running) {
            update({ result: [-1, -1], running: true, flag: !state.flag });
        }
    }

    useEffect(() => {
        if (state.running) {
            state.selectedAlgo(state.word, update, setStatus);
        }
    }, [state.flag]);

    return (
        <Context.Provider value={{ state, update, run }}>
            {children}
        </Context.Provider>
    );
}
